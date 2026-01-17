import redis from 'redis';
import express from 'express';
import 'dotenv/config';


const PORT = process.env.PORT || 8000;
const app = express();

const client = redis.createClient({
  host: 'localhost',
  port: '6379'
});

client.on('error' , (err) => {
  console.log('Redis Client Error', err); 
})

const connecToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('Redis connected successfully');
    }
  }
  catch (error) {
    console.log('Redis connection Error : ', error);
  }
  finally {
    await client.quit();
  }
}

connecToRedis();

app.listen( PORT , () => {
  console.log(`Server is running on port ${PORT}`);
})