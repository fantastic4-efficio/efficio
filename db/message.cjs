const client = require('./client.cjs');
require('dotenv').config();

const createMessages = async (content, userId, teamId) => {
  try {
    const res = await client.query(`
      INSERT INTO messages (content, user_id, team_id) 
      VALUES ($1, $2, $3) 
      RETURNING *;
      `,[content, userId, teamId]
    );
    console.log('Message inserted:', res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error('Error inserting message:', error);
  }
};

// More structured version (commented out for now)
/*
const { Pool } = require('pg');
require('dotenv').config();

// More structured approach using Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createMessages = async (content, userId, teamId) => {
  const query = {
    text: 'INSERT INTO messages (content, user_id, team_id) VALUES ($1, $2, $3) RETURNING *',
    values: [content, userId, teamId]
  };

  try {
    const res = await pool.query(query);
    console.log('Message inserted:', res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error('Error inserting message:', error);
  } finally {
    // Optionally close the connection (not necessary here)
    // await pool.end();
  }
};

REFERENCE CONNEX FROM MILITARY
*/

module.exports = { createMessages };
