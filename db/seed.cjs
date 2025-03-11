const client = require('./client.cjs');

console.log(`test`);

// const dropTables = async() => {
//   try {
//     await client.query(``);
//   } catch(err) {
//     console.log(err);
//   }
// }

// const createTables = async() => {
//   try {
//     await client.query(``);
//   } catch(err) {
//     console.log(err);
//   }
// }


const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED TO THE DB');

  console.log('DROPPING TABLES');
  console.log('TABLES DROPPED');

  console.log('CREATING TABLES');
  console.log('TABLES CREATED');

  console.log('CREATING USERS');
  console.log('USERS CREATED');

  console.log('CREATING PROJECTS');
  console.log('PROJECTS CREATED');

  console.log('CREATING TASKS');
  console.log('TASKS CREATED');

  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();