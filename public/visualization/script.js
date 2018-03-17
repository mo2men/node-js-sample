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

	console.log(meetings);

    };

    // Actually start request
    xmlHttp.open("GET", '/api/schedule');
    xmlHttp.send();
}

/*
 Visualisation
 */

function createVisualisation(nodes, links) {

    /*
     Options
     */

    var height = 800;
    var width = 800;
    var nodeRadius = 5;
    var color = d3.scale.category20();


    /*
     Creating an empty svg element
     */
    var svg = d3.select("#root").append("svg")
	.attr("width", width)
	.attr("height", height);

    /*
     Instantiate the graph layout using d3
     */

    var forceLayout = d3.layout.force()
	.charge(-220)
	.linkDistance(100)
	.size([height, width])
	.nodes(nodes)
	.links(links)
	.start();


    /*
     Add svg element for every node and link.
     */

    var link = svg.selectAll(".link")
	.data(links)
	.enter().append("line")
	.attr("class", "link")
	.style("stroke-width", function (d) {
	    return Math.sqrt(d.weight);
	});

    var node = svg.selectAll(".node")
	.data(nodes)
	.enter().append("circle")
	.attr("class", "node")
	.attr("r", nodeRadius)
	.style("fill", function (d) {
	    return color(d.name);
	});

    /*
     Add event handling
     */

    node.on('click', function () {
	    d3.select(this)
		.transition()
		.duration(750)
		.attr("r", 20)
		.style("fill", "lightsteelblue");
	})
	.on('dblclick', function () {
	    d3.select(this)
		.transition()
		.duration(750)
		.attr("r", nodeRadius)
		.style("fill", "red");
	});

    /*
     Add render method. This defines the behaviour of
     svg elements at every step ('tick') of the simulation.
     */

    forceLayout.on("tick", function () {
	link.attr("x1", function (d) {
		return d.source.x;
	    })
	    .attr("y1", function (d) {
		return d.source.y;
	    })
	    .attr("x2", function (d) {
		return d.target.x;
	    })
	    .attr("y2", function (d) {
		return d.target.y;
	    });

	node.attr("cx", function (d) {
		return d.x;
	    })
	    .attr("cy", function (d) {
		return d.y;
	    });
    });
}
