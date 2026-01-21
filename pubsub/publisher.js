import redis from 'redis'

const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

client.on('error', (error) => {
  console.log('Error in Creating REDIS CLIENT')
})

const connectToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('REDIS CONNECTION  IS SUCCESSFULL')
    }
  }
  catch (error) {
    console.log('Error in connecting to REDIS SERVER ', error)
  }
}

const publisher = async () => {
  await connectToRedis();

  console.log('Publishing content to REDIS CHANNEL.....')
  await client.publish('redis-playlist', 'Redis course part 1 added');
  await client.publish('redis-playlist', 'Redis course part 2 added');
  await client.publish('redis-playlist', 'Redis course part 3 added');
  await client.publish('redis-playlist', 'Redis course part 4 added');
  await client.publish('redis-playlist', 'Redis course part 5 added');
  console.log('Publishing comopleted to REDIS CHANNEL')

  console.log('Publishing to Devops Channel...')
  await client.publish('Devops-playlist', 'Devops Course part1 added')
  await client.publish('Devops-playlist', 'Devops Course part2 added')
  await client.publish('Devops-playlist', 'Devops Course part3 added')
  await client.publish('Devops-playlist', 'Devops Course part4 added')
  await client.publish('Devops-playlist', 'Devops Course part5 added')
  console.log('Publishing completed for Devops channel ')

  await client.quit();
  console.log('Connection closed for REDIS CLIENT FROM REDIS SERVER')
}

publisher();

