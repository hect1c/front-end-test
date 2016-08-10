const Campus = require('../models/Campus'),
	  Program = require('../models/Program');

/**
 * GET /modules
 * Modules.
 */
exports.getAllCampus = (req, res) => {
	Campus.find({}, (err, campuses ) => {
		if(err) return console.error(err);
		return res.status(200).json(campuses);
	});
};

exports.setCampus = (req, res, next) => {
	const campusId = req.params.campusId;
	const moduleId = req.params.moduleId;

	//find campus based on id
	Campus.findOne({ _id: campusId }, (err, campus) => {
		if(err) return console.error(err);
		//update Program with new module
		Program.update({ _id: moduleId }, { module: campus }, (err, program) => {
			if(err) return console.error(err);

			//udpate save redirect to home page
    		res.redirect('/');
		})
	});
};
