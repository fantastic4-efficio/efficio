const express = require('express');
const router = express.Router();

const{createUsers, authenticateUser} = require('../db/users.cjs');



// POST - create new user//register
router.post('/register', async(req, res, next) => {
  try{
   const {firstname, lastname, password, username, email} = req.body;
 
   await createUsers(firstname, lastname, password, username, email);
   res.send("User Created successfull");
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