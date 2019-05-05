const mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: 'This field is required.'
    },
    Discription:{
        type: String   
    }

});

CourseSchema.statics.ADDCourse = function (req, callback) {
    console.log(" ", req.body," ");
    CourseRecord1 = new CourseRecord();
    CourseRecord1.Email=req.body.Email;
    CourseRecord1.Discription=req.body.Discription;
    CourseRecord1.save((err, doc) => {
        if (!err)
        return callback(null,CourseRecord1); 
        else {
            console.log('Error during Course Record  insertion : ' + err);
            var err = new Error('Course not created.');
            err.status = 401;
            return callback(err);
        }
    });
  }
  CourseSchema.statics.Find = function (Email, callback) {//Find All Records of same person
    CourseRecord.find({ Email: Email })
      .exec(function (err, Course) {
        if (err) {
          return callback(err)
        } else if (!Course) {
          var err = new Error('Course not found.');
          err.status = 401;
          return callback(err);
        }
        var CourseCount={ count: Course.length }
       // console.log(Course.length);
            return callback(null, Course,CourseCount );      
      });
  }

var CourseRecord = mongoose.model('course', CourseSchema);
module.exports = CourseRecord;
