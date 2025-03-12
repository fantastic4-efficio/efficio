const client = require('./client.cjs');

const createUsers = async (first_name, last_name, password, username, email) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO users(first_name, last_name, password, username, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [first_name, last_name, password, username, email]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { createUsers };