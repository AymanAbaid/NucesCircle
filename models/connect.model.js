const mongoose = require('mongoose');
var ConnectSchema = new mongoose.Schema({

    OwnerEmail: {
        type: String,
        required: 'This field is required.'

    },
    FriendEmail:{
        type: String,
        required: 'This field is required.'
    }

});

ConnectSchema.statics.MakeConnection = function (OwnerEmail, FriendEmail, callback) {
    // console.log(" ", req.body.Email  ," ", req.body.Institute ," ",req.body.To ," ");
     ConnectionR1 = new ConnectionR();
     ConnectionR1.OwnerEmail=OwnerEmail;
     ConnectionR1.FriendEmail=FriendEmail;
     ConnectionR1.save((err, doc) => {
 
         if (!err)
         return callback(null, ConnectionR1); 
         else {
             console.log('Error during Connection record insertion : ' + err);
             var err = new Error('Connection Error insertion.');
             err.status = 401;
             return callback(err);
         }
     });
   }


ConnectSchema.statics.GetFriends = function (ToFindEmail, callback) {
   // console.log("ToFindEmail ", ToFindEmail);

    ConnectionR.find({ OwnerEmail: ToFindEmail })
        .exec(function (err, Friends1) {
            if (!err) {
                var  AllFriends = []
              //  console.log("Friends1 ", Friends1);
              for (i=0 ; i<Friends1.length ; i++ )
              {
                  AllFriends.push(Friends1[i].FriendEmail);
              }
                ConnectionR.find({ FriendEmail: ToFindEmail })
                .exec(function (err, Friends2) {
                    if (!err) {
                        for (i=0 ; i<Friends2.length ; i++ )
                        {
                            AllFriends.push(Friends2[i].OwnerEmail);
                        }

                      /*  for (i=0 ; i<Friends1.length ; i++ )
                        {
                            console.log("Friends1 ", Friends1.OwnerEmail, " ",Friends1.FriendEmail  );

                            //Friends1.push(Friends2[i].OwnerEmail);
                        }*/
                        
                        console.log("Friendss ", AllFriends  );
                         return callback(null, AllFriends);
                    } 
                   
        
                });

            } 

           


        });
    
}


//mongoose.model('users', usersSchema);
var ConnectionR = mongoose.model('connect', ConnectSchema);
module.exports = ConnectionR;




