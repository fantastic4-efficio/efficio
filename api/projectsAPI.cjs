const express = require('express');
const router = express.Router();
const{createProjects, getProjectsByTeams, getProjectsByUsers, getProjectsByUsername, deleteExistingProject, updateExistingProject} = require('../db/projects.cjs');



// GET - read projects by Team
router.get('/byteams/:team_id', async(req, res, next) => {
  const {team_id} = req.params;

  try{
    const projectByTeam = await getProjectsByTeams(team_id.trim()); // Trim any whitespace

    if (!projectByTeam || projectByTeam.length === 0) {
      return res.status(404).json({error: "No project found for this team!"});
    }

    res.json(projectByTeam);

  } catch(err) {
    console.error('error in /byteams:', err);
    next(err);
  }
});



// GET - read projects by User
router.get('/byusers/:user_id', async(req, res, next) => {
  const {user_id} = req.params;

  try{
    const projectByUser = await getProjectsByUsers(user_id.trim()); // Trim any whitespace


    if (!projectByUser || projectByUser.length === 0) {
      return res.status(404).json({error: "No project found for this user!"});
    }
    res.json(projectByUser);

  } catch(err) {
    next(err);
  }
});



// GET - mydashboard - read all project for certain username
router.get('/byusername/:username', async(req, res, next) => {
  const {username} = req.params;

  try{
    const allProjectsByUsername = await getProjectsByUsername(username);

    res.send(allProjectsByUsername);

  } catch(err) {
    next(err);
  }
});



// POST - create products
router.post('/create-new-project', async(req, res, next) => {
  // const {user_id} = req.params;

  try{
    const{project_name, description, status, start_date, end_date} = req.body;

    if (!project_name || !description || !status || !start_date || !end_date) {
      return res.status(400).json({error: "All fields are required!"});
    }

    const newProject = await createProjects(project_name, description, status, start_date, end_date);

    res.status(201).json({message: "Project has been created successfullt!!!", newProject});

  } catch(err) {
    next(err);
  }
});




// DELETE - delete existing project
router.delete('/delete-project/:project_id', async(req, res, next) => {
  const {project_id} = req.params;
  console.log("Deleting Project:", project_id);
  try{

    const deletedProject = await deleteExistingProject(project_id);

    if (!deletedProject) {
      return res.status(404).json({error: "Project not found!"});
    }

    res.status(204).send();
  } catch(err) {
    next(err);
  }
});


//  PATCH - edit an existing task by taskID
router.patch('/update/:projectId', async(req, res, next) => {
  try {
    const {projectId} = req.params;
    const updates = req.body; // Get fields to update

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const updatedProject = await updateExistingProject(projectId, updates);
    
    res.status(200).json({ message: "Project updated successfully!", project: updatedProject });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});




module.exports  = router;