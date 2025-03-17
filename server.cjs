const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const cors = require('cors');


const { fetchAllTasksByProducts, getMyTasks, deleteExistingTask, updateExistingTask, createTasks } = require('./db/tasks.cjs');
const { createProjects, getProjects } = require('./db/projects.cjs');
const { createUsers, authenticateUser } = require('./db/users.cjs');


const client = require('./db/client.cjs');
client.connect();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));


app.use('/api', require('./api/index.cjs'));


app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
})

app.get('/projects', authenticateUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await getProjectsByUser(userId);
    res.json(projects);
  } catch (err) {
    next(err);
  }
});


// GET - read projects by users
app.get('/api/myproject/user/:user_id', async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const projectByUser = await getProjects(user_id);

    res.send(projectByUser);

  } catch (err) {
    next(err);
  }
});


// GET - read all tasks by projects
app.get('/api/tasks/tasksbyproject/:project_id', async (req, res, next) => {
  const { project_id } = req.params;

  try {
    const allTasksByProject = await fetchAllTasksByProducts(project_id);

    res.send(allTasksByProject);

  } catch (err) {
    next(err);
  }
});


// GET - read all tasks for certain owner
app.get('/api/tasks/tasksbyowner/:owner_id', async (req, res, next) => {
  const { owner_id } = req.params;

  try {
    const allTasksByOwner = await getMyTasks(owner_id);

    res.send(allTasksByOwner);

  } catch (err) {
    next(err);
  }
});

app.post('/projects', async (req, res, next) => {
  try {
    const newProject = req.body; 
    const createdProject = await createProjects(newProject); 
    res.status(201).json(createdProject);
  } catch (err) {
    next(err);
  }
});


// POST - create new user//register !!!!!!
app.post('/api/users/register', async (req, res, next) => {
  try {
    const { firstname, lastname, password, username, email } = req.body;

    await createUsers(firstname, lastname, password, username, email);
    res.send("User Created successfull");
  } catch (err) {
    next(err)
    res.send(err.message);
  }
});

//POST - Login user
app.post('/api/users/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const authToken = await authenticateUser(username, password);
    res.send({ token: authToken });
  } catch (err) {
    res.send(err.mesage);
  }
})

// POST - create new tasks
app.post('/api/tasks/create-new-tasks', async (req, res, next) => {

  try {
    const { owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id } = req.body;

    if (!owner || !subject || !description || !project_id || !start_date || !end_date || !status) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newTask = await createTasks(owner, subject, description, project_id, priority, start_date, end_date, status, parent_task_id, sub_task_id);

    res.status(201).json({ message: "Task created successfullt!!!", newTask });

  } catch (err) {
    next(err);
    res.status(500).json({ error: "Server error" });
  }
});



// DELETE - delete existing task for certain project
app.delete('/api/tasks/deletetasks/:taskId', async (req, res, next) => {
  const { taskId } = req.params;
  console.log("Deleting TaskID:", taskId);
  try {

    const deletedTask = await deleteExistingTask(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found!" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});


//  PATCH - edit an existing task by taskID
app.patch('/api/tasks/update/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updates = req.body; // Get fields to update

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const updatedTask = await updateExistingTask(taskId, updates);

    res.status(200).json({ message: "Task updated successfully!", task: updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chatMessage', (msg) => {
    console.log('Message received:', msg);
    io.emit('chatMessage', msg); // Emit message to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Run server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});