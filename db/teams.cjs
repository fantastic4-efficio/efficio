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


module.exports = { createTeams };