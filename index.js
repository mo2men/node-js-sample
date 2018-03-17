const express = require('express');
//const database = require('./database');

// Define the application
const app = express();


app.set('port', (process.env.PORT || 3000))

// where to load the views from
app.set('views','./app/views');
// which view engine to use
app.set('view engine','pug');

// Eport static folder (visible to the frontend, under the "/public" path)
app.use("/puplic",express.static(__dirname + '/public'))

//create router
var router = require('./router');
// Router listens on / (root)
app.use('/',router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

