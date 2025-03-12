const createProjects = async (project_name, team_id, description, status, start_date, due_date) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO projects (project_name, team_id, description, status, start_date, due_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `, [project_name, team_id, description, status, start_date, due_date]
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
      WHERE user_id = $1;
      `, [user_id]);
    return rows;
  } catch (error) {
    console.log(`Get Project Error`, error)
  }
}

module.exports = { createProjects, getProjects };