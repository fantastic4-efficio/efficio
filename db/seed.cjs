const { v4: uuidv4 } = require('uuid');
const client = require('./client.cjs');
const { createProjects } = require('./projects.cjs');
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
      `);
  } catch (err) {
    console.log(err);
  }
}


const syncAndSeed = async () => {
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
  await createProjects(`Four Winds`, `A project to build a new website`, `In Progress`, `2021-01-01`, `2021-02-01`);
  await createProjects(`Bagel Mania`, `A project dedicated to delicious bagels`, `In Progress`, `2021-01-01`, `2021-02-01`);
  await createProjects(`Tea Time`, `With the power of Tea, our coding prevails!`, `In Progress`, `2021-01-01`, `2021-02-01`);
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