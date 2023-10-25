import React, { useMemo, useRef, useCallback, useReducer, useEffect } from "react";
import DiaryEditor from './component/page/DiaryEditor';
import DiaryList from './component/list/DiaryList';
import "./style/Diary.css";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {

    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return [newItem, ...state];
    }

    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }

    case "EDIT": {
      return state.map((it) => it.id === action.targetId
        ? { ...it, content: action.newContent } : it
      );
    }

    default: return state;
  }
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async (data) => {
    try {
      const res = await fetch("/diaryWrite", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`서버 응답 실패: ${res.status}`);
      }

      const result = await res.json();
      console.log("서버 응답:", result);

      const initData = result.slice(0, 20).map((it) => {
        return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++
        }
      });

      dispatch({ type: "INIT", data: initData });
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    getData(); // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []); // 빈 배열을 넣어 한 번만 호출되도록 함

  const onCreate = useCallback(
    (author, content, emotion) => {
      dispatch({ type: "CREATE", data: { author, content, emotion, id: dataId.current } });
      dataId.current += 1;
    }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);


  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit }
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;