// Require dependecies
const express = require('express');
const router = new express.Router();


const frontendController = require('./app/controllers/frontend');

// if the home gets requested, execut the function on the front Controller called "home"
router.get("/",frontendController.home);


// Export router
module.exports =router;
