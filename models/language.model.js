const mongoose = require('mongoose');
var LanguageSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: 'This field is required.'
    },
    Discription:{
        type: String   
    }

});

LanguageSchema.statics.ADDLanguage = function (req, callback) {
    console.log("language  ", req.body," ");
    LanguageRecord1 = new LanguageRecord();
    LanguageRecord1.Email=req.body.Email;
    LanguageRecord1.Discription=req.body.Discription;
    LanguageRecord1.save((err, doc) => {
        if (!err)
        return callback(null,LanguageRecord1); 
        else {
            console.log('Error during Language Record  insertion : ' + err);
            var err = new Error('Language not created.');
            err.status = 401;
            return callback(err);
        }
    });
  }
  LanguageSchema.statics.Find = function (Email, callback) {//Find All Records of same person
    LanguageRecord.find({ Email: Email })
      .exec(function (err, Language) {
        if (err) {
          return callback(err)
        } else if (!Language) {
          var err = new Error('Language not found.');
          err.status = 401;
          return callback(err);
        }
        var CourseCount={ count: Language.length }
       // console.log(Course.length);
            return callback(null, Language,CourseCount );      
      });
  }

var LanguageRecord = mongoose.model('language', LanguageSchema);
module.exports = LanguageRecord;

