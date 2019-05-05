const mongoose = require('mongoose');
var ApplicationSchema = new mongoose.Schema({
  JobId: {
    type: String,
    required: 'Title field is required.'
  },
ApplicantName: {
        type: String,
        required: 'Applicant Account Link field is required.'
},
ApplicantAccEmail: {
    type: String,
    required: 'Applicant Email is required.'
}  



});

ApplicationSchema.statics.ADD = function (JobId,ApplicantAccEmail,ApplicantFName, ApplicantLName, callback) {
   var ProfileLink="http://localhost:3000/NucesCircle/GetProfile/"+ApplicantAccEmail
    ApplicationRecord1 = new ApplicationRecord();
    ApplicationRecord1.JobId=JobId;
    ApplicationRecord1.ApplicantName=ApplicantFName+" "+ApplicantLName ;
    ApplicationRecord1.ApplicantAccEmail=ApplicantAccEmail;
    ApplicationRecord1.save((err, doc) => {
        if (!err)
        return callback(null,ApplicationRecord1); 
        else {
            console.log('Error during Language Record  insertion : ' + err);
            var err = new Error('Language not created.');
            err.status = 401;
            return callback(err);
        }
    });
  }
  
ApplicationSchema.statics.FindbyTitle = function (Title ,  callback) {//Find All Records of same person
    ApplicationRecord.find({ Title: Title })
      .exec(function (err, ApplicationRecord1) {
        if (err) {
          var err = new Error('Job Finding Error on Title .');
          err.status = 401;
          return callback(err);
        } 
        
       // console.log(Course.length);
           return callback(null, ApplicationRecord1 );   
      

      });
}
ApplicationSchema.statics.FindJobApplicants= function (JobID ,  callback) {//Find All Records of same person
  ApplicationRecord.find({ JobId: JobID })
    .exec(function (err, ApplicationRecord1) {
      if (err) {
        var err = new Error('Job Finding Error on Title .');
        err.status = 401;
        return callback(err);
      } 
      
      //console.log(" Application",ApplicationRecord1);
         return callback(null, ApplicationRecord1 );   
    

    });
}
var ApplicationRecord = mongoose.model('application', ApplicationSchema);
module.exports = ApplicationRecord;

/*

 JobRecord.find({ Location: Location })
      .exec(function (err, LocationJob) {
        if (err) {
          var err = new Error('Job Finding Error on Location .');
          err.status = 401;
          return callback(err);        } 
        
         var LocationJobLength={ count: LocationJob.length } 

       return callback(null, TitleJob,LocationJob,TitleJobLength,LocationJobLength );
      });
*/

