/**
 * Created by ds on 09/06/16.
 */

/*
 API Call for data retrieval
 */

function loadData() {

    console.log("Loading Data from API...");

    // Create a new request object
    var xmlHttp = new XMLHttpRequest();

    // Define what happens after successful response
    xmlHttp.onload = function () {
	var response = JSON.parse(this.responseText);

	// extract list of meeting
 	var meetings=[];
	response.forEach(function(connection){
	    var isOld = meetings.find(function(meeting){
		return (
		    (meeting.code === connection.code) && (meeting.type === connection.type) && (meeting.day === connection.day) && (meeting.start === connection.start) && (meeting.duration === connection.duration));
	   });
	    if(!isOld){
		meetings.push({code: connection.code,
			       type: connection.type,
			       day: connection.day,
			       start: connection.start,
			       duration: connection.duration
			      });
	    }
	});

	//createVisualisation(meatings);

    };

    // Actually start request
    xmlHttp.open("GET", '/api/schedule');
    xmlHttp.send();
}

/*
 Visualisation
 */


