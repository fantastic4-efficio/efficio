const client = require('./client.cjs');
const { v4: isUUID } = require('uuid');


const createProjects = async (project_name, description, status, start_date, end_date) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO projects (project_name, description, status, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [project_name, description, status, start_date, end_date]
    );
    return rows[0];
  } catch (error) {
    console.log(`Project Error 1`, error);
  }
}

const getAllProjects = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM projects;
    `);
    return rows;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw new Error('Failed to retrieve projects');
  }
};


const getProjectsByTeams = async (team_id) => {
  try {
   // Validate if team_id is a UUID
     if (!isUUID(team_id)) {
       throw new Error(`Invalid UUID format: ${team_id}`);
     }
    
    const { rows } = await client.query(`
      SELECT projects.* FROM projects
      JOIN projects_teams ON projects.id = projects_teams.project_id
      WHERE projects_teams.team_id = $1;
    `, [team_id]);


    return rows; // Return all projects associated with the user
  } catch (error) {
    console.error(`Get Project Error:`, error);
  }
}


const getProjectsByUsers = async (user_id) => {
  try {
   // Validate if team_id is a UUID
     if (!isUUID(user_id)) {
       throw new Error(`Invalid UUID format: ${user_id}`);
     }
    
    const { rows } = await client.query(`
      SELECT projects.* FROM projects
      JOIN projects_teams ON projects.id = projects_teams.project_id
      JOIN teams_users ON projects_teams.team_id = teams_users.team_id
      WHERE teams_users.user_id = '${user_id}';
    `);


    return rows; // Return all projects associated with the user
  } catch (error) {
    console.error(`Get Project Error:`, error);
  }
}


const getProjectsByUsername = async (username) => {
    try { 
      const { rows: allProjectsByUsernames} = await client.query(`
      SELECT DISTINCT p.*
      FROM projects p
      JOIN projects_teams pt ON p.id = pt.project_id
      JOIN teams t ON pt.team_id = t.id
      JOIN teams_users tu ON t.id = tu.team_id
      JOIN users u ON tu.user_id = u.id
      WHERE u.username = $1;
`,[username]);
  
       return allProjectsByUsernames;
  
    } catch (err) {
       console.log(err);
    }
}


// delete existing project
const deleteExistingProject = async(project_id) => {
  try {
    const { rows: deletedProject } = await client.query(`
      DELETE FROM projects 
      WHERE id = $1
      RETURNING *
      `, [project_id]);

      if (deletedProject ) {
        return deletedProject;
      } else {
        throw Error({message:`Task not found`});
      }
  } catch (err) {
    console.log(err);
  }
}


module.exports = { 
  createProjects, 
  getProjectsByTeams,
  getProjectsByUsers, 
  getProjectsByUsername,
  deleteExistingProject};
