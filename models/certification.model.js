const mongoose = require('mongoose');
var CertificationSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: 'This field is required.'
    },
    Discription:{
        type: String   
    }

});

CertificationSchema.statics.ADD = function (req, callback) {
    console.log("CertificationRecord1  ", req.body," ");
    CertificationRecord1 = new CertificationRecord();
    CertificationRecord1.Email=req.body.Email;
    CertificationRecord1.Discription=req.body.Discription;
    CertificationRecord1.save((err, doc) => {
        if (!err)
        return callback(null,CertificationRecord1); 
        else {
            console.log('Error during Certification Record  insertion : ' + err);
            var err = new Error('Certification not created.');
            err.status = 401;
            return callback(err);
        }
    });
  }
  CertificationSchema.statics.Find = function (Email, callback) {//Find All Records of same person
    CertificationRecord.find({ Email: Email })
      .exec(function (err, Certification) {
        if (err) {
          return callback(err)
        } else if (!Certification) {
          var err = new Error('Certification not found.');
          err.status = 401;
          return callback(err);
        }
        var CourseCount={ count: Certification.length }
       // console.log(Course.length);
            return callback(null, Certification,CourseCount );      
      });
  }

var CertificationRecord = mongoose.model('certification', CertificationSchema);
module.exports = CertificationRecord;

