const mongoose = require('mongoose');
var ReviewSchema = new mongoose.Schema({

    ReviewbyEmail: {
        type: String,
        required: 'This field is required.'

    },

    ReviewToEmail:{
        type: String,
        required: 'This field is required.'
    },
    ReviewDiscription:{
        type: String,
        required: 'This field is required.'
    },
    ReviewByName:{
        type: String,
        required: 'This field is required.'
    }

   


});

///Requestinf For Connection 
ReviewSchema.statics.AddReview= function (req, callback) {
   //ReviewSchema.log("AddJobNotification");
    //Job1
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    ReviewRecord1 = new ReviewRecord();
    ReviewRecord1.ReviewToEmail= req.body.OtherEmail ;
    ReviewRecord1.ReviewbyEmail=req.body.Email ; 
    ReviewRecord1.ReviewDiscription=req.body.Review; 
    ReviewRecord1.ReviewByName=req.body.FName+" "+req.body.LName ; 


    ReviewRecord1.save((err, doc) => {
 
         if (!err)
         return callback(null, ReviewRecord1); 
         else {
             console.log('Error during ReviewRecord1 record insertion : ' + err);
             //var err = new Error('ReviewRecord1 Error insertion.');
             //err.status = 401;
             //return callback(err);
         }
     });
   }
/*
   NotificationSchema.statics.ReqForConnection= function (SenderProfile, RecieverEmail, callback) {
    console.log("uNotificationSchema", SenderProfile);
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    
    NotificationRecord1 = new NotificationRecord();
    NotificationRecord1.RecieverEmail= RecieverEmail ;
    NotificationRecord1.SenderEmail=SenderProfile.Email; 
    NotificationRecord1.SenderProfileImg=SenderProfile.imagepath;
    NotificationRecord1.SenderFName=SenderProfile.FName;
    NotificationRecord1.SenderLName=SenderProfile.LName;
    NotificationRecord1.Type="Connection";
    NotificationRecord1.Status="New";

    NotificationRecord1.save((err, doc) => {
 
         if (!err)
         return callback(null, NotificationRecord1); 
         else {
             console.log('Error during Connection record insertion : ' + err);
             var err = new Error('Connection Error insertion.');
             err.status = 401;
             return callback(err);
         }
     });
   }

*/
ReviewSchema.statics.GetAllReview = function (UserEmail, callback) {
    ReviewRecord.find({ ReviewToEmail: UserEmail })
        .exec(function (err, ReviewList) {
            if (err||ReviewList ) {
              //  return callback(err)
            } else if (!ReviewList) {
                var err = new Error('ReviewList not found.');
                err.status = 401;
               // return callback(err);
                
            }
          
         

            return callback(null, ReviewList);
        });
    
}

var ReviewRecord = mongoose.model('review', ReviewSchema);
module.exports = ReviewRecord;




