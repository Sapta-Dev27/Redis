import ioredis, { Redis } from 'ioredis'

const redis = new Redis({
  host : 'localhost',
  port : 6379
})

redis.on('error' , (error) => {
  console.log('Error in connecting to REDIS')
})

const connectToRedis = async() => {
  try{
   const connect = await redis.connect();
   if(connect){
    console.log('REDIS SUCCESSFULLY CONNECTED')
   }
  }
  catch(error){
    console.log('Error in connecting to REDIS')
  }
  finally{
    await redis.quit();
    console.log('REDIS DISCONNECTED ')
  }
}

connectToRedis();