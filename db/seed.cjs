const { v4: uuidv4 } = require('uuid');
const client = require('./client.cjs');
<<<<<<< HEAD
const {v4: uuidv4} = require('uuid');

const{createTasks} = require('./tasks.cjs');

const parentTaskId= uuidv4();
const subTaskId = uuidv4();

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS tasks;
      DROP TABLE IF EXISTS projects;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
 CREATE TABLE teams (
=======
const { createProjects } = require('./projects.cjs');
const { createUsers } = require('./users.cjs');
require('dotenv').config();
console.log(`test`);

const dropTables = async () => {
  try {
    await client.query(`
      ALTER TABLE IF EXISTS teams DROP COLUMN IF EXISTS project_id;
      DROP TABLE IF EXISTS tasks;
      DROP TABLE IF EXISTS projects;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS teams;
      `);
  } catch (err) {
    console.log(err);
  }
}

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE teams (
>>>>>>> origin/main
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        team_name VARCHAR(75) NOT NULL
      );
      
      CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        username VARCHAR(120) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        team_id UUID REFERENCES teams(id)
      );

      CREATE TABLE projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        project_name VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(30) NOT NULL,
        start_date DATE NOT NULL,
        due_date DATE NOT NULL, 
        team_id UUID REFERENCES teams(id)
      );

      CREATE TABLE tasks (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        owner UUID REFERENCES users(id) NOT NULL,
        subject VARCHAR(150),
        description TEXT,
        project_id UUID REFERENCES projects(id) NOT NULL,
        priority SMALLINT,
        start_date DATE,
        end_date DATE,
        status TEXT,
        parent_task_id UUID,
        sub_task_id UUID
      );

      ALTER TABLE teams
      ADD COLUMN project_id UUID REFERENCES projects(id);
<<<<<<< HEAD
    `);
  } catch(err) {
=======
      `);
  } catch (err) {
>>>>>>> origin/main
    console.log(err);
  }
}


const syncAndSeed = async () => {
  await client.connect();
  console.log('CONNECTED TO THE DB');

<<<<<<< HEAD
  console.log('DROPPING TABLES');
  await dropTables();
  console.log('TABLES DROPPED');

  console.log('CREATING TABLES');
=======

  console.log('dropping tables');
  await dropTables();
  console.log('TABLES DROPPED');


  console.log('creating tables');
>>>>>>> origin/main
  await createTables();
  console.log('TABLES CREATED');


  console.log('creating users');
  await createUsers(`John`,`Doe`, `password123`, `johndoe`, `johndoe@example.com`);
  await createUsers(`Jane`, `Smith`, `pass456`, `janesmith`, `janesmith@example.com`);
  await createUsers(`Michael`, `Johnson`, `secret789`, `mikejohnson`, `mikej@example.com`);
  await createUsers(`Emily`, `Williams`, `pass321`, `emilyw`, `emilyw@example.com`);
  await createUsers(`Daniel`, `Brown`, `password999`, `danbrown`, `danbrown@example.com`);
  await createUsers(`Olivia`, `Davis`, `securepass`, `oliviad`, `olivia.d@example.com`);
  await createUsers(`James`, `Garcia`, `qwerty123`, `jamesg`, `jamesg@example.com`);
  await createUsers(`Sophia`, `Martinez`, `12345secure`, `sophiam`, `sophiam@example.com`);
  await createUsers(`William`, `Rodriguez`, `pass2023`, `williamr`, `williamr@example.com`);
  await createUsers(`Isabella`, `Lee`, `mypassword1`, `isabellal`, `isabellal@example.com`);
  await createUsers(`Ethan`, `Harris`, `secret456`, `ethanh`, `ethanh@example.com`);
  await createUsers(`Mia`, `Clark`, `112233pass`, `miac`, `miac@example.com`);
  console.log('USERS CREATED');


  console.log('creating projects');
  await createProjects(`Four Winds`, `A project to build a new website`, `In Progress`, `2021-01-01`, `2021-02-01`);
  await createProjects(`Bagel Mania`, `A project dedicated to delicious bagels`, `In Progress`, `2021-01-01`, `2021-02-01`);
  await createProjects(`Tea Time`, `With the power of Tea, our coding prevails!`, `In Progress`, `2021-01-01`, `2021-02-01`);
  console.log('PROJECTS CREATED');


<<<<<<< HEAD

  console.log('CREATING TASKS');
  //Normal task 1
  await createTasks(uuidv4(),uuidv4(),'Set Up Backend','Initialize Express.js with PostgreSQL.',uuidv4(),4,'2025-01-01','2025-05-03','in-progress',null,null);
  // Normal task 2
  await createTasks(uuidv4(), uuidv4(), 'Write Documentation', 'Prepare user guides and API docs.', uuidv4(), 3, '2025-03-01', '2025-06-10', 'in-progress', null, null);
  // High-priority urgent task
  await createTasks(uuidv4(), uuidv4(), 'Fix Production Bug', 'Critical issue causing downtime.', uuidv4(), 5, '2025-02-10', '2025-04-01', 'in-progress', null, null);
  // Task with parent
  await createTasks(uuidv4(), uuidv4(), 'Database Optimization', 'Improve query performance and indexing.', uuidv4(), 3, '2025-03-03', '2025-03-31', 'in-progress', parentTaskId, null);
  // Parent task with subtask
  await createTasks(parentTaskId, uuidv4(), 'Develop Authentication System', 'Create user authentication using JWT.', uuidv4(), 2, '2025-02-04', '2025-04-20', 'in-progress', null, subTaskId);
  // Subtask of the above parent task
  await createTasks(subTaskId, uuidv4(), 'Build Login API', 'Develop API for login and authentication.', uuidv4(), 1, '2025-03-05', '2025-03-29', 'in-progress', parentTaskId, null);
  // Paused task
  await createTasks(uuidv4(), uuidv4(), 'Complete UI Testing', 'Ensure UI is bug-free and responsive.', uuidv4(), 0, '2025-02-20', '2025-03-05', 'paused', null, null);
  // Completed Task
  await createTasks(uuidv4(), uuidv4(), 'Deploy App to Production', 'Make the final release live.', uuidv4(), 1, '2025-01-07', '2025-02-08', 'completed', null, null);
  console.log('TASKS CREATED');
=======
  console.log('creating tasks');
  await
    console.log('TASKS CREATED');


  console.log(`creating teams`);
  await
    console.log(`TEAMS CREATED`);

>>>>>>> origin/main



  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();