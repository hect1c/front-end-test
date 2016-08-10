const Campus = require('../models/Campus');

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

exports.setCampus = (req, res) => {
	//find campus based on id
	Campus.findOne({ _id: req.params.id }, (err, campus) => {
		if(err) return console.error(err);

		console.log(campus);
	});
};
