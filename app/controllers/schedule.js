const scheduleModel = require('../models/schedule');

module.exports = {
    schedule: function(request, response){
	// "find" without further arguments will find all schedule entries
	scheduleModel.find(function(error, results){
	    // If there was an error, respond with a 500 error code (internal server error) and send the error
	    if(error){
		return response.status(500).send(error);
	    } else {
		// If no error was produced, respond with 200 (OK) and send the results
		return response.status(200).send(results);
	    }
	});
    }
};
