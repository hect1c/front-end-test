const Promise = require('bluebird'),
      mongoose = Promise.promisifyAll(require("mongoose")),
      Campus = require('../models/Campus'),
      fixtures = require('node-mongoose-fixtures');

//program
const programSchema = new mongoose.Schema({
  title: String,
  description: String,
  main: Boolean,
  module: { type: mongoose.Schema.Types.Mixed, ref: 'Campus' }
}, { timestamps: true });

const Program = mongoose.model('Program', programSchema);

fixtures.reset('Program', (err, data) => {
    if(err) return console.error(err);
});

fixtures({
  Program: [
    {
      title: 'Module A-C',
      description: 'September - May',
      main: true
    },
    {
      title: 'Module E',
      description: 'June',
      main: false
    },
    {
      title: 'Module D',
      description: 'August',
      main: false
    },
  ]
}, (err, data) => {
  var data = data[0];
  var query = Campus.findOne({ city: 'Boston' });
  var programQuery = null;

  query
    .then((doc) => {
      for( var key in data ){
        if( data[key].main == true ){
          Program.update({ _id: data[key]._id }, { module : doc }, (err, res) => {
            if(err) return console.error(err);
            console.log(res);
          });
        }
      }
      return doc;
    });
});

module.exports = Program;
