
//const xoauth2 = require('xoauth2');
//var APIScope = 'r_basicprofile';
//var APIKey = "86gogefe8rs9fr";
//var APIKeySecret = "MIAy84bu1NtLUJyT";
//http://localhost:3000/NucesCircle

const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
  const linkedinConfig = {
    clientID: '86gogefe8rs9fr',
    clientSecret: "MIAy84bu1NtLUJyT",
    callbackURL: "http://localhost:3000/NucesCircle/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  }
  const strategy = new LinkedInStrategy(
    linkedinConfig,
    (accessToken, refreshToken, profile, done) => {
      const linkedinId = profile._json.id
      const nameFirst = profile._json.firstName
      const nameLast = profile._json.lastName
      const email = profile._json.emailAddress
      const linkedinToken = accessToken // we need to store this
       try {
        User.findOrCreate({
          where: {linkedinId},
          defaults: {
            nameFirst,
            nameLast,
            email,
            linkedinToken,
 
          }
        })
      } catch (err) {
        done(err)
      }
    }
  )
// Tell passport to use the above strategy
passport.use(strategy)
router.get('/auth/linkedin/logout', function (req, res) {
    req.logout()
    res.redirect('/NucesCircle/signin');
})
router.get('/auth/linkedin', passport.authenticate('linkedin', (err, user, info) => {
    if (err) { return next(err) }
}), async (req, res, next) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
    console.log('auth/linkedin', req)
    res.redirect('/NucesCircle')
    next()
});
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {

    successRedirect: '/auth/linkedin/redirect',
    failureRedirect: '/auth/linkedin/'
}), async (req, res, next) => {
     //console.log(req.user.dataValues)
    console.log('jsdhjdfsjdfkdfdjf', req)

    res.send(req.user.dataValues)
})
// Redirect the user back to the app
router.get('/auth/linkedin/redirect', async (req, res, next) => {
    // you can see what you get back from LinkedIn here:
    console.log(req.user.dataValues)
    res.send("<deep-link-to-react-native-app>");
})



