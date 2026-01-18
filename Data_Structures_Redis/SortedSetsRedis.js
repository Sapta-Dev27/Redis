import redis from 'redis'

const client = redis.createClient({
  host : 'localhost',
  port : 6379
});

client.on('error' , (err) => {
  console.log('Error in connecting REDIS CLIENT')
});

const connectToRedis = async() => {
  try{
    const connect = await client.connect();
    if(connect){
      console.log('REDIS CONNECTION SUCCESSFULL')
    }
  }
  catch(error){
    console.log('ERROR IN CONNECTING REDIS SERVER' , error)
  }
}

const performSortedSets = async () => {
  await  connectToRedis();
  await client.zAdd('users' , [ 
    {
      'score' : 10,
      'value' : 'user:1'
    },
    {
      'score' : 40,
      'value' : 'user:2'
    },
    {
      'score' : 30,
      'value' : 'user:3'
    },
    {
      'score' : 50,
      'value' : 'user:4'
    },
    {
      'score' : 20,
      'value' : 'user:5'
    },
  ])

  const getData = await client.zRange('users' , 0 , -1);
  console.log('ALL USERS :' , getData);

  const getDataWithScores = await client.zRangeWithScores('users' , 0 , -1);
  console.log('ALL USERS WITH DATA :' , getDataWithScores);

  const getDataRank = await client.zRank('users' , 'user:3');
  console.log('Rank of USER-3 (ascending)' , getDataRank);
 
  await client.zRem('users' , 'user:2');
  const updatedData = await client.zRange('users',0,-1);
  console.log('After getting updated :' , updatedData);


  await client.quit();
}

performSortedSets()