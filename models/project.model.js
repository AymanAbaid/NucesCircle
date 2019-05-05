const mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: 'This field is required.'
    },
    Project: {
        type: String,
        required: 'This field is required.'

    },
    Discription:{
        type: String,
        required: 'This field is required.'
    }

});

ProjectSchema.statics.ADDProject = function (req, callback) {
     console.log(" ", req.body," ");
    ProjectRecord1 = new ProjectRecord();
    ProjectRecord1.Email=req.body.Email;
    ProjectRecord1.Project=req.body.Project;
    ProjectRecord1.Discription=req.body.Discription;
    ProjectRecord1.save((err, doc) => {
         if (!err)
         return callback(null,ProjectRecord1); 
         else {
             console.log('Error during Project record insertion : ' + err);
             var err = new Error('Project not created.');
             err.status = 401;
             return callback(err);
         }
     });
   }

   ProjectSchema.statics.Find = function (Email, callback) {//Find All Records of same person
    ProjectRecord.find({ Email: Email })
      .exec(function (err, proj) {
        if (err) {
          return callback(err)
        } else if (!proj) {
          var err = new Error('proj not found.');
          err.status = 401;
          return callback(err);
        }
            return callback(null, proj);      
      });
  }


//mongoose.model('users', usersSchema);
var ProjectRecord = mongoose.model('project', ProjectSchema);
module.exports = ProjectRecord;




