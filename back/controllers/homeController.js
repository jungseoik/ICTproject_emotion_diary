const express = require('express');
// const path = require('path');
// const app = express();

console.log(__dirname);
exports.homeGetController = (req, res) => {
    const Html = `
    <div class="grid-container">
        <div class="grid-item"><a href = "/home/feedcheck"><img src="/images/001.jpg" alt="Image 1"></a></div>
        <div class="grid-item"><img src="/images/001.png" alt="Image 2"></div>
        <div class="grid-item"><img src="/images/002.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
        <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
        <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
        <!-- 추가 이미지 -->
    </div>
    <style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    .grid-item {
        width: 300px;
        height: 300px;
        overflow: hidden; 
    }
    .grid-item img {
        width:100%;
        object-fit: cover; 
    }

    </style>
    `
    res.send(Html);
}