const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var usersSchema = new mongoose.Schema({
  
    FName: {
        type: String,
       
        required: 'This field is required.'
    },
    LName: {
        type: String,

    },
    Email: {
        type: String,
        unique:true,
        trim:true,
       // required: 'This field is required.'

    },
    Password: {
        type: String,
       /* required: 'This field is required.'*/

    },
    Id:{
      type: String,
     /* required: 'This field is required.' */
    }, 
    Token:{
      type: String,
     /* required: 'This field is required.' */
    }
   
  
});
var fbusersSchema = new mongoose.Schema({
  
  FName: {
      type: String,
     
      required: 'This field is required.'
  },
  LName: {
      type: String,

  },
  Id:{
    type: String,
   // required: 'This field is required.' 
  }, Token:{
    type: String,
   /* required: 'This field is required.' */
  }
 

});
// Custom validation for email
usersSchema.path('Email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, '* Invalid e-mail.');


//authenticate input against database

usersSchema.statics.authenticate = function (Email, Password, callback) {
    User.findOne({ Email: Email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(Password, user.Password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
  usersSchema.statics.FindByFName = function (FName, callback) {
    User.findOne({ FName: FName })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        return callback(null,user );

      });
  }
  usersSchema.statics.FindByEmail = function (Email_,  callback) {
console.log("usersSchema.statics.FindByEmail ")
    User.findOne({ Email: Email_ })
      .exec(function (err, user) {
        if (err ||!user ) {
          return callback(err)    
        }
        return callback(null,user );

      });
  }
  usersSchema.statics.FindUsers = function (Email, FName,LName, callback) {
    User.FindByEmail({ Email: Email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        return callback(null,user );

      });
  }
  //hashing a password before saving it to the database
  usersSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.Password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.Password = hash;
      next();
    })
  });
  



//mongoose.model('users', usersSchema);
var User = mongoose.model('users', usersSchema);
module.exports = User;
/*var Fbuser = mongoose.model('fbusers', usersSchema);
module.exports = Fbuser;*/




/*
else {
                    fname=  profile.displayName.split(" ");
              /*      console.log(fname[0]," -------", fname[1]);
              var newUser = new fbuser();
              newUser.id = profile.id;
              newUser.token = accessToken;
              newUser.FName = fname[0];
              newUser.LName = fname[1];

              newUser.save((err, doc) => {

                  if (!err)
                   done(null, newUser);
                  else  console.log("Sucess full");

              }) 
              console.log(newUser);
              return done(null, newUser);

              //insertFacebookRecord(fname[0], fname[1],profile.id,accessToken );
          } 
   */