const Promise = require('bluebird'),
      mongoose = Promise.promisifyAll(require("mongoose")),
      fixtures = require('node-mongoose-fixtures');

//campus
const campusSchema = new mongoose.Schema({
  city: String,
  country: String,
  color: String,
  img: String,
}, { timestamps: true });

const Campus = mongoose.model('Campus', campusSchema);

fixtures.reset('Campus', (err, data) => {
    if(err) return console.error(err);
});

fixtures({
  Campus: [
    {
      city: 'Boston',
      country: 'United States of America',
      color: "#1a82b3",
      img: "./img/boston.png"
    },
    {
      city: 'San Francisco',
      country: 'United States of America',
      color: "#b32c1a",
      img: "./img/click.png"
    },
    {
      city: 'London',
      country: 'United Kingdom',
      color: "#8d333f",
      img: "./img/london.jpg"
    },
    {
      city: 'Dubai',
      country: 'United Arab of Emirates',
      color: "#305935",
      img: "./img/click.png"
    },
    {
      city: 'Shanghai',
      country: 'China',
      color: "#338d81",
      img: "./img/click.png"
    },
    {
      city: 'New York',
      country: 'United States of America',
      color: "#ff6000",
      img: "./img/click.png"
    },
    {
      city: 'Ashridge',
      country: 'United States of America',
      color: "#94d600",
      img: "./img/click.png"
    }
  ]
}, (err, data) => {
  //data is an array of all the documents created
});

module.exports = Campus;
