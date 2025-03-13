const client = require('./client.cjs');
const bcrypt = require('bcrypt');

const createUsers = async (first_name, last_name, password, username, email) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await client.query(`
      INSERT INTO users(first_name, last_name, password, username, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [first_name, last_name, hashedPassword, username, email]);
      
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const result = await client.query(`
      SELECT * FROM users
      WHERE username = $1;
      `, [username]);

      return result.rows[0];
  }catch(err){
    console.log(err);
    throw err;
  }
}
module.exports = { createUsers, getUserByUsername };