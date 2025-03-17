const client = require('./client.cjs');

const createTeams = async(team_name) => {
  try{
    const{ rows } = await client.query(`
       INSERT INTO teams (team_name)
       VALUES ($1)
       RETURNING *;
    `,[team_name])

    console.log('Team created:', rows);
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}


const createTeamUser = async(team_id,user_id) => {
  try{
    const{ rows } = await client.query(`
       INSERT INTO teams_users (team_id,user_id)
       VALUES ($1,$2)
       RETURNING *;
    `,[team_id,user_id])

    console.log('The User has been Assigned to a Team:', rows);
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}


const createTeamProject = async(team_id,project_id) => {
  try{
    const{ rows } = await client.query(`
      INSERT INTO projects_teams (team_id,project_id)
      VALUES ($1,$2)
      RETURNING *;
      `,[team_id,project_id])
      
      console.log('The Project has been Assigned to a Team:', rows);
      return rows[0];
    } catch(err) {
      console.log(err);
    }
  }
  
  const readUserId = async(username) => {
    try{
      const{ rows: userId } = await client.query(`
         SELECT id FROM users
         WHERE username = $1;
      `,[username])

      return userId[0].id;
    } catch(err) {
      console.log(err);
    }
  }
  
  
  const readTeamId = async(team_name) => {
    try{
      const{ rows: teamId } = await client.query(`
         SELECT id FROM teams
         WHERE team_name = $1;
      `,[team_name])
  
      return teamId[0].id;
    } catch(err) {
      console.log(err);
    }
  }


  const readProjectId = async(projectname) => {
    try{
      const{ rows: projectId } = await client.query(`
         SELECT id FROM projects
         WHERE project_name = $1;
      `,[projectname])
  
      return projectId[0].id;
    } catch(err) {
      console.log(err);
    }
  }


  const fetchAllTeamNames = async() => {
    try {
      const { rows: retrievedTeams } = await client.query(`
        SELECT team_name FROM teams;
      `);
  
      return retrievedTeams;
    } catch(err) {
      console.log(err);
    }
  }
  

  const assignUserToTeams = async(team_name, username) => {
    try {
      const { rows: assignedUsersToTeams } = await client.query(`
       INSERT INTO teams_users (team_id, user_id)
        VALUES (
          (SELECT id FROM teams WHERE team_name = $1),
          (SELECT id FROM users WHERE username = $2)
        );
      `,[team_name, username]);
  
      return assignedUsersToTeams;
    } catch(err) {
      console.log(err);
    }
  }
  
module.exports = { 
  createTeams,
  createTeamUser,
  createTeamProject,
  fetchAllTeamNames,
  assignUserToTeams,
  readUserId,
  readTeamId,
  readProjectId };