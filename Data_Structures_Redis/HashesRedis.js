import redis from 'redis'

const client = await redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => {
  console.log('Error occured from the REDIS CLIENT')
});


const connectToRedis = async () => {
  try {
    const connect = await client.connect();
    if (connect) {
      console.log('REDIS CONNECTION SUCCESSFULL')
    }
  }
  catch (error) {
    console.log('Some error took place while connecting to the REDIS SERVER')
  }
}

const performHashOps = async () => {
  await connectToRedis();

  await client.hSet('user:1', {
    name: 'sapta',
    city: 'Kolkata',
    role: 'dev'
  })

  const getRole = await client.hGet('user:1', 'role');
  console.log('Role is :', getRole);

  const [getname, getcity] = await client.HMGET('user:1', ['name', 'city']);
  console.log(`Name is ${getname} from city : ${getcity}`);

  const getData = await client.hGetAll('user:1');
  console.log('Data is :', getData);

  const checkIfPresentCity = await client.hExists('user:1', 'city');
  console.log('Is City Present : ', checkIfPresentCity);

  const checkIfPresentSalary = await client.hExists('user:1', 'salary');
  console.log('Is Salary Present : ', checkIfPresentSalary);

  const length = await client.hLen('user:1');
  console.log('No of fields is :', length);

  await client.hDel('user:1', 'city');
  const updatedData = await client.hGetAll('user:1');
  console.log('Updated data is :' , updatedData);

  await client.quit();

}

performHashOps();