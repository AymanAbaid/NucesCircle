const mongoose = require('mongoose');
var SkillSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: 'This field is required.'
    },
    Skill: {
        type: String,
        required: 'This field is required.'

    },
    Percentage:{
        type: String,
        required: 'This field is required.'
    }

});

SkillSchema.statics.ADDSkill = function (req, callback) {
     console.log(" ", req.body," ");
     SkillRecord1 = new SkillRecord();
     SkillRecord1.Email=req.body.Email;
     SkillRecord1.Skill=req.body.Skill;
     SkillRecord1.Percentage=req.body.Percentage;
     SkillRecord1.save((err, doc) => {
         if (!err)
         return callback(null,SkillRecord1); 
         else {
             console.log('Error during SkillRecord  insertion : ' + err);
             var err = new Error('Skill not created.');
             err.status = 401;
             return callback(err);
         }
     });
   }

   SkillSchema.statics.Find = function (Email, callback) {//Find All Records of same person
    SkillRecord.find({ Email: Email })
      .exec(function (err, skill) {
        if (err) {
          return callback(err)
        } else if (!skill) {
          var err = new Error('proj not found.');
          err.status = 401;
          return callback(err);
        }
            return callback(null, skill);      
      });
  }

  SkillSchema.statics.FilterBySkill = function (People,Skill, callback) {//Find All Records of same person
    
    SkillRecord.find({ Skill: Skill })
      .exec(function (err, skillPeople) {
        if (err) {
          return callback(err)
        } else if (!skillPeople) {
          var err = new Error('proj not found.');
          err.status = 401;
          return callback(err);
        }   
        console.log("Skill People", skillPeople)

        var resultset=[]
        console.log("Skill People length", skillPeople.length  ,"People.length",People.length )

        for (j=0 ; j<skillPeople.length ;j++ ) 
        {    
           for (i=0 ; i<People.length ;i++ ) 
                { 
                  console.log("People[i].ApplicantAccEmail", People[i].ApplicantAccEmail  ,"skillPeople[j].Email",skillPeople[j].Email )

                  if(People[i].ApplicantAccEmail==skillPeople[j].Email)
                  {
                    resultset.push(People[i])
                  }
                  
                
                }
        
        }
        console.log("Skill People after filteration", resultset)
            return callback(null, resultset);      
      });


  }

//mongoose.model('users', usersSchema);
var SkillRecord = mongoose.model('skill', SkillSchema);
module.exports = SkillRecord;




