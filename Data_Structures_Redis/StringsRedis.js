import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379
})

client.on('error', (err) => {
  console.log('Redis Client Error', err);
})

const connectToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('Redis connected successfully');
    }
  }
  catch (error) {
    console.log('Redis connection Error : ', error);
  }
}

const performStringOperations = async () => {
   await connectToRedis();

  // 1. SET and GET a string value 

  await client.set('userName', 'SaptaDev27');
  const userName = await client.get('userName');
  console.log('User Name:', userName);

  //2. MSET ans MGET multiple string values 

  await client.mSet([
    'firstName', 'Sapta',
    'lastName', 'Dev27',
    'country', 'India',
    'city', 'Bangalore'
  ]);

  const [firstname, lastname, country, city] = await client.mGet(['firstName', 'lastName', 'country', 'city']);
  console.log(`Full Name: ${firstname} ${lastname}, Location: ${city}, ${country}`);

  //3. Increment and Decrement string values

  //program  that simulates page views by incrementing
  await client.set('views', '100');
  for (let i = 0; i <= 1000; i++) {
    await client.incr('views');
    await client.incrBy('views', 2);
  }
  const currentViews = await client.get('views');
  console.log('Current Views after incrementing:', currentViews);

  //program that simulates seat booking by decrementing
  await client.set('seatsLeft', '5000');
  for (let i = 0; i <= 500; i++) {
    await client.decr('seatsLeft');
    await client.decrBy('seatsLeft', 4);
  }
  const currentSeatsLeft = await client.get('seatsLeft');
  console.log('Current Seats Left after decrementing:', currentSeatsLeft);

  //4. Append string values , get string length , replace string value

  await client.set('message', 'Hello');
  const orginalMessg = await client.get('message');
  console.log('Original Message:', orginalMessg);

  //append string
  await client.append('message', ', Welcome to Redis String Operations!');
  const updatedMssg = await client.get('message');
  console.log('Updated Message:', updatedMssg);

  //get string length
  const mssgLenghth = await client.strLen('message');
  console.log('Message Length:', mssgLenghth);
  
  //getRange of string 
  const substring = await client.getRange('message' , 2 , 6);
  console.log('Substring (2-6):', substring);

  //replace string
  const replacedMssg = await client.setRange('message' , 6 , ' Hi there, Redis User!');
  const finalMssg = await client.get('message');
  console.log('Final Message after replacement:', finalMssg);

  await client.quit();
}

performStringOperations();