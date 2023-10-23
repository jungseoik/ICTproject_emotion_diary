// import OpenAI from "openai";
// import dotenv from 'dotenv';
const OpenAI = require('openai');
const dotenv = require('dotenv');

const https = require('https');
const fs = require('fs');

dotenv.config();

const openai = new OpenAI('키값');

async function generateImageUrl() {
  const image = await openai.images.generate({ prompt: "A cute baby sea otter" });

  console.log(image.data);//
  const imageUrl = image.data[0].url;
  return imageUrl;
  /*
  image.data 까보면  [ {  url : fdjalskfjkla }  ] 이런식으로 되어 있다.
  */
}

module.exports = generateImageUrl;