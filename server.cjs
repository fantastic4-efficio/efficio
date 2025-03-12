const{fetchAllTasksByProducts,getMyTasks,deleteExistingTask,updateExistingTask,createTasks} = require('./db/tasks.cjs');

const express = require('express');
const app = express();
app.use(express.json()); 

app.use(express.static('dist'));

const client = require('./db/client.cjs');
client.connect();

require('dotenv').config();



// GET - read all tasks by projects
app.get('/api/tasks/tasksbyproject/:project_id', async(req, res, next) => {
  const {project_id} = req.params;

  try{
    const allTasksByProject = await fetchAllTasksByProducts(project_id);

    res.send(allTasksByProject);

  } catch(err) {
    next(err);
  }
});


// GET - read all tasks for certain owner
app.get('/api/tasks/tasksbyowner/:owner_id', async(req, res, next) => {
  const {owner_id} = req.params;

  try{
    const allTasksByOwner = await getMyTasks(owner_id);

    res.send(allTasksByOwner);

  } catch(err) {
    next(err);
  }
});


// POST - create new tasks
app.post('/api/tasks/create-new-tasks', async(req, res, next) => {
  
  try{
    const{id, owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id} = req.body;
    
    if (!id || !owner || !subject || !description || !project_id || !start_date || !end_date || !status) {
      return res.status(400).json({error: "All fields are required!"});
    }

    const newTask = await createTasks(id, owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id);

    res.status(201).json({message: "Task created successfullt!!!", newTask});
  
  }catch(err) {
    next(err);
    res.status(500).json({error: "Server error"});
  }
});



// DELETE - delete existing task for certain project
app.delete('/api/tasks/deletetasks/:taskId', async(req, res, next) => {
  const {taskId} = req.params;
  console.log("Deleting TaskID:",taskId);
  try{

    const deletedTask = await deleteExistingTask(taskId);

    if (!deletedTask) {
      return res.status(404).json({error: "Task not found!"});
    }

    res.status(204).send();
  } catch(err) {
    next(err);
  }
});


// //  PATCH - edit an existing task by taskID
// app.patch('/api/tasks/update/:taskId', async(req, res, next) => {
//   const {taskId} = req.params;

//   try{
//     const updatedTask = await updateExistingTask(taskId);

//     if (!updatedTask) {
//       return res.status(404).json({error: "Task not found!"});
//     }

//     res.status(204).send();
//   } catch(err) {
//     next(err);
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});