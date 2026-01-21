import e from 'express';
import redis, { createClient } from 'redis'

const client = redis.createClient({
  host: ' localhost',
  port: 6379
})

const connectToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('REDIS CONNECTION IS SUCCESSFULL')
    }
  }
  catch (error) {
    console.log('Error in connecting to REDIS SERVER :', error)
  }
}

const subscriber2 = async () => {
  try {
    await connectToRedis();

    const sub2 = await client.duplicate();
    const sub2connect = await sub2.connect();
    if (sub2connect) {
      console.log('Subsriber 2 is connected to REDIS SERVER')
    }
    await sub2.subscribe('Devops-playlist', (channel, message) => {
      const time = new Date().toISOString();
      console.log(`Received mssg  : ${message} from channel : ${channel} at time : ${time}`)
    })

    setTimeout(async () => {
      await sub2.quit();
      console.log('SUBSCRIBER unscribed the channel');
      await client.quit();
      console.log('Client is disconnected from the REDIS SERVER')
    }, 30000)
  }
  catch (error) {
    console.log('Error is :', error)
  }
}

subscriber2();