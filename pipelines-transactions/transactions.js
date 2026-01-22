import redis from 'redis'

const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

client.on('error', (err) => {
  console.log('ERROR IN CONNECTING TO REDIS CLIENT ')
})

const connectToRedis = async () => {
  try {
    const connect = client.connect();
    if (connect) {
      console.log('REDIS IS CONNECTED SUCCESSFULLY')
    }
  }
  catch (error) {
    console.log('Error in connecting to REDIS SERVER :', error)
  }
}

const performTransactions = async () => {
  await connectToRedis();
  await client.set('balance-1', 1000);
  await client.set('balance-2', 2000)
  const result = await client
    .multi()
    .decrBy('balance-1', 100)
    .incrBy('balance-2', 200)
  console.log(result);
  console.log('Balance-1 is :', await client.get('balance-1'));
  console.log('Balance-2 is :', await client.get('balance-2'));
  await client.quit();
}

performTransactions();