const client = require('./client.cjs');
require('dotenv').config();


const createTasks = async(owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id) => {
  
  try{
    const{ rows } = await client.query(`
       INSERT INTO tasks (owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *;
    `,[owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id])

    console.log('Task created:', rows);
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}



// read all tasks by projects
const fetchAllTasksByProducts = async(project_id) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM tasks
      where project_id = $1;
      `,[project_id]);

      return rows[0];

    } catch (err) {
      console.log(err);
    }
  }

  
// read certain owners' task - render with username
const getMyTasks= async(username) => {
   try { 
    const { rows: allTasksByOwner} = await client.query(`
     SELECT * FROM tasks t
     JOIN users u ON t.owner = u.id
     WHERE username = $1
   `,[username]);

     return allTasksByOwner;

  } catch (err) {
     console.log(err);
  }
}


// Dashboard - read tasks completion status by percentage with username
const getMyTasksPercentage = async(username) => {
  try { 
   const { rows: results} = await client.query(`
   SELECT 
    u.username,
    ROUND(
        (COUNT(CASE WHEN t.status = 'in-progress' THEN 1 END) * 100.0) / COUNT(*),
        1
    ) AS in_progress_percentage,
    ROUND(
        (COUNT(CASE WHEN t.status = 'paused' THEN 1 END) * 100.0) / COUNT(*),
        1
    ) AS paused_percentage,
    ROUND(
        (COUNT(CASE WHEN t.status = 'completed' THEN 1 END) * 100.0) / COUNT(*),
        1
    ) AS completed_percentage
  FROM 
      tasks t
  JOIN
      users u ON t.owner = u.id
  WHERE 
      u.username = $1
  GROUP BY 
      u.username;
  `,[username]);

    return results;

 } catch (err) {
    console.log(err);
 }
}



// delete existing task
const deleteExistingTask = async(taskId) => {
  try {
    const { rows: deletedTasks } = await client.query(`
      DELETE FROM tasks 
      WHERE id = $1
      RETURNING *
      `, [taskId]);

      if (deletedTasks) {
        return deletedTasks;
      } else {
        throw Error({message:`Task not found`});
      }
  } catch (err) {
    console.log(err);
  }
}


// PATCH
const updateExistingTask = async (taskId, updates) => {
  try {
    if (!Object.keys(updates).length) {
      throw new Error("No fields provided for update.");
    }

    let query = 'UPDATE tasks SET';
    const values = [];
    let index = 1;

    // Dynamically construct the SQL query for partial updates
    for (const [key, value] of Object.entries(updates)) {
      query += ` ${key} = $${index},`;
      values.push(value);
      index++;
    }

    query = query.slice(0, -1); // Remove trailing comma
    query += ` WHERE id = $${index} RETURNING *;`;
    values.push(taskId);

    const { rows } = await client.query(query, values);

    if (rows.length === 0) {
      throw new Error("Task not found.");
    }

    return rows[0];
  } catch (err) {
    console.error("Error updating task:", err.message);
    throw err;
  }
};



module.exports = {
  createTasks,
  fetchAllTasksByProducts,
  deleteExistingTask,
  updateExistingTask,
  getMyTasks,
  getMyTasksPercentage
}