const client = require('./client.cjs');
require('dotenv').config();

const { createTeams, createTeamUser, createTeamProject, readUserId, readTeamId, readProjectId } = require('./teams.cjs');
const { createProjects } = require('./projects.cjs');
const { createUsers } = require('./users.cjs');
const { createTasks } = require('./tasks.cjs');

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS tasks CASCADE;
      DROP TABLE IF EXISTS projects_teams CASCADE;
      DROP TABLE IF EXISTS teams_users CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS teams CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
  } catch (err) {
    console.log(err);
  }
}

const createTables = async() => {
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
        email VARCHAR(150) UNIQUE NOT NULL
      );

      CREATE TABLE projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        project_name VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(30) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL 
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

      CREATE TABLE teams_users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE projects_teams (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE
      );
      
      `);
  } catch (err) {
    console.log(err);
  }
}


const syncAndSeed = async () => {
  await client.connect();
  console.log('CONNECTED TO THE DB');


  console.log('DROPPING TABLES');
  await dropTables();
  console.log('TABLES DROPPED');


  console.log('CREATING TABLES');
  await createTables();
  console.log('TABLES CREATED');

  console.log('CREATING TEAMS');
  const team1 = await createTeams('Development');
  const team2 = await createTeams('Design');
  const team3 = await createTeams('Marketing');
  const team4 = await createTeams('Technology');
  const team5 = await createTeams('Finance');
  const team6 = await createTeams('HR');
  console.log('TEAMS CREATED');


  console.log('CREATING USERS');
  const user1 = await createUsers(`John`,`Doe`, `password123`, `johndoe`, `johndoe@example.com`);
  const user2 = await createUsers(`Jane`, `Smith`, `pass456`, `janesmith`, `janesmith@example.com`);
  const user3 = await createUsers(`Michael`, `Johnson`, `secret789`, `mikejohnson`, `mikej@example.com`);
  const user4 = await createUsers(`Emily`, `Williams`, `pass321`, `emilyw`, `emilyw@example.com`);
  const user5 = await createUsers(`Daniel`, `Brown`, `password999`, `danbrown`, `danbrown@example.com`);
  const user6 = await createUsers(`Olivia`, `Davis`, `securepass`, `oliviad`, `olivia.d@example.com`);
  const user7 = await createUsers(`James`, `Garcia`, `qwerty123`, `jamesg`, `jamesg@example.com`);
  const user8 = await createUsers(`Sophia`, `Martinez`, `12345secure`, `sophiam`, `sophiam@example.com`);
  const user9 = await createUsers(`William`, `Rodriguez`, `pass2023`, `williamr`, `williamr@example.com`);
  const user10 = await createUsers(`Isabella`, `Lee`, `mypassword1`, `isabellal`, `isabellal@example.com`);
  const user11 = await createUsers(`Ethan`, `Harris`, `secret456`, `ethanh`, `ethanh@example.com`);
  const user12 = await createUsers(`Mia`, `Clark`, `112233pass`, `miac`, `miac@example.com`);
  console.log('USERS CREATED');


  console.log('CREATING PROJECTS');
  const project1 = await createProjects(`Four Winds`, `A project to build a new website`, `in-progress`, `2025-01-01`, `2025-06-01`);
  const project2 = await createProjects(`Bagel Mania`, `A project dedicated to delicious bagels`, `in-progress`, `2025-01-06`, `2025-07-01`);
  const project3 = await createProjects(`Tea Time`, `With the power of Tea, our coding prevails!`, `in-progress`, `2025-03-01`, `2025-12-01`);
  const project4 = await createProjects(`Skyline ERP`, `Development of an enterprise resource planning system`, `completed`, `2025-02-15`, `2025-12-31`);
  const project5 = await createProjects(`Cybersecurity Enhancement`, `Improving security protocols and infrastructure`, `in-progress`, `2025-02-01`, `2025-05-15`);
  const project6 = await createProjects(`EdTech Learning Platform`, `Creating an interactive education platform with AI`, `paused`, `2025-05-01`, `2025-11-01`);
  console.log('PROJECTS CREATED');


  console.log('CREATING TASKS');
  //Normal task 1
  const task1 = await createTasks(`${user1.id}`,'Set Up Backend','Initialize Express.js with PostgreSQL.',`${project1.id}`,4,'2025-01-01','2025-05-03','in-progress',null,null);
  // Normal task 2
  const task2 = await createTasks(`${user2.id}`, 'Write Documentation', 'Prepare user guides and API docs.',`${project2.id}`, 3, '2025-03-01', '2025-06-10', 'in-progress', null, null);
  // High-priority urgent task
  const task3 = await createTasks(`${user3.id}`, 'Fix Production Bug', 'Critical issue causing downtime.',`${project2.id}`, 5, '2025-02-10', '2025-04-01', 'in-progress', null, null);
  // Task with parent
  const task4 = await createTasks(`${user4.id}`, 'Database Optimization', 'Improve query performance and indexing.', `${project3.id}`, 3, '2025-03-03', '2025-03-31', 'in-progress',`${task2.id}`, null);
  // Parent task with subtask
  const task5 = await createTasks(`${user5.id}`, 'Develop Authentication System', 'Create user authentication using JWT.',`${project3.id}`, 2, '2025-02-04', '2025-04-20', 'in-progress', null, `${task3.id}`);
  // Subtask of the above parent task
  const task6 = await createTasks(`${user6.id}`, 'Build Login API', 'Develop API for login and authentication.',`${project5.id}`, 1, '2025-03-05', '2025-03-29', 'in-progress', `${task3.id}`, null);
  // Paused task
  const task7 = await createTasks(`${user7.id}`, 'Complete UI Testing', 'Ensure UI is bug-free and responsive.',`${project6.id}`, 0, '2025-02-20', '2025-03-05', 'paused', null, null);
  // Completed Task
  const task8 = await createTasks(`${user8.id}`, 'Deploy App to Production', 'Make the final release live.',`${project4.id}`, 1, '2025-01-07', '2025-02-08', 'completed', null, null);
  console.log('TASKS CREATED');


  console.log('ASSIGNING USER TO CERTAIN TEAM');
  const assignTeamUser1 = await createTeamUser(await readTeamId('Development'), await readUserId('johndoe'));
  const assignTeamUser2 = await createTeamUser(await readTeamId('Design'),await readUserId('johndoe'));
  console.log('USER ASSIGNED TO TEAM');


  console.log('ASSIGNING PORJECT TO CERTAIN TEAM');
  const assignTeamProject1 = await createTeamProject(await readTeamId('Design'),await readProjectId('Four Winds'));
  const assignTeamProject2 = await createTeamProject(await readTeamId('HR'),await readProjectId('Bagel Mania'));
  const assignTeamProject3 = await createTeamProject(await readTeamId('Finance'),await readProjectId('Tea Time'));
  const assignTeamProject4 = await createTeamProject(await readTeamId('Development'),await readProjectId('Skyline ERP'));
  const assignTeamProject5 = await createTeamProject(await readTeamId('Technology'),await readProjectId('Cybersecurity Enhancement'));
  const assignTeamProject6 = await createTeamProject(await readTeamId('Marketing'),await readProjectId('EdTech Learning Platform'));
  console.log('PROJECT ASSIGNED TO TEAM');



  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();