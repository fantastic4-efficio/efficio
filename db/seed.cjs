const client = require('./client.cjs');
require('dotenv').config();

const { createTeams, createTeamUser, createTeamProject, readUserId, readTeamId, readProjectId } = require('./teams.cjs');
const { createProjects } = require('./projects.cjs');
const { createUsers } = require('./users.cjs');
const { createTasks } = require('./tasks.cjs');
const { createMessages } = require('./message.cjs');

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS tasks CASCADE;
      DROP TABLE IF EXISTS projects_teams CASCADE;
      DROP TABLE IF EXISTS teams_users CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS teams CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS messages CASCADE;
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
        email VARCHAR(150) UNIQUE NOT NULL,
        user_avatar TEXT
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
        parent_task_id UUID REFERENCES tasks(id),
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

      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
        team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  const team7 = await createTeams('Laws');
  const team8 = await createTeams('IC');
  console.log('TEAMS CREATED');


  console.log('CREATING USERS');
  const user1 = await createUsers(`John`,`Doe`, `password123`, `johndoe`, `johndoe@example.com`, ``);
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
  const user13 = await createUsers(`Alice`, `Johnson`, `alicepass123`, `alicej`, `alicej@example.com`);  
  const user14 = await createUsers(`Bob`, `Smith`, `bobsecure456`, `bobs`, `bobs@example.com`);  
  const user15 = await createUsers(`Charlie`, `Brown`, `charliepass789`, `charlieb`, `charlieb@example.com`);  
  console.log('USERS CREATED');


  console.log('CREATING PROJECTS');
  const project1 = await createProjects(`Four Winds`, `A project to build a new website`, `in-progress`, `2025-01-01`, `2025-06-01`);
  const project2 = await createProjects(`Bagel Mania`, `A project dedicated to delicious bagels`, `in-progress`, `2025-01-06`, `2025-07-01`);
  const project3 = await createProjects(`Tea Time`, `With the power of Tea, our coding prevails!`, `in-progress`, `2025-03-01`, `2025-12-01`);
  const project4 = await createProjects(`Skyline ERP`, `Development of an enterprise resource planning system`, `completed`, `2025-02-15`, `2025-12-31`);
  const project5 = await createProjects(`Cybersecurity Enhancement`, `Improving security protocols and infrastructure`, `in-progress`, `2025-02-01`, `2025-05-15`);
  const project6 = await createProjects(`EdTech Learning Platform`, `Creating an interactive education platform with AI`, `paused`, `2025-05-01`, `2025-11-01`);
  const project7 = await createProjects(`Smart Home Automation`, `Developing an integrated platform for home automation and IoT devices`, `in-progress`, `2025-06-01`, `2025-12-01`);
  const project8 = await createProjects(`John Doe Exclusive Project`, `Developing a custom solution tailored for John Doe's needs`,`paused`,`2025-06-01`, `2025-12-01`);
  console.log('PROJECTS CREATED');


  console.log('CREATING TASKS');
 //Normal task 1
 const task1 = await createTasks(`${user1.id}`,'Set Up Backend','Initialize Express.js with PostgreSQL.',`${project1.id}`,4,'2025-01-01','2025-05-03','in-progress',null,null);
 // Normal task 2
 const task2 = await createTasks(`${user2.id}`, 'Write Documentation', 'Prepare user guides and API docs.',`${project2.id}`, 3, '2025-03-01', '2025-06-10', 'in-progress', null, null);
 // Normal task 3
 const task3 = await createTasks(`${user1.id}`, 'Design UI Components', 'Create React components for the dashboard.', `${project1.id}`, 3, '2025-02-15', '2025-06-10', 'in-progress', null, null);
 // Normal task 4
 const task4 = await createTasks(`${user1.id}`,'Implement User Authentication','Set up user login system using JWT and bcrypt.',`${project1.id}`,3,'2025-02-01','2025-04-20','in-progress',null,null);
 // Normal task 5
 const task5 = await createTasks(`${user9.id}`,'Create Database Schema','Design tables and relationships for user data and tasks.',`${project1.id}`,5,'2025-02-10','2025-04-30','in-progress',null,null);
 // High-priority urgent task
 const task6 = await createTasks(`${user3.id}`, 'Fix Production Bug', 'Critical issue causing downtime.',`${project2.id}`, 5, '2025-02-10', '2025-04-01', 'in-progress', null, null);
 // Task with parent 1
 const task7 = await createTasks(`${user4.id}`, 'Database Optimization', 'Improve query performance and indexing.', `${project3.id}`, 3, '2025-03-03', '2025-03-31', 'in-progress',`${task2.id}`, null);
 // Task with parent 2
 const task8 = await createTasks(`${user1.id}`,'Deploy Application','Prepare the app for deployment on AWS and set up CI/CD pipelines.',`${project1.id}`,4,'2025-03-10','2025-06-01','in-progress',null,null);
 // Parent task with subtask
 const task9 = await createTasks(`${user5.id}`, 'Develop Authentication System', 'Create user authentication using JWT.',`${project3.id}`, 2, '2025-02-04', '2025-04-20', 'in-progress', null, `${task3.id}`);
 // Subtask of the above parent task
 const task10 = await createTasks(`${user6.id}`, 'Build Login API', 'Develop API for login and authentication.',`${project5.id}`, 1, '2025-03-05', '2025-03-29', 'in-progress', `${task3.id}`, null);
 // Paused task 1
 const task11 = await createTasks(`${user7.id}`, 'Complete UI Testing', 'Ensure UI is bug-free and responsive.',`${project6.id}`, 0, '2025-02-20', '2025-03-05', 'paused', null, null);
 // Paused task 2
 const task12 = await createTasks(`${user1.id}`,'Develop Frontend Interface','Build React components for the task management dashboard.',`${project1.id}`,4,'2025-02-15','2025-03-01','paused',null,null);
 // Completed Task 1
 const task13 = await createTasks(`${user8.id}`, 'Deploy App to Production', 'Make the final release live.',`${project4.id}`, 1, '2025-01-07', '2025-02-08', 'completed', null, null);
 // Completed Task 2
 const task14 = await createTasks(`${user1.id}`,'API Integration','Connect the frontend to the backend API for task management.',`${project1.id}`,3,'2025-03-01','2025-05-05','completed',null,null);
  // Completed Task 3
 const task15 = await createTasks(`${user1.id}`,'Set Up Testing Environment','Configure Jest and Cypress for unit and end-to-end tests.',`${project1.id}`,2,'2025-03-05','2025-05-10','completed',null,null);
  console.log('TASKS CREATED');




  console.log('ASSIGNING USER TO CERTAIN TEAM');
  const assignTeamUser1 = await createTeamUser(await readTeamId('Development'), await readUserId('johndoe'));
  const assignTeamUser2 = await createTeamUser(await readTeamId('Development'),await readUserId('bobs'));
  const assignTeamUser3 = await createTeamUser(await readTeamId('Design'),await readUserId('johndoe'));
  const assignTeamUser4 = await createTeamUser(await readTeamId('Design'),await readUserId('alicej'));
  const assignTeamUser5 = await createTeamUser(await readTeamId('Design'),await readUserId('charlieb'));
  const assignTeamUser6 = await createTeamUser(await readTeamId('Design'), await readUserId('janesmith'));
  const assignTeamUser7 = await createTeamUser(await readTeamId('Technology'), await readUserId('emilyw'));
  const assignTeamUser8 = await createTeamUser(await readTeamId('Technology'), await readUserId('miac'));
  const assignTeamUser9 = await createTeamUser(await readTeamId('Technology'), await readUserId('ethanh'));
  const assignTeamUser10 = await createTeamUser(await readTeamId('HR'), await readUserId('oliviad'));
  const assignTeamUser11 = await createTeamUser(await readTeamId('HR'), await readUserId('williamr'));
  const assignTeamUser12 = await createTeamUser(await readTeamId('Laws'), await readUserId('jamesg'));
  const assignTeamUser13 = await createTeamUser(await readTeamId('Laws'), await readUserId('isabellal'));
  const assignTeamUser14 = await createTeamUser(await readTeamId('Marketing'), await readUserId('sophiam'));
  const assignTeamUser15 = await createTeamUser(await readTeamId('Marketing'), await readUserId('mikejohnson'));
  const assignTeamUser16 = await createTeamUser(await readTeamId('Finance'), await readUserId('danbrown'));
  const assignTeamUser17 = await createTeamUser(await readTeamId('IC'), await readUserId('johndoe'));
  console.log('USER ASSIGNED TO TEAM');


  console.log('ASSIGNING PORJECT TO CERTAIN TEAM');
  const assignTeamProject1 = await createTeamProject(await readTeamId('Design'),await readProjectId('Four Winds'));
  const assignTeamProject2 = await createTeamProject(await readTeamId('HR'),await readProjectId('Bagel Mania'));
  const assignTeamProject3 = await createTeamProject(await readTeamId('Finance'),await readProjectId('Tea Time'));
  const assignTeamProject4 = await createTeamProject(await readTeamId('Development'),await readProjectId('Skyline ERP'));
  const assignTeamProject5 = await createTeamProject(await readTeamId('Technology'),await readProjectId('Cybersecurity Enhancement'));
  const assignTeamProject6 = await createTeamProject(await readTeamId('Marketing'),await readProjectId('EdTech Learning Platform'));
  const assignTeamProject7 = await createTeamProject(await readTeamId('Laws'),await readProjectId('Smart Home Automation'));
  const assignTeamProject8 = await createTeamProject(await readTeamId('IC'),await readProjectId('John Doe Exclusive Project'));
  console.log('PROJECT ASSIGNED TO TEAM');

  console.log('CREATING MESSAGES');
  const message1 = await createMessages('Hello, World', user1.id, team1.id);
  const message2 = await createMessages('Good Morning!', user2.id, team2.id);
  const message3 = await createMessages('Good Afternoon!', user3.id, team3.id);
  const message4 = await createMessages('Good Evening!', user4.id, team4.id);
  const message5 = await createMessages('Good Night!', user5.id, team5.id);
  console.log('MESSAGES CREATED');

  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();