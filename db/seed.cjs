const client = require('./client.cjs');
const { createProjects } = require('./projects.cjs');

console.log(`test`);

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS tasks;
      DROP TABLE IF EXISTS projects;
      DROP TABLE IF EXISTS teams;
      DROP TABLE IF EXISTS users;
      `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      username VARCHAR(120) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      team_id uuid REFERENCES teams(id)
    );

    CREATE TABLE teams (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      team_name VARCHAR(75) NOT NULL,
      project_id uuid REFERENCES projects(id),
      user_id uuid REFERENCES users(id)
    );

    CREATE TABLE projects (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      project_name VARCHAR(150) NOT NULL,
      team_id uuid REFERENCES teams(id),
      description TEXT NOT NULL,
      status VARCHAR(30) NOT NULL,
      start_date DATE NOT NULL,
      due_date DATE NOT NULL
    );

    CREATE TABLE tasks (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      owner_id uuid REFERENCES users(id),
      subject VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      project_id uuid REFERENCES projects(id),
      priority VARCHAR(30) NOT NULL,
      due_date DATE NOT NULL,
      status VARCHAR(30) NOT NULL
    );
      `);
  } catch(err) {
    console.log(err);
  }
}


const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED TO THE DB');


  console.log('dropping tables');
  await dropTables();
  console.log('TABLES DROPPED');


  console.log('creating tables');
  await createTables();
  console.log('TABLES CREATED');


  console.log('creating users');
  await
  console.log('USERS CREATED');


  console.log('creating projects');
  await createProjects(`Four Winds`, 1, `A project to build a new website`, `In Progress`, `2021-01-01`, `2021-02-01`);
  await createProjects(`Bagel Mania`, 2, `A project dedicated to delicious bagels`, `In Progress`, `2021-01-01`, `2021-02-01`);
  await createProjects(`Tea Time`, 3, `With the power of Tea, our coding prevails!`, `In Progress`, `2021-01-01`, `2021-02-01`);
  console.log('PROJECTS CREATED');


  console.log('creating tasks');
  await 
  console.log('TASKS CREATED');


  console.log(`creating teams`);
  await
  console.log(`TEAMS CREATED`);


  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();