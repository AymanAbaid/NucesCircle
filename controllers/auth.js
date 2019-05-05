

module.exports = {
	'facebookAuth' : {
		'clientID': '2462132327171052',
		'clientSecret': '740f27245a1665e26b2984c172d37979',
		'callbackURL': 'http://localhost:3000/NucesCircle/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID': 'enter client id here',
		'clientSecret': 'enter client secret here',
		'callbackURL': 'enter callback here'
	}
}

/*
//GOOGLE OUATH statregy 
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '1021734142135-c694357psgg6udl6rrhuq1u5bl08jue5.apps.googleusercontent.com',
    clientSecret: 'WPeAvCVspM6UNfBlZxYukjFf'
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
  .post(passportGoogle, auth.googleOAuth);*/




















/*module.exports = {
	'facebookAuth' : {
		'clientID': '323399628337204',
		'clientSecret': 'fcb76eb767eca1ea6045278934be83e0',
		'callbackURL': 'http://localhost:3000/NucesCircle/auth/facebook/callback'
	},

}
*/
