// if module gets required, export the following:

module.exports = {

    // If this function is called, render the 'home' view and pass title = "Home" as object
    home: function(request,response){
	return response.status(200).render('home',{
	    title: "Home"
	});
    },
    visualization: function(request,response){
	return response.status(200).render('visualization',{
	    title:"Visualization"
	});
    }
};
