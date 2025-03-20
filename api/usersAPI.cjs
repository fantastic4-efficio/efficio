const express = require('express');
const router = express.Router();

const{createUsers, authenticateUser, fetchUsersByTeamName,fetchMyAccountInfo} = require('../db/users.cjs');


// GET - Get users by team names
router.get('/usersByTeam/:team_name', async(req, res, next) => {
  const {team_name} = req.params;

  try{
    const usersByTeamNames = await fetchUsersByTeamName(team_name);
    res.send(usersByTeamNames);
  } catch(err) {
    next(err);
  }
});


// GET - MyAccountPage - Get users by team names
router.get('/myaccountinfo/:username', async(req, res, next) => {
  const {username} = req.params;

  try{
    const myAccountInfo = await fetchMyAccountInfo(username);
    res.send(myAccountInfo);
  } catch(err) {
    next(err);
  }
});


// POST - create new user//register
router.post('/register', async(req, res, next) => {
  try{
   const {first_name, last_name, password, username, email} = req.body;
  const createdUser = await createUsers(first_name, last_name, password, username, email);
    if(createdUser) {
      res.status(201).json({message: "User created successfully!"});
    }
  } catch (err) {
   next(err)
   res.send(err.message);
  }
 });
 
 
 //POST - Login user
 router.post('/login', async(req, res, next) => {
   try{
     const {username, password} = req.body;
 
     const authToken = await authenticateUser(username, password);
      res.send({token: authToken});
   } catch(err){
     res.send(err.mesage);
   }
 });

module.exports  = router;