const mongoose = require('mongoose');

const scheduleModel = mongoose.model('schedule', {
    // Our model will be composed of four compulsory fields: code, day , start and duration
    // And subject, instr and room are optional
    code: {
	type: String,
	require: true
    },
    subject:{
	type: String,
	require: false
    },
    type:{
	type: String,
	require: true
    },
    instr:{
	type: String,
	require: false
    },
    room: {
	type: String,
	require: false
    },
    day: {
	type: String,
	require: true
    },
    start: {
	type: Number,
	require: true
    },
    duration: {
	type: Number,
	require: true }
},'schedule');

module.exports = scheduleModel;
