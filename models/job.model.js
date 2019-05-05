const mongoose = require('mongoose');
var JobSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: 'Title field is required.'
  },
    Email: {
        type: String,
        required: 'Email field is required.'
    },
    Requirements:{
        type: String,
        required: 'Requirements field is required.'
   
    },
    Salary:{
      type: String,
      required: 'Salary field is required.'
   
   },
   Location:{
    type: String,
    required: 'Location field is required.'
   },
   Type:{
    type: String,
    required: 'Location field is required.'
   },
   Date:{
    type: String,
    required: 'Date field is required.'
   },
   Organization:{
    type: String,
    required: 'Date field is required.'
   },
   Discipline:{
    type: String,
    required: 'Discipline field is required.'
   },
   Experience:{
    type: String,
    required: 'Experience field is required.'
   }




});
JobSchema.statics.ADD = function (req, CreaterEmail, callback) {
    //console.log("language  ", req.body," ");
    JobRecord1 = new JobRecord();
    JobRecord1.Title=req.body.Title;
    JobRecord1.Email=CreaterEmail;
    JobRecord1.Requirements=req.body.Requirements;
    JobRecord1.Salary=req.body.Salary;
    JobRecord1.Location=req.body.Location;
    JobRecord1.Type=req.body.Type;
    JobRecord1.Date=req.body.Date; 
    JobRecord1.Organization=req.body.Organization; 
    JobRecord1.Discipline=req.body.Discipline; 
    JobRecord1.Experience=req.body.Experience; 

    JobRecord1.save((err, doc) => {
        if (!err)
        return callback(null,JobRecord1); 
        else {
            console.log('Error during Language Record  insertion : ' + err);
            var err = new Error('Language not created.');
            err.status = 401;
            return callback(err);
        }
    });
  }
  
  JobSchema.statics.Find = function (Title , Location, callback) {//Find All Records of same person
    JobRecord.find({})
      .exec(function (err, AllJobs) {
        if (err) {
          var err = new Error('Job Finding Error on Title .');
          err.status = 401;
          return callback(err);
        } 
        console.log(" Title "+Title+" Location "+ Location);
        var Resultset=[]
        if(Title.length!=0 && Location.length!=0 )
        {

          for (i=0; i<AllJobs.length; i++)
          {     
           // console.log(" inside found "+AllJobs[i].Title +" "+AllJobs[i].Location );
         //  console.log( AllJobs[i].Title+" "+ AllJobs[i].Location );
  
                if(AllJobs[i].Title == Title && AllJobs[i].Location == Location   )
                 {
                  //console.log('insdie 1st if ' );
                  Resultset.push(AllJobs[i]);
                    ///AllJobs[i].pop(); //AllJobs[i]
                  }
              
  
  
          }
        }
        else if(Title.length==0 && Location.length!=0 )
        {

          for (i=0; i<AllJobs.length; i++)
          {     
           // console.log(" inside found "+AllJobs[i].Title +" "+AllJobs[i].Location );
         //  console.log( AllJobs[i].Title+" "+ AllJobs[i].Location );
  
                if( AllJobs[i].Location == Location   )
                 {
                  //console.log('insdie 1st if ' );
                  Resultset.push(AllJobs[i]);
                    ///AllJobs[i].pop(); //AllJobs[i]
                  }
              
  
  
          }
        }
       else  if(Title.length!=0 && Location.length==0 )
        {
          for (i=0; i<AllJobs.length; i++)
          {     
           // console.log(" inside found "+AllJobs[i].Title +" "+AllJobs[i].Location );
         //  console.log( AllJobs[i].Title+" "+ AllJobs[i].Location );
  
                if( AllJobs[i].Title == Title   )
                 {
                  //console.log('insdie 1st if ' );
                  Resultset.push(AllJobs[i]);
                    ///AllJobs[i].pop(); //AllJobs[i]
                  }
              
  
  
          }
        }

  
       // console.log(Resultset.length);
           return callback(null, Resultset );   
      

      });
  }
  JobSchema.statics.FindMyPostedJobs = function (MyEmail , callback) {//Find All Records of same person
    JobRecord.find({Email:MyEmail })
      .exec(function (err, AllJobs) {
        if (err) {
          var err = new Error('Job Finding Error on Title .');
          err.status = 401;
          return callback(err);
        } 
        //console.log(" Title "+Title+" Location "+ Location);
        var Resultset=[]
      
       // console.log(Resultset.length);
           return callback(null, AllJobs );   
      

      });
  }
  JobSchema.statics.FindReleventJob  = function (Discipline , Location, callback) {//Find All Records of same person
    JobRecord.find({})
      .exec(function (err, AllJobs) {
        if (err) {
          var err = new Error('Job Finding Error on Title .');
          err.status = 401;
          return callback(err);
        } 
        console.log(" Title "+Title+" Location "+ Location);
        var Resultset=[]
        if(Title.length!=0 && Location.length!=0 )
        {

          for (i=0; i<AllJobs.length; i++)
          {     
           // console.log(" inside found "+AllJobs[i].Title +" "+AllJobs[i].Location );
         //  console.log( AllJobs[i].Title+" "+ AllJobs[i].Location );
  
                if(AllJobs[i].Title == Title && AllJobs[i].Location == Location   )
                 {
                  //console.log('insdie 1st if ' );
                  Resultset.push(AllJobs[i]);
                    ///AllJobs[i].pop(); //AllJobs[i]
                  }
              
  
  
          }
        }
        else if(Title.length==0 && Location.length!=0 )
        {

          for (i=0; i<AllJobs.length; i++)
          {     
           // console.log(" inside found "+AllJobs[i].Title +" "+AllJobs[i].Location );
         //  console.log( AllJobs[i].Title+" "+ AllJobs[i].Location );
  
                if( AllJobs[i].Location == Location   )
                 {
                  //console.log('insdie 1st if ' );
                  Resultset.push(AllJobs[i]);
                    ///AllJobs[i].pop(); //AllJobs[i]
                  }
              
  
  
          }
        }
       else  if(Title.length!=0 && Location.length==0 )
        {
          for (i=0; i<AllJobs.length; i++)
          {     
           // console.log(" inside found "+AllJobs[i].Title +" "+AllJobs[i].Location );
         //  console.log( AllJobs[i].Title+" "+ AllJobs[i].Location );
  
                if( AllJobs[i].Title == Title   )
                 {
                  //console.log('insdie 1st if ' );
                  Resultset.push(AllJobs[i]);
                    ///AllJobs[i].pop(); //AllJobs[i]
                  }
              
  
  
          }
        }

  
       // console.log(Resultset.length);
           return callback(null, Resultset );   
      

      });
  }
var JobRecord = mongoose.model('job', JobSchema);
module.exports = JobRecord;

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
