const express = require('express');
const router = express.Router();

const{createUsers, authenticateUser} = require('../db/users.cjs');



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