import redis from 'redis'

const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

client.on('error', (err) => {
  console.log('Error in connecting to the REDIS CLIENT')
})

const connectToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('REDIS IS CONNECTED SUCCESSFULLY')
    }
  }
  catch (error) {
    console.log('Error in connecting :', error)
  }
}

const pipelineOps = async () => {
  await connectToRedis();
  const pipeline = await client.multi();
  await pipeline.set('a', 1);
  await pipeline.set('b', 2);
  await pipeline.set('c', 3);
  const res1 = await pipeline.get('a')
  const res2 = await pipeline.get('b')
  const res3 = await pipeline.get('c');
  console.log(res1);
  console.log(res2);
  console.log(res3);
  const result = await pipeline.exec();
  console.log(result)

  for (let i = 0; i <= 1000; i++) {
    await pipeline.set('user', i);
    await pipeline.get('user');
  }
  const results2 = await pipeline.exec();
  console.log(results2)

  await client.quit();
}

pipelineOps()