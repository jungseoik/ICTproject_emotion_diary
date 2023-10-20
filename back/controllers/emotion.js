const axios = require('axios');

async function analyzeSentiment(text) {
  const apiUrl = 'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze';
  const contentToAnalyze = text;

  try {
    const response = await axios.post(apiUrl, {
      content: contentToAnalyze,
    }, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': 'm5kp06mxt3',
        'X-NCP-APIGW-API-KEY': 'XFcn337IlO9HCu45OTpMGBmZmM7bQ3gioP1jj4Qh',
        'Content-Type': 'application/json'
      }
    });
      let emotionValue = {
        negative: response.data.document.confidence.negative,
        positive: response.data.document.confidence.positive,
        neutral: response.data.document.confidence.neutral
    };
    return emotionValue;
    console.log(response.data); // 응답 데이터 출력
    console.log(response.data.document.confidence.negative); // 응답 데이터 출력
    console.log(response.data.document.confidence.positive); // 응답 데이터 출력
    console.log(response.data.document.confidence.neutral); // 응답 데이터 출력

  } catch (error) {
    console.error(`Error in sentiment analysis API call - ${error}`);
  }
}
module.exports = analyzeSentiment;
//이게 함수 자체를 내보내는것과 promise객체를 내보내는게 차이가 난다.
// module.exports = analyzeSentiment();
// module.exports = analyzeSentiment;
//이 두가지 방식은 차이가 존재

// analyzeSentiment();
