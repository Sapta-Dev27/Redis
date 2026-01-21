import redis from 'redis'

const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

client.on('error', (error) => {
  console.log('Error in creating a Redis clinet')
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

const subscriber1 = async () => {
  try {
    await connectToRedis();
    const sub1 = client.duplicate();
    const connectSub = await sub1.connect();
    if (connectSub) {
      console.log('SUBSRIBER-1 is connected to the REDIS SERVER')
    }
    await sub1.subscribe('redis-playlist', (channel, message) => {
      const time = new Date().toISOString();
      console.log(`Receving message from channel : ${channel} and mssg : ${message} at ${time}`)
    })
    setTimeout(async () => {
      await sub1.unsubscribe();
      await sub1.quit();
      console.log('SUBSCRIBER unscribed the channel');
      await client.quit();
      console.log('Client is disconnected from the REDIS SERVER')
    }, 30000)


  }
  catch (error) {
    console.log('Error is :', error)
  }
}

subscriber1();