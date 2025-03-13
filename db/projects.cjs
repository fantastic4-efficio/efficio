const client = require('./client.cjs');
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

const getProjects = async (user_id) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM projects 
      JOIN users ON projects.team_id = users.team_id
      WHERE users.id = $1;
      `, [user_id]);
    return rows[0];
  } catch (error) {
    console.log(`Get Project Error`, error)
  }
}

module.exports = { createProjects, getProjects };