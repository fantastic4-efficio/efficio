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
       INSERT INTO teams_users (team_id,project_id)
       VALUES ($1,$2)
       RETURNING *;
    `,[team_id,project_id])

    console.log('The Project has been Assigned to a Team:', rows);
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}



module.exports = { createTeams,createTeamUser,createTeamProject };