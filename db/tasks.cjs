const client = require('./client.cjs');
require('dotenv').config();


const createTasks = async(id, owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id) => {
  
  try{
    const{ rows } = await client.query(`
       INSERT INTO tasks (id, owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *;
    `,[id, owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id])

    console.log('Task created:', rows[0]);
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

  
// read certain owners' task - renderw with owner/user_id
const getMyTasks= async(owner_id) => {
   try { 
    const { rows: allTasksByOwner} = await client.query(`
     SELECT * FROM tasks 
     WHERE owner = $1
   `,[owner_id]);

     return allTasksByOwner;

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


// // PATCH
// const updateExistingTask= async(taskId) => {
//   try {
//     const { rows: updatedTask } = await client.query(`
//       UPDATE tasks
//       SET ${setValue.join(', ')}
//       WHERE id = $1
//       RETURNING *;
//     `,[taskId])

//     return updatedTask[0];
//   } catch (err) {
//     console.log(err);
//   }
// }



module.exports = {
  createTasks,
  fetchAllTasksByProducts,
  deleteExistingTask,
  //updateExistingTask,
  getMyTasks
}