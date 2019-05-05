const mongoose = require('mongoose');
var NotificationSchema = new mongoose.Schema({

    RecieverEmail: {
        type: String,
        required: 'This field is required.'

    },
    SenderEmail:{
        type: String,
        required: 'This field is required.'
    },
    SenderProfileImg:{
        type: String,
        required: 'This field is required.'
    },
    SenderFName:{
        type: String,
        required: 'This field is required.'
    },
    SenderLName:{
        type: String,
        required: 'This field is required.'
    },
    Type:{
        type: String,
        required: 'This field is required.'
    },
    Status:{
        type: String,
        required: 'This field is required.'
    }



});

NotificationSchema.statics.Count = function (OwnerEmail, callback) {
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    NotificationRecord.find({ RecieverEmail: OwnerEmail })
        .exec(function (err, Notifications) {
            if (err) {
                return callback(err)
            } else if (!Notifications) {
                var err = new Error('Notifications count not found.');
                err.status = 401;
                return callback(err);
            }
            var NotificationsCount={ count: Notifications.length }
       //   console.log('Notifications ' + Notifications );

            
            return callback(null,NotificationsCount);
        });
    
}
///Requestinf For Connection 
NotificationSchema.statics.AddJobNotification= function (Job,sender , callback) {
   console.log("AddJobNotification");
    //Job1
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    NotificationRecord1 = new NotificationRecord();
    NotificationRecord1.RecieverEmail= sender ;
    NotificationRecord1.SenderEmail=Job.Email ; 
    NotificationRecord1.SenderProfileImg="/css/images/job.png";
    NotificationRecord1.SenderFName=Job.Organization;
    NotificationRecord1.SenderLName=" ";
    NotificationRecord1.Type="Job";
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
NotificationSchema.statics.AddReviewNotification= function (ReviewtoEmail, ReviewByProfile, callback) {
    console.log("uNotificationSchema", ReviewtoEmail);
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    
    NotificationRecord1 = new NotificationRecord();
    NotificationRecord1.RecieverEmail= ReviewtoEmail ;
    NotificationRecord1.SenderEmail=ReviewByProfile.Email; 
    NotificationRecord1.SenderProfileImg= ReviewByProfile.imagepath;
    NotificationRecord1.SenderFName=ReviewByProfile.FName;
    NotificationRecord1.SenderLName=ReviewByProfile.LName;
    NotificationRecord1.Type="Review";
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

NotificationSchema.statics.GetNotifications = function (OwnerEmail, callback) {
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
    NotificationRecord.find({ RecieverEmail: OwnerEmail })
        .exec(function (err, Notifications) {
            if (err) {
                return callback(err)
            } else if (!Notifications) {
                var err = new Error('Friends not found.');
                err.status = 401;
                return callback(err);
            }
            var NotificationsCount={ count: Notifications.length }
            var ConnectionNotification=[];
            var JobNotification=[];
            var ReviewNotification=[];

          //  console.log('AllNotification ' + Notifications );

            for( i=0 ; i<Notifications.length ;i++ )
            {
                if(Notifications[i].Type=="Connection"  )
                {
                    ConnectionNotification.push(Notifications[i]);
                }

                if(Notifications[i].Type=="Job"  )
                {
                    JobNotification.push(Notifications[i]);

                }

                if(Notifications[i].Type=="Review"  )
                {
                    ReviewNotification.push(Notifications[i]);

                }
            }
          ///  console.log('ConnectionNotification ' + ConnectionNotification );
          //  console.log('JobNotification ' + JobNotification );

                    //ReviewNotification.push(Notifications[i]);
            return callback(null, ConnectionNotification,JobNotification,ReviewNotification,NotificationsCount);
        });
    
}

//mongoose.model('users', usersSchema);
var NotificationRecord = mongoose.model('notification', NotificationSchema);
module.exports = NotificationRecord;




