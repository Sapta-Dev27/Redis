import e from 'express'
import redis from 'redis'

const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

client.on('error', (err) => {
  console.log('Some Error occured from the Redis client side')
})

const connectToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('REDIS CONNECTION IS SUCCESSFULL')
    }
  }
  catch (error) {
    console.log('SOME ERROR TOOK PLACE WHILE CONNECTING TO REDIS SERVER', error)
  }
}

const performSetsOps = async () => {
  await connectToRedis();

  await client.sAdd('products', ['P-1', 'P-2', 'P-3', 'P-4']);
  const products = await client.sMembers('products');
  console.log('Products  fetched successfully from Redis Side', products);

  await client.sRem('producsts', 'P-2');
  await client.sAdd('products', ['P-5', 'P-6']);
  await client.sRem('products', 'P-5');
  const latestProducts = await client.sMembers('products');
  console.log('Latest fectched products from REDIS server', latestProducts);

  const check = await client.sIsMember('products', 'P-3');
  if (check == 1) {
    console.log('Product found successfully');
  } else {
    console.log('Product not found in the REDIS SERVER')
  }

  const count = await client.sCard('products');
  console.log('TOTAL COUNT' , count);

  const popEl = await client.sPop('products');
  const elements = await client.sMembers('products');
  console.log('Latest Elements after popping :' , elements);
  console.log('Popped El :' , popEl);

  const randomEl = await client.sRandMember('products');
  console.log('Random El :' , randomEl);

  await client.quit();
}

performSetsOps();