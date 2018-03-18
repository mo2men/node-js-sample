// Require dependecies
const express = require('express');
const router = new express.Router();

// frontend controller and fronted routes
const frontendController = require('./app/controllers/frontend');

// if the home gets requested, execut the function on the front Controller called "home"
router

    .get("/",frontendController.home)
    .get("/advising",frontendController.advising);

// Require schedule controller and define API
const scheduleController =require('./app/controllers/schedule');

router
    .get("/api/schedule",scheduleController.schedule);

// Export router
module.exports =router;
