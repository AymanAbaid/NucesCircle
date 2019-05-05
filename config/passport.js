/*var FacebookStrategy = require('passport-facebook').Strategy;


const User = mongoose.model("users")

var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});





	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {/*
	    				var newUser = new user();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				newUser.facebook.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				}) */
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }

	));


};
*/

/*// config/passport.js

// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientId: '1021734142135-n1tdebbuil7qfekvfnd4qig75tb5t7gu.apps.googleusercontent.com',
        // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
       clientSecret: 'xh8s7g2qMapMCQPBNhJamE-K', // e.g. _ASDFA%DFASDFASDFASD#FAD-
       redirect: 'http://localhost:8080/auth/google/callback' // this must match your google api settings

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
console.log("profile  :", profile);
      /*      User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
            

        });

    }));

};

/*

const GooglePlusTokenStrategy = require('passport-google-plus-token');
const passport = require('passport');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

const googleConfig = {
  clientId: '1021734142135-n1tdebbuil7qfekvfnd4qig75tb5t7gu.apps.googleusercontent.com',
   // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: 'xh8s7g2qMapMCQPBNhJamE-K', // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: 'http://localhost:8080/auth/google/callback' // this must match your google api settings
};

//GOOGLE OUATH statregy 
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientId: '1021734142135-n1tdebbuil7qfekvfnd4qig75tb5t7gu.apps.googleusercontent.com',
   // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: 'xh8s7g2qMapMCQPBNhJamE-K', // e.g. _ASDFA%DFASDFASDFASD#FAD-
 }, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('Email', profile.emails[0].value);
        user.FindByEmail(profile.emails[0].value, function (err, user_, next) {
            if (user_)  return done(null, user_);
            else {
                var user_ = new user();
                user_.FName = profile.name.familyName;
                user_.LName = profile.name.givenName;
                user_.Email = profile.emails[0].value;
                user_.Password = "123456";
                user_.id = profile.id;

                user_.save((err, doc) => {

                    if (!err) done(null, user_);
                })
    
      } 
    })} 
     catch(error) {
        done(error, false, error.message);
      }
    }));
    
const  auth=require("./auth");
const passportGoogle=passport.authenticate('googleToken', { session: false });


  //, UsersController.googleOAuth)

  router.route('/oauth/google')
  .post(passportGoogle, auth.googleOAuth);







*/