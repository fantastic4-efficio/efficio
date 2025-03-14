const client = require('./client.cjs');
const createProjects = async (project_name, description, status, start_date, due_date) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO projects (project_name, description, status, start_date, due_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [project_name, description, status, start_date, due_date]
    );
    return rows[0];
  } catch (error) {
    console.log(`Project Error 1`, error);
  }
}

const getProjects = async (user_id) => {
  try {
    const { rows } = await client.query(`
      SELECT projects.* FROM projects
      JOIN projects_teams ON projects.id = projects_teams.project_id
      JOIN teams_users ON projects_teams.team_id = teams_users.team_id
      WHERE teams_users.user_id = $1;
    `, [user_id]);

    return rows; // Return all projects associated with the user
  } catch (error) {
    console.error(`Get Project Error:`, error);
  }
}

module.exports = { createProjects, getProjects };