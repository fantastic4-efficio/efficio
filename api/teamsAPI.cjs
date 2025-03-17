const express = require('express');
const router = express.Router();

const{ fetchAllTeamNames, createTeams, assignUserToTeams } = require('../db/teams.cjs');



// GET - List All Team names
router.get('/allTeams', async(req, res, next) => {
  try{
    const allTeamNames = await fetchAllTeamNames();
    res.send(allTeamNames);
  } catch(err) {
    next(err);
  }
});



// POST - create team
router.post('/create-new-team', async(req, res, next) => {
  
  try{
    const{team_name} = req.body;
    
    if (!team_name) {
      return res.status(400).json({error: "All fields are required!"});
    }
    
    const newTeam = await createTeams(team_name);
    
    res.status(201).json({message: "Team has been created successfullt!!!", newTeam});
    
  } catch(err) {
    next(err);
  }
});



// POST - assign users to teams by team_name and user_name
router.post('/assignUsersToTeams', async(req, res, next) => {

  try{
    const{team_name, username} = req.body;

    if (!team_name || !username) {
      return res.status(400).json({error: "All fields are required!"});
    }

    const assignNewTeamMember = await assignUserToTeams(team_name, username);

    res.status(201).json({message: "User has been assigned to a team successfullt!!!"});

  } catch(err) {
    next(err);
  }
});



module.exports  = router;