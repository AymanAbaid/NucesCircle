const mongoose = require('mongoose');
var profileSchema = new mongoose.Schema({
    FName: {
        type: String,
        required: 'This field is required.'

    },
    LName: {
        type: String,
        required: 'This field is required.'

    },
    Email: {
        type: String,
        unique: true,
        required: 'This field is required.'

    },

    Age: {
        type: String,
    },
    Phone: {
        type: String,

    },
    Social: {
        type: String,
    },
    imagepath: {
        type: String,
        required: 'This field is required.'
    },
    Discipline: {
        type: String,
        required: 'This field is required.'
    },


});

profileSchema.statics.GetProfile = function (Email, callback) {
    Profile.findOne({ Email: Email })
        .exec(function (err, profile1) {
            if (err) {
                return callback(err)
            } else if (!profile1) {
                var err = new Error('profile not found.');
                err.status = 401;
                return callback(err);
            }
            return callback(null, profile1);
        });
}

profileSchema.statics.SearchPeople = function (ownerEmail, Email, FName, LName, callback) {
 //    console.log("ownerEmail, ", ownerEmail ,'Email',Email );

    Profile.find({ FName: FName })
        .exec(function (err, profile1) {
            if (err) {
                return callback(err)
            } else if (!profile1) {
                var err = new Error('profile not found.');
                err.status = 401;
                return callback(err);
            }
           // console.log("Alllll People  Length ", profile1.length);

            for (i = 0; i < profile1.length; i++) {
           //     console.log("users People ", profile1[i].Email);   
                if (profile1[i].Email == ownerEmail) {
                    profile1.pop(profile1[i]);
                }



            }
//            console.log("users People ", profile1.length);

            return callback(null, profile1);
            /*
                        Profile.findOne({ FName: FName })
                            .exec(function (err, profile2) {
                                if (err) {
                                    return callback(err)
                                } else if (!profile2) {
                                    var err = new Error('profile not found.');
                                    err.status = 401;
                                    return callback(err);
                                }
            
                                Profile.findOne({ LName: Lname })
                                    .exec(function (err, profile3) {
                                        if (err) {
                                            return callback(err)
                                        } else if (!profile3) {
                                            var err = new Error('profile not found.');
                                            err.status = 401;
                                            return callback(err);
                                        }
                                        return callback(null, profile1, profile2, profile3);
                                    });
            
            
            
            
                           });*/
        });

}
profileSchema.statics.SearchManyPeople = function (ownerEmail, ToFIndStr, UserFriends, callback) {
    //    console.log("ownerEmail, ", ownerEmail ,'Email',Email );
    ToFIndEmail = ToFIndStr;

    ToFIndString = ToFIndStr.toProperCase();

       Profile.find({ FName: ToFIndString })
           .exec(function (err, FNameResults) {
               if (err) {
                   return callback(err)
               } 
            Profile.find({ LName: ToFIndString })
           .exec(function (err, LNameResults) {
               if (err) {
                   return callback(err)
               } 

               Profile.find({ Email: ToFIndEmail })
               .exec(function (err, EmailResults) {
                   if (err) {
                       return callback(err)
                   } else if (!EmailResults) {
                       var err = new Error('profile not found.');
                       err.status = 401;
                       return callback(err);
                   }
                   /*----------Combine All Results ----------*/
                   Strangers =[];  Friends =[]; TotalResults=[];
                   for( i=0 ; i<FNameResults.length ; i++ )
                   TotalResults.push( FNameResults[i]);
                   for( i=0 ; i<LNameResults.length ; i++ )
                   TotalResults.push( LNameResults[i]);
                   for( i=0 ; i<EmailResults.length ; i++ )
                   TotalResults.push( EmailResults[i]);
                   /*-------------------------------------*/
                   /*----------Checking If The resultant profile is of curr user ----------*/

                   for( i=0 ; i<TotalResults.length ; i++ )
                   {
                        if (TotalResults[i].Email==ownerEmail)
                            {    Friends.push(TotalResults[i]);
                                index = TotalResults.indexOf(TotalResults[i]);  
                                TotalResults.splice(index,1);
                            }
                   }
                   /*------------------------------------------------------------*/
                   console.log("Before TotalResults ", TotalResults);
                   console.log("After TotalResults ", TotalResults);

                      /*----------Finding PEople Who are not Firends ----------*/
                      console.log("TotalResults.length", TotalResults.length);

                      for( i=0 ; i<TotalResults.length ; i++ )
                      { 
                            for( j=0 ; j<UserFriends.length ; j++ )
                            {
                                console.log("UserFriends", UserFriends[j]);

                                if (TotalResults[i].Email==UserFriends[j])
                                    {    Friends.push(TotalResults[i]);
                                        index = TotalResults.indexOf(TotalResults[i]);  
                                        //TotalResults.splice(index,1);
                                          i=i+1;
                                          console.log("TotalResults.length", TotalResults.length);
                                          //console.log("UserFriends[j]", UserFriends[j]);

                                          break;
                                    }
                                    
                            }
                           
                      }
                      /*------------------------------------------------------------*/
   
                           /*----------Finding  Firends ----------*/

                           for( i=0 ; i<TotalResults.length ; i++ )
                           { 
                                 for( j=0 ; j<Friends.length ; j++ )
                                 {
                                   //  console.log("UserFriends", UserFriends[j]);
     
                                              index = TotalResults.indexOf(Friends[j]);  
                                               TotalResults.splice(index,1);
                                          //   Strangers.push(TotalResults[i]);
         
                                               //console.log("TotalResults.length", TotalResults.length);
                                               //console.log("UserFriends[j]", UserFriends[j]);
     
                                               break;
                                         
                                         
                                 }
                                
                           }
                           console.log("Strangers", TotalResults);

                           /*------------------------------------------------------------*/
        
    
     
       
                   return callback(null, Friends, TotalResults );
                   
               });
               
           });

        });
   
   }



profileSchema.statics.FilterApplicantbyDiscipline = function (People, Discipline,callback) {

   Profile.find({ Discipline: Discipline })
       .exec(function (err, Disciplineprofile) {
           if (err) {
               return callback(err)
           } else if (!Disciplineprofile) {
               var err = new Error('profile not found.');
               err.status = 401;
               return callback(err);
           }

         
           var resultset=[]
   
           for (j=0 ; j<Disciplineprofile.length ;j++ ) 
           {    
              for (i=0 ; i<People.length ;i++ ) 
                   { 
                     //console.log("People[i].ApplicantAccEmail", People[i].ApplicantAccEmail  ,"skillPeople[j].Email",skillPeople[j].Email )
   
                     if(People[i].ApplicantAccEmail==Disciplineprofile[j].Email)
                     {
                       resultset.push(People[i])
                     }
                     
                   
                   }
           
           }
           return callback(null, resultset);
          
       });

}
var Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;





/*
              for (i = 0; i < profile1.length; i++) {
              //     console.log("users People ", profile1[i].Email);   
                   if (profile1[i].Email == ownerEmail) {
                       Friends.push(profile1[i]);
                      // profile1.pop(profile1[i]);

                   }
   
   
   
               }  
               console.log("User's ALL Friends  ", UserFriends );

                console.log("Friends  ", Friends,"  profile1.length   :" ,profile1.length);
            //    console.log("ALL profile1  ", profile1,"  profile1.Email   :" ,profile1[0].Email);
//                console.log("profile1[1].Email ", profile1[1].Email)
               
                for (i = 0; i < profile1.length; i++) {
                    console.log("profile1[i].Email ", profile1[0].Email);

                         for (j = 0; j < UserFriends.length; j++) {
                            console.log("profile1[i].Email ", profile1[0].Email);
 
                                    if(profile1[i].Email==UserFriends[j])
                                    {
                                        Friends.push(profile1[i] );
                                        profile1.splice(i,1);
                                        break;
                                    }
                        }
     
     
                }  
   //            console.log("users People ", profile1.length);

                for( i=0 ; i<profile1.length ; i++)
                {   
                    for( j=0 ; j<Friends.length ;j++ )
                    {
                         if(profile1[i].Email==Friends[j].Email )
                         {
                            profile1.splice(j,1);
                         }
                    }

                }*/