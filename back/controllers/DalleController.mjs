const { Configuration, OpenAIApi } = require("openai");

// OpenAI API 설정
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiApiInstance = new OpenAIApi(configuration);

// 이미지 생성 API 호출
exports.createImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openaiApiInstance.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    res.send(response.data.data[0].url);
  } catch (err) {
    res.send(err.message);
  }
};