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
	var query = null;
	var programId = null;

	//update program function
	function updateProgram(query, data, cb) {
		//update Program with new module
		Program.update(query, data, (err, program) => {
			if(err) return console.error(err);

			//udpate save redirect to home page
    		cb(program);
		});
	};

	if( campusId == 1 ) {
		//get campus Id from main Program
		Program.findOne({ main: true }, (err, program) => {
			if(err) return console.error(err);

			updateProgram({ _id: moduleId }, { module: program.module }, (err, program) => {
				res.redirect('/');
			});
		});
	} else {
		//find campus based on id
		Campus.findOne({ _id: campusId }, (err, campus) => {
			if(err) return console.error(err);

			updateProgram({ _id: moduleId }, { module: campus }, (err, program) => {
				res.redirect('/');
			});
		});
	}
};
