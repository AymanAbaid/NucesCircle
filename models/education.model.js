const mongoose = require('mongoose');
var EducationSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: 'This field is required.',
        //unique:true

    }, 
    Institute: {
      type: String,
      required: 'This field is required.',

      },  
    Degree: {
        type: String,
        required: 'This field is required.',

        },
        To: {
        type: String,
        required: 'This field is required.'
        
        },
        From: {
        type: String,
        required: 'This field is required.'
        
        }

});

EducationSchema.statics.AddInstitute = function (req, callback) {
   // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    EducationRecord1 = new EducationRecord();
    EducationRecord1.Email=req.body.Email;
    EducationRecord1.Institute=req.body.Institute;
    EducationRecord1.Degree=req.body.Degree;
    EducationRecord1.To=req.body.To;
    EducationRecord1.From=req.body.From;
    EducationRecord1.save((err, doc) => {

        if (!err)
        return callback(null, EducationRecord1); 
        else {
            console.log('Error during Institute record insertion : ' + err);
            var err = new Error('Inst not found.');
            err.status = 401;
            return callback(err);
        }
    });
  }

  EducationSchema.statics.Find = function (Email, callback) {
    EducationRecord.find({ Email: Email })
      .exec(function (err, inst) {
        if (err) {
          return callback(err)
        } else if (!inst) {
          var err = new Error('Inst not found.');
          err.status = 401;
          return callback(err);
        }
            return callback(null, inst);      
      });
  }
  EducationSchema.statics.FilterApplicantByGraduationDate = function (People,Graduation,Institute,Degree, callback) {

    EducationRecord.find({ From: Graduation })
      .exec(function (err, inst) {
        if (err) {
          return callback(err)
        } else if (!inst) {
          var err = new Error('Inst not found.');
          err.status = 401;
          return callback(err);
        }
          var resultset=[] ;var FinalApplicants=[]
          for(i=0 ; i<inst.length ; i++)
          {        //  console.log("Fast index ", inst[i].Institute.indexOf("FAST"));

            if( inst[i].Institute.indexOf(Institute)!=-1 &&  inst[i].Degree.indexOf(Degree)!=-1   ) 
               resultset.push(inst[i]);
         }

        for (j=0 ; j<resultset.length ;j++ ) 
        {    
           for (i=0 ; i<People.length ;i++ ) 
                { 
                  if(People[i].ApplicantAccEmail==resultset[j].Email)
                  {
                    FinalApplicants.push(People[i])
                  }
                  
                
                }
        
        }
  return callback(null, FinalApplicants);      


      });
   
   }

var EducationRecord = mongoose.model('education', EducationSchema);
module.exports = EducationRecord;

/*
 EducationSchema.statics.FilterApplicantByGraduationDate = function (People,Graduation, callback) {
    // console.log(" People ", People[0].ApplicantAccEmail);
    var resultset=[];

    EducationRecord.find({ Email: People[0].ApplicantAccEmail })
      .exec(function (err, inst) {
        if (err) {
          return callback(err)
        } else if (!inst) {
          var err = new Error('Inst not found.');
          err.status = 401;
          return callback(err);
        }
          console.log(" after db srch query",inst);
        for (i=0 ; i<inst.length ;i++ ) 
        {
          //console.log(" Attributes ", inst[i].Degree ," ", inst[i].Institute ," ",inst[i].From);
         // Graduation
          if(inst[i].Degree=="Bachelors" && inst[i].Institute.indexOf("FAST")!=-1 && inst[i].Institute.indexOf(Graduation)!=-1    ) 
            resultset.push(inst[i]);
        }
          //console.log("sassasas People ", resultset);
          //      return callback(null, resultset);      


      });
      console.log("sassasas People ", resultset);
      return callback(null, resultset);      

   }
*/