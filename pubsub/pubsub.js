import redis from 'redis'

//step1 : create a Redis client
const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

//step2 : add a event Listner for encountering error in redis client connection
client.on('error', (error) => {
  console.log('Error in connect REDIS CLIENT')
})

//step3 : add connection to the redis server for the client
const connectRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('REDIS CONNECTION IS SUCCESSFULL')
    }
  }
  catch (error) {
    console.log('Error in connection to REDIS SERVER :', error);
  }
}


// step 4 : create a PUB SUB .. publisher -> publishes mssgs to channel ; subscriber -> gets mssg from subscribed channels
const pubsub = async () => {

  await connectRedis();
  // create a subscriber that duplictes the client
  const subscriber = await client.duplicate();
  // connect the subsciber to the redis server
  await subscriber.connect();
  // now subscribe the subscriber to the channel to get mssgs
  const subscribe = await subscriber.subscribe('dummy-channel', (message, channel) => {
    console.log(`Received message from channel : ${channel} and message : ${message}`)
  });
  //publish mssgs to the channel
  await client.publish('dummy-channel', 'Redis Part-1 Uploaded')
  await client.publish('dummy-channel', 'Redis Part-2 Uploaded')
  await client.publish('dummy-channel', 'Redis Part-3 Uploaded')
  await client.publish('dummy-channel', 'Redis Part-4 Uploaded')
  await client.publish('dummy-channel', 'Redis Part-5 Uploaded')
  //resolve a promise that will take place after 5s
  await new Promise((resolve) => {
    setTimeout(resolve, 5000)
  })
  //now unsubscribe the subscriber from the channel
  await subscriber.unsubscribe();
  // close the connection of the subscriber from the redis server
  await subscriber.quit();
  console.log('REDIS CONNECTION FOR THE SUBSCRIBER IS CLOSED')
  await client.quit();
}

pubsub();