// if module gets required, export the following:

module.exports = {

    home: function(request,response){
	return response.status(200).render('home',{
	    title: "Home"
	});
    }


};
