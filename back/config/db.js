const mongoose = require('mongoose');
require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일의 환경 변수를 로드

const { MONGODB_URI } = process.env;  // .env 파일에서 데이터베이스 연결 주소 가져옴 

// mongodb 데이터베이스를 연결.
const connectDb = async () => { 
    try {
        const connect = await mongoose.connect(MONGODB_URI);
        console.log(
            `Database connected: \nhost : ${connect.connection.host}\nDB name : ${connect.connection.name}`
            
        )
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDb;  // 외부 파일에서 connectDb 함수를 사용할 것이므로 export해줌.