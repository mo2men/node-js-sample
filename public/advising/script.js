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

	createVisualisation(meatings);

    };

    // Actually start request
    xmlHttp.open("GET", '/api/schedule');
    xmlHttp.send();
}

/*
 Visualisation
 */

function createVisualisation(meatings) {

    /*
     Options
     */


    var width = 800;
    var hieght = width/2;
    var Square_side = 20;
    var color = d3.scale.category20();

    var meetingsStr=[];
    meetingsStr = meetings.forEach(function(meeting){
	return meeting.code+"\n"+meeting.type;
    });
    console.log(meetingStr);
    /*
     Creating an empty svg element
     */
    var svg = d3.select("#root").append("svg")
	.attr("width", width)
	.attr("height", height);

    /*
     Instantiate the graph layout using d3
    */

    var gaticule = d3.geo.graticule();
    var projection = d3.geo.equirectanguler().translate([0, 0]).scale(width / 2 / Math.Pi );
    var path =d3.geo.path().projection(projection);

    var outterg =svg.append("g")
	.attr("transfrom","translate("+width / 2 + "," + height / 2 +")");

    var g = outterg.append("g").attr("id","innerg");

    g.append("defs").append("path")
	.datum({type: "Sphere"})
	.attr("id","sphere")
	.attr("d",path);

    g.append("use")
	.attr("class","stroke")
	.attr("xlink:href","#sphere");

    g.append("use")
	.attr("class","fill")
	.attr("xlink:href","#sphere");


    g.append("path")
	.datum(graticule)
	.attr("class","graticule")
	.attr("d","path");


}
