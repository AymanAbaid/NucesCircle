const mongoose = require('mongoose');
var ExperienceSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: 'This field is required.'
    },
    Discription:{
        type: String   
    }

});

ExperienceSchema.statics.ADD = function (req, callback) {
    console.log("Experiencercord  ", req.body," ");
    Experiencercord1 = new Experiencercord();
    Experiencercord1.Email=req.body.Email;
    Experiencercord1.Discription=req.body.Discription;
    Experiencercord1.save((err, doc) => {
        if (!err)
        return callback(null,Experiencercord1); 
        else {
            console.log('Error during Experience Record  insertion : ' + err);
            var err = new Error('Experience not created.');
            err.status = 401;
            return callback(err);
        }
    });
  }
  ExperienceSchema.statics.Find = function (Email, callback) {//Find All Records of same person
    Experiencercord.find({ Email: Email })
      .exec(function (err, Experience) {
        if (err) {
          return callback(err)
        } else if (!Experience) {
          var err = new Error('Experience not found.');
          err.status = 401;
          return callback(err);
        }
        var CourseCount={ count: Experience.length }
       // console.log(Course.length);
            return callback(null, Experience,CourseCount );      
      });
  }

var Experiencercord = mongoose.model('experience', ExperienceSchema);
module.exports = Experiencercord;


