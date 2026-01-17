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


const performListOperations = async() => {
  await connectToRedis();


  // 1. LPUSH and LRANGE to add and retrieve elements from a list


  await client.lPush('tasks' , ['Task1' , 'Task2' , 'Task3' , 'Task4' ]);
  const tasks = await client.lRange('tasks' , 0, -1);
  console.log('Tasks List:' , tasks);


  // 2. RPUSH  and LRANGE to add and retrieve elements from a list


  await client.rPush('tasks' , ['Task5' , 'Task6' , 'Task7' , 'Task8' ]);
  const updatedTasks = await client.lRange('tasks' , 0, -1);
  console.log('Updated Tasks List:' , updatedTasks);

  // 3. LPOP and RPOP to remove elements from the list
  for(let i=0 ; i<=3 ; i++){
    await client.lPop('tasks');
    await client.rPop('tasks');
  }
  const finalTaks = await client.lRange('tasks' , 0 , -1);
  console.log('Final Tasks List after LPOP and RPOP:' , finalTaks);


  //4. Length of the list , index at a particular position 

  const taskLength = await client.lLen('tasks');
  console.log('Number of tasks left:' , taskLength);

  const taskIndex = await client.lIndex('tasks', 3);
  console.log('Task at index 3:' , taskIndex);
}

performListOperations();