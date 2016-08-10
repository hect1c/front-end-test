const Program = require('../models/Program'),
	  Campus = require('../models/Campus'),
      fixtures = require('node-mongoose-fixtures');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  //load programs
  Program.find({}, (err, programs) => {
    if(err) return console.error(err);
    res.render('home', {title: 'Home', programs: programs})
  });
};
