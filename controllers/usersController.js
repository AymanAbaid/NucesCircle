const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model("users"); 
const fbuser = mongoose.model("fbusers");
const Post = mongoose.model("post");
const Profile = mongoose.model("profile");
const Institute = mongoose.model("education");
const Project = mongoose.model("project");
const Course = mongoose.model("course");
const Skill = mongoose.model("skill");
const Connection = mongoose.model("connect");
const Language = mongoose.model("language");
const Experience = mongoose.model("experience");
const Certification = mongoose.model("certification");
const Job = mongoose.model("job");
const Application = mongoose.model("application");
const Notification = mongoose.model("notification");
const Review = mongoose.model("review");
const nodemailer = require('nodemailer');
/*const GooglePlusTokenStrategy = require('passport-google-plus-token');
var google = require('googleapis');
var googleAuth = require('google-auth-library'); */
var FacebookStrategy = require('passport-facebook').Strategy;

var passport = require('passport')
var configAuth = require('./auth');

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            console.log(profile, "acess token :",accessToken );
           
           
            //return done(null, newUser);
             user.findOne({'Id': profile.id}, function(err, user_){
                if(err)
                    return done(err);
                if(user_)
                    {     console.log(" alreday resgistered");
                    //return done(err, user_);
                    }
                    else{
                        console.log(profile);
                        console.log(" sucessfull");
                        fname=  profile.displayName.split(" ");
                        insertFacebookRecord(fname[0], fname[1],profile.id,accessToken );

                        return done(null,user_);
                    }
                
            });

            
        });
}
));

router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/NucesCircle/fbsignin',
                                      failureRedirect: '/NucesCircle/fbsignin' }))



function insertFacebookRecord(FName_,LName_,id,token, res ) {
    email=FName_+LName_+"@y7mail.com";            
    var user_ = new user();
    user_.FName = FName_;
    user_.LName = LName_;
    user_.Id = id;
    user_.Token = token;
    user_.Email = FName_+LName_+"@y7mail.com";
    user_.Password = "/";

   // user_.id = id;
   // user_.token = token;
    user_.save((err, doc) => {

        if (!err) {
            console.log(" No error", user_);
     
            fbUserCreateProfile(FName_, LName_  ,email);
            fbUserCreateInstitueRecord( email);
           

            //res.redirect("/NucesCircle/fbsignin");

            //CreateProfile(req, res);
            //CreateInstitueRecord(req, res);
            //res.redirect('NucesCircle/signin');

        }
        else {
           console.log("sucessfull");
           // else
               // console.log('Error during record insertion : ' + err);

        }
    });
        
    

}



function fbUserCreateProfile(FName , LName , Email) {
    fname = FName;
    fname = fname.toProperCase()
    lname = LName
    lname = lname.toProperCase()
    var profile1 = new Profile();
    profile1.FName = fname;
    profile1.LName = lname;
    profile1.Email = Email;
    profile1.Age = "-"
    profile1.Phone = "_"
    profile1.Social = "-"
    profile1.imagepath = "-"
    profile1.Discipline = "-"

    profile1.save((err, doc) => {

        if (!err)
            console.log('Profile Created Sucessfully: ');
        else {

            console.log('Error during record insertion : ' + err);

        }
    });
}
function fbUserCreateInstitueRecord(Email) {

    var Institute1 = new Institute();
    Institute1.Email = Email;
    Institute1.Institute = "National University of Computer and Emerging Science (FAST) ";
    Institute1.Degree = "-"
    Institute1.To = "-"
    Institute1.From = "_"
    Institute1.save((err, doc) => {
        if (!err)
            console.log('Institute Record  Created Sucessfully: ');
        else {

            console.log('Error during Institute record insertion : ' + err);

        }
    });
}

router.get('/fbsignin', (Email, id, req, res) => {
   // var id = req.body.email;
   // var id2 = req.body.password;
    console.log('Email :' + id);      //  else
    console.log('pwd :' + id2);      //  else

    req.session.userId = id;
    console.log('Sucessfully signed in');

   
  
    return res.redirect('/NucesCircle/profile');
   
   



});


























let transporter = nodemailer.createTransport({
    service: 'Gmail',
   // secure: false,
   // port: 465,
    auth: {
        user: 'nucescircle2019@gmail.com',
        pass: 'spiderman@'
    },
 //  tls: {
 //       rejectUnauthorized: false
 //   }
});

var multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/api', (req, res) => {
    console.log(" inside  /NucesCircle/api ")
    res.render("user/api.hbs", {

    });


});

router.post('/', (req, res) => {
    console.log("after clicking Sign Up button  ", req.body);

    user.FindByEmail(req.body.Email, function (error, user_, next) {
        if (error) {
            console.log("error ", user_);

        }
        else {
            if (user_) {
                console.log(" Email already in use");
                res.render("user/Signup.hbs", {
                    user_: req.body,
                    EmailError: " * Email already in Use"
                });
            }
            else {

                //email is not already registered
                // Checking now if any of the req field is empty
                //  CheckValidation(req);
                // console.log( "user is null " , user_);
             
                insertRecord(req, res)


            }
        }

    });







});
router.get('/', (req, res) => {
    user.findById(req.session.userId)
        .exec(async (error, user_) => {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    res.render("user/Signup.hbs", {
                        viewTitle: "Sign Up "
                    });

                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else {
                            Notification.Count(user_.Email, function (error, NotificationCount, next) {
                                if (error || !NotificationCount) {
                                    return next(error);
                                }
                                else {
                                    Connection.GetFriends(user_.Email, function (error, Friends, next) {
                                        if (!error) {
                                            Post.GetPosts(user_.Email, Friends, function (error, resultset, next) {
                                                if (!error) {

                                                  //   console.log("resultset", resultset);
                                                    res.render("user/Newsfeed.hbs", {
                                                        viewTitle: " Newsfeed  ",
                                                        CurrUser: user,
                                                        NotificationCount_: NotificationCount,
                                                        items: resultset
                                                    });
                                                }

                                            });

                                        }
                                    });



                                }
                            });


                        }
                    });
                }
            }
        });


});



function insertRecord(req, res) {
    fname = req.body.FName
   /// fname = fname.toProperCase()
    lname = req.body.LName
 //   lname = lname.toProperCase()

    var user_ = new user();
    user_.FName = fname;
    user_.LName = lname;
    user_.Email = req.body.Email;
    user_.Password = req.body.Password;
    user_.save((err, doc) => {

        if (!err) {
            console.log(" No error", req.body.Email, );
            transporter.sendMail({
                from: '"NucesCircle2019" <nucescircle2019@gmail.com>',
                to: req.body.Email,//'aymanabaid7@gmail.com',
                subject: 'HEllO NucesCircle 2019',
                text: 'Welcome To NucesCircle , We are happy that you became part of this circle'
            
            }
            ,req.body.email , (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("The message was sent!", req.body.email);
                console.log(info);
            });
            CreateProfile(req, res);
            CreateInstitueRecord(req, res);
            res.redirect('NucesCircle/signin');

        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                res.render("user/Signup.hbs", {

                    viewTitle: "Insert User",
                    user_: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);

        }
    });
}

function CreateProfile(req, res) {
    fname = req.body.FName
    fname = fname.toProperCase()
    lname = req.body.LName
    lname = lname.toProperCase()
    var profile1 = new Profile();
    profile1.FName = fname;
    profile1.LName = lname;
    profile1.Email = req.body.Email;
    profile1.Age = "-"
    profile1.Phone = "_"
    profile1.Social = "-"
    profile1.imagepath = "-"
    profile1.Discipline = "-"

    profile1.save((err, doc) => {

        if (!err)
            console.log('Profile Created Sucessfully: ');
        else {

            console.log('Error during record insertion : ' + err);

        }
    });
}
function CreateInstitueRecord(req, res) {

    var Institute1 = new Institute();
    Institute1.Email = req.body.Email;
    Institute1.Institute = "National University of Computer and Emerging Science (FAST) ";
    Institute1.Degree = "-"
    Institute1.To = "-"
    Institute1.From = "_"
    Institute1.save((err, doc) => {
        if (!err)
            console.log('Institute Record  Created Sucessfully: ');
        else {

            console.log('Error during Institute record insertion : ' + err);

        }
    });
}


router.get('/signin', (req, res) => {
    user.find((err, docs) => {//docs will contain records of connection users
        if (!err) {//if no error we will return a view

            user.findById(req.session.userId)
                .exec(function (error, user_) {
                    if (error) {
                        return next(error);
                    } else {
                        if (user_ === null) {
                            res.render("user/Signin.hbs", {

                            });

                        } else {
                            // return res.send('<h1>Name: </h1>' + user_.FName + '<h2>Mail: </h2>' + user_.Email + '<br><a type="button" href="/users/logout">Logout</a>')
                            //  return res.render("user/Profile.hbs", {
                            //      user_: req.body
                            //  });

                            res.redirect("/NucesCircle/profile");
                        }
                    }
                });






        }
        else {
            console.log('Error in User Sign in :' + err);
        }
    });
    // res.json("Sign in Page");

});


router.post('/signin', (req, res) => {
    var id = req.body.email;
    var id2 = req.body.password;
    console.log('Email :' + id);      //  else
    console.log('pwd :' + id2);      //  else


    // input names not ids
    if (req.body.email && req.body.password) {
        console.log("inside");

        user.authenticate(req.body.email, req.body.password, function (error, user, next) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                console.log('Wrong email or password.');
                // return res.redirect('/users/signin',{ title:'Wrong email or password.'});
                return res.render("user/Signin.hbs", {
                    title: '* Wrong email or password.'
                });
                //return next(err);
                // return new Error ('Wrong email or password.')
            } else { // if found
                req.session.userId = user._id;
                console.log('Sucessfully signed in');

               
              
                return res.redirect('/NucesCircle/profile');
            }

        });
    }
    else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }



});


router.get('/connection', function (req, res, next) {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    //  var err = new Error('Not authorized! Go back!');
                    //  err.status = 400;
                    //  return next(err);
                    res.redirect("/NucesCircle/signin");
                } else {
                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found

                            return res.render("user/Connection.hbs", {
                                CurrUser: user

                            });
                        }

                    });
                }
            }
        });
});

router.get('/profile', function (req, res, next) {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    //  var err = new Error('Not authorized! Go back!');
                    //  err.status = 400;
                    //  return next(err);
                    res.redirect("/NucesCircle/signin");
                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found
                            //   console.log('Sucessfully found Profile' + user);
                            Institute.Find(user_.Email, function (error, Inst, next) {
                                if (error || !Inst) {
                                    return next(error);
                                }
                                else {
                                    // console.log('Sucessfully found Institute' + Inst);
                                    Project.Find(user_.Email, function (error, Proj, next) {
                                        if (error || !Proj) {
                                            return next(error);
                                        }
                                        else {


                                            Skill.Find(user_.Email, function (error, skill1, next) {
                                                if (error || !skill1) {
                                                    return next(error);
                                                }
                                                else {

                                                    Course.Find(user_.Email, function (error, Course1, CourseCount, next) {
                                                        if (error || !Course1) {
                                                            return next(error);
                                                        }
                                                        else {
                                                            Language.Find(user_.Email, function (error, Language, LanguageCount, next) {
                                                                if (error || !Language) {
                                                                    return next(error);
                                                                }
                                                                else {

                                                                    Certification.Find(user_.Email, function (error, Certification, CertificationCount, next) {
                                                                        if (error || !Certification) {
                                                                            return next(error);
                                                                        }
                                                                        else {

                                                                            Experience.Find(user_.Email, function (error, Experience, ExperienceCount, next) {
                                                                                if (error || !Certification) {
                                                                                    return next(error);
                                                                                }
                                                                                else {
                                                                                    Notification.Count(user_.Email, function (error, NotificationCount, next) {
                                                                                        if (error || !NotificationCount) {
                                                                                            return next(error);
                                                                                        }
                                                                                        else {
                                                                                            Review.GetAllReview(user_.Email, function (error, ReviewList, next) {
                                                                                                if (error || !ReviewList) {
                                                                                                    return next(error);
                                                                                                }
                                                                                                else {
                                                                                                    return res.render("user/Profile.hbs", {
                                                                                                        CurrUser: user,
                                                                                                        Institute_: Inst,
                                                                                                        Project_: Proj,
                                                                                                        Skill_: skill1,                                                                                                                              // Course_ :Course1
                                                                                                        Course_: Course1,
                                                                                                        CourseCount_: CourseCount,
                                                                                                        LanguageCount_: LanguageCount,
                                                                                                        CertificationCount_: CertificationCount,
                                                                                                        ExperienceCount_: ExperienceCount,
                                                                                                        Language_: Language,
                                                                                                        Certification_: Certification,
                                                                                                        Experience_: Experience,
                                                                                                        NotificationCount_: NotificationCount,
                                                                                                        ReviewList_: ReviewList

                                                                                                    });

                                                                                                }
                                                                                            });

                                                                                        }

                                                                                    });


                                                                                }
                                                                            });


                                                                        }
                                                                    });

                                                                }
                                                            });


                                                        }
                                                    });


                                                }

                                            });








                                        }

                                    });

                                }


                            });

                        }
                    });
                }
            }

        });
});

router.post('/profile', async (req, res) => {
    // res.send(req.body);
    //console.log(' Updating Profile : ' + req.body.img + " " + req.body.FName + " " + req.body.LName);

    if (req.session) {
        if (req.body.Type == "General")
            updateProfile(req, res);
    }
});
//console.log(' Updating Picture : ' + req.files["mimetype"] + " " + req.body.path + " " );
//  res.send(req.files);

router.post('/picture', upload.single('img'), (req, res, next) => {
    var filepath = req.file.path;
    req.body.imagepath = filepath.replace("public/", "/");
    //console.log(" file info", req.file);
   // console.log("user profile info", req.body);
    if (req.session) {
        if (req.body.Type == "General")
            updateProfile(req, res);
    }

});


router.post('/searchconnection', function (req, res) {
    // console.log(' Search connection  : ' + req.body.Email + req.body.id + req.body.SearchField);
    var ownerEmail = req.body.Email;
    var str = req.body.SearchField;
    str = str.toProperCase();

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found



                            Connection.GetFriends(user_.Email, function (error, AllFriends, next) {

                                if (error || !user) console.log('no people found.');
                                else {
                                    console.log("Search string ", str );

                                    Profile.SearchManyPeople(ownerEmail, user.Email, str, AllFriends,
                                        function (error, Friends , Strangers, next) {
                                            if (error || !Friends||!Strangers ) console.log('no people found.');
                                            else {
                                                //Friends [] contain Profile of all Friends Of Owner
                                                console.log("Friends", Friends);
                                                console.log("Strangers ", Strangers);
       /*
                                                ResultFriendsbyName = [];
                                                for (i = 0; i < ResultPeople.length; i++) {
                                                    for (j = 0; j < Friends.length; j++) {
                                                        if (ResultPeople[i].Email == Friends[j]) {

                                                            ResultFriendsbyName.push(Friends[j]);
                                                        }
                                                    }

                                                }
                                                // ResultFriendsbyName have email of all friends of user 
                                                console.log("ResultFriendsbyName", ResultFriendsbyName);

                                                var strangers = [];
                                                var UsersFriends = [];
                                                for (i = 0; i < ResultPeople.length; i++) {
                                                    if (ResultFriendsbyName.length > 0) {
                                                        for (j = 0; j < ResultFriendsbyName.length; j++) {
                                                            console.log("ResultPeople[i].Email", ResultPeople[i].Email,"   ResultFriendsbyName",ResultFriendsbyName[j]);

                                                            if (ResultPeople[i].Email == ResultFriendsbyName[j]) {
                                                                UsersFriends.push(ResultPeople[i]);
                                                               // ResultPeople[i].delete; 
                                                                break;
                                                            }
                                                            else {
                                                                strangers.push(ResultPeople[i]);
                                                                break;

                                                            }


                                                        }


                                                    }
                                                    else {
                                                        strangers = ResultPeople;
                                                    }




                                                }

                                                console.log("strangers", strangers);
                                                console.log("Friends", UsersFriends);
                                                if(ownerEmail==user.Email)
                                                {

                                                } */

                                                res.render("user/SearchResultPeople.hbs", {
                                                    //sends curr user profile and all the profiles of the searched user
                                                    CurrUser: user,
                                                    People: Strangers,
                                                    Friends_: Friends 
                                                });
                                            }


                                        });
                                }
                            });


                        }

                    });
                }
            }
        });

});


router.post('/addReview', function (req, res) {
    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                } else {


                    Review.AddReview(req, function (error, reviewSaved, next) {
                        if (!error || reviewSaved) {

                            Profile.GetProfile(req.body.Email, function (error, ReviewByProfile, next) {

                                if (error || !ReviewByProfile) console.log('no people found.');
                                else {

                                    Notification.AddReviewNotification(ReviewtoEmail, ReviewByProfile, function (error, NotifcationAdded, next) {
                                        if (!error || reviewSaved) {
                                            othersEmail = reviewSaved.ReviewToEmail;
                                            url = "/NucesCircle/GetProfile/" + othersEmail;
                                            res.redirect(url);



                                        }


                                    });

                                }
                            });





                        }


                    });


                }
            }
        });

});


router.post('/Connect', async (req, res) => {
    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else if (user_ === null) {
                res.redirect("/NucesCircle/signin");
            } else {
                var RecieverEmail = req.body.FriendEmail;
                var SenderEmail = user_.Email;
                console.log(" RecieverEmail " + RecieverEmail + "SenderEmail " + SenderEmail);

                Profile.GetProfile(SenderEmail, function (error, SenderProfile, next) {

                    if (error || !SenderProfile) console.log('no people found.');
                    else {
                        Notification.ReqForConnection(SenderProfile, RecieverEmail, function (error, Notifications, next) {
                            if (!error) {

                                res.redirect("/NucesCircle/connection");
                            }


                        });

                    }
                });

                //  console.log(" SenderProfileImg "+req.body.SenderProfileImg);
                //   console.log('Connect  : ' + req.body.FriendEmail + " oener " + user_.Email);


            }
        });





    /* 
     
 
 
 */


    //res.send(user1);
    //  console.log('creater  : ' +user1["FName"]+ user1[0] +user1.FName  );
    //    var NewCreater = user1["FName"] + " " + user1.LName
    //   var Post1 = new Post();
    //   Post1.Creater = NewCreater;
    //  Post1.Message = req.body.NewPost; 
    // user_.Email = req.body.Email;
    // user_.Password = req.body.Password;
    /*   Post1.save((err, doc) => {
   
           if (!err)
               res.redirect('/NucesCircle');
           else {
   
               /* res.render("user/Signup.hbs", {
    
                    viewTitle: "Insert Employee",
                    userPost : req.body
                }); 
               console.log('Error during record insertion : ' + err);
   
           }
       });
   */
});
router.get('/GetProfile/:Email', async (req, res) => {
    var FriendEmail = req.params.Email
    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found
                            if (user_.Email != FriendEmail) {
                                Profile.GetProfile(FriendEmail, function (error, otheruser, next) {
                                    if (error || !otheruser) console.log('nothing found.');
                                    else {
                                        console.log("users People ", otheruser);

                                        Institute.Find(FriendEmail, function (error, Inst, next) {
                                            if (error || !Inst) {
                                                return next(error);
                                            }
                                            else {
                                                console.log('Sucessfully found Institute' + Inst);
                                                Project.Find(FriendEmail, function (error, Proj, next) {
                                                    if (error || !Proj) {
                                                        return next(error);
                                                    }
                                                    else {


                                                        Skill.Find(FriendEmail, function (error, skill1, next) {
                                                            if (error || !skill1) {
                                                                return next(error);
                                                            }
                                                            else {
                                                                Course.Find(FriendEmail, function (error, Course1, CourseCount, next) {
                                                                    if (error || !Course1) {
                                                                        return next(error);
                                                                    }
                                                                    else {
                                                                        Language.Find(FriendEmail, function (error, Language, LanguageCount, next) {
                                                                            if (error || !Language) {
                                                                                return next(error);
                                                                            }
                                                                            else {

                                                                                Certification.Find(FriendEmail, function (error, Certification, CertificationCount, next) {
                                                                                    if (error || !Certification) {
                                                                                        return next(error);
                                                                                    }
                                                                                    else {

                                                                                        Experience.Find(FriendEmail, function (error, Experience, ExperienceCount, next) {
                                                                                            if (error || !Certification) {
                                                                                                return next(error);
                                                                                            }
                                                                                            else {

                                                                                                Review.GetAllReview(FriendEmail, function (error, ReviewList, next) {
                                                                                                    if (error || !ReviewList) {
                                                                                                        return next(error);
                                                                                                    }
                                                                                                    else {
                                                                                                        res.render("user/OthersProfile.hbs", {
                                                                                                            CurrUser: user,
                                                                                                            other: otheruser,
                                                                                                            Institute_: Inst,
                                                                                                            Project_: Proj,
                                                                                                            Skill_: skill1,                                                                                                                              // Course_ :Course1
                                                                                                            Course_: Course1,
                                                                                                            CourseCount_: CourseCount,
                                                                                                            LanguageCount_: LanguageCount,
                                                                                                            CertificationCount_: CertificationCount,
                                                                                                            ExperienceCount_: ExperienceCount,
                                                                                                            Language_: Language,
                                                                                                            Certification_: Certification,
                                                                                                            Experience_: Experience,
                                                                                                            ReviewList_: ReviewList

                                                                                                        });

                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });


                                                                                    }
                                                                                });

                                                                            }
                                                                        });


                                                                    }
                                                                });

                                                            }

                                                        });








                                                    }

                                                });

                                            }


                                        });

                                    }


                                });
                            }
                            else {
                                res.redirect("/NucesCircle/Profile");
                            }


                        }
                    });
                }
            }

        });

});

function updateProfile(req, res) {
    Profile.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect("/NucesCircle/profile");
        }
        else {

            console.log('Error during record update : ' + err);
        }
    });
}


router.get('/post', async (req, res) => {
    console.log("GET post  ");

    user.findById(req.session.userId)
        .exec(async (error, user_) => {

            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                } else {
                    Connection.GetFriends(user_.Email, function (error, Friends, next) {
                        if (!error) {
                            Post.GetPosts(user_.Email, Friends, function (error, resultset, next) {
                                if (!error) {

                                   //  console.log("resultset", resultset);
                                     res.send({
                                        // items: JSON.stringify(resultset)
                                        items: resultset,
                                        CurrUser:user_
                                     }); 
                 
                                }

                            });

                        }
                    });
                    
                   
                   


                }
            }
        });


});

router.post('/post', async (req, res) => {
    // res.send(req.body);
    // insertPost(req, res);
    // var user1 = await user.findById(req.session.userId)
    Post.CreatePost(req, function (error, postq, next) {
        if (error || !postq) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            console.log('Wrong email or password.');
            return res.render("user/Signin.hbs", {
                title: '* Wrong email or password.'
            });

        }
        res.redirect('/NucesCircle');
    });

    // user_.Email = req.body.Email;
    // user_.Password = req.body.Password;


});

router.post('/addInstitute', async (req, res) => {
    Institute.AddInstitute(req, function (error, Institute, next) {
        if (error) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            console.log('Wrong email or password.');
            return res.render("user/Signin.hbs", {
                title: '* Wrong email or password.'
            });
        } else { // if no error
            console.log('Sucessfully  Inserted new Institute');
            res.redirect('/NucesCircle/profile');

        }

    });



});
router.delete('/DeletePost/:id', (req, res) => {

//router.delete('/DeletePost/:id /:Email', (req, res) => {


    user.findById(req.session.userId)
    .exec(function (error, user_) {
        if (error) {
            return next(error);
        } else {
            if (user_ === null) {

                res.render("user/Signin.hbs", {
                    viewTitle: "Sign IN "
                });


            } else {

                console.log('indised posttttt :' + req.params.id+" " );
               // if(req.params.Email==user_.Email)
                {
                Post.findByIdAndRemove(req.params.id, (err, doc) => {
                    if (!err) {
                        //console.log('no error in  deleting post' );

                        //res.redirect('/NucesCircle');
                    }
                    else { console.log('Error in Post Record delete :' + err); }
                });
             }


            }
        }
    });
   
});
router.put('/EditPost/:id', (req, res) => {

    //router.delete('/DeletePost/:id /:Email', (req, res) => {
    var newPostMsg=req.body.newMessage;
    var Postid= req.params.id;
        user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
    
                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });
    
    
                } else {
    
                    console.log('indised posttttt :' + req.params.id+" " );
                   // if(req.params.Email==user_.Email)
                    

                        Post.findById(Postid, (err, post) => {
                            if (!err) {
                                //var resultset={}
                                //resultset.push(post)
                                post.Message=newPostMsg;

                                Post.findByIdAndUpdate( Postid,post, {new: true}, function(err, nrwmodel) {
                                    if (err ) {
                                        
                                        console.log('Error in Post Record edit :' + err);
                                    }
                                    

                                });

                            }
                            
                            else { console.log('Post not found for editing :' + err); }
                        }); 



                   
    
    
                }
            }
        });
       
});


router.get('/DeleteInstitute/:id', (req, res) => {
    Institute.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Institute Record delete :' + err); }
    });
});
router.get('/DeleteReview/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Review Record delete :' + err); }
    });
});


router.get('/DeleteCourse/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Course Record delete :' + err); }
    });
});
router.get('/DeleteLanguage/:id', (req, res) => {
    Language.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Language Record delete :' + err); }
    });
});
router.get('/DeleteCertification/:id', (req, res) => {
    Certification.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Certification Record delete :' + err); }
    });
});
router.get('/DeleteExperience/:id', (req, res) => {
    Experience.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Experience Record delete :' + err); }
    });
});
router.post('/RemoveConnection/:id', (req, res) => {

    Notification.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/Notification');
        }
        else { console.log('Error in Notification Record delete :' + err); }
    });
});
router.post('/AddConnection/:id', (req, res) => {

    Notification.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            Connection.MakeConnection(req.body.Sender, req.body.Reciever, function (error, val, next) {

                if (error) {
                    var err = new Error('MakeConnection Error');
                    //return next(err);
                } else { // if no error
                    //      console.log('Sucessfully  Inserted new MakeConnection');
                    res.redirect('/NucesCircle/profile');

                }

            });
        }
        else { console.log('Error in Making Connection delete :' + err); }
    });


});
router.post('/addCertificate', function (req, res, next) {
    console.log('Sucessfully  Inserted new Certification');

    Certification.ADD(req, function (error, val, next) {
        if (error) {
            var err = new Error('Add Certification Error');
            //return next(err);
        } else { // if no error
            console.log('Sucessfully  Inserted new Certification');
            res.redirect('/NucesCircle/profile');

        }

    });


});
router.post('/addExperience', function (req, res, next) {

    Experience.ADD(req, function (error, val, next) {
        if (error) {
            var err = new Error('Add Experience Error');
            //return next(err);
        } else { // if no error
            console.log('Sucessfully  Inserted new Experience');
            res.redirect('/NucesCircle/profile');

        }

    });


});
router.post('/addProject', function (req, res, next) {

    Project.ADDProject(req, function (error, val, next) {
        if (error) {
            var err = new Error('Add Project Error');
            err.status = 401;
            console.log('Add Project Error');
            //return next(err);
        } else { // if no error
            console.log('Sucessfully  Inserted new Institute');
            res.redirect('/NucesCircle/profile');

        }

    });



});
router.post('/addSkill', function (req, res, next) {

    Skill.ADDSkill(req, function (error, val, next) {
        if (error) {
            var err = new Error('Add Skill Error');
            err.status = 401;
            console.log('Add Skill Error');
        } else { // if no error
            console.log('Sucessfully  Inserted new Skill');
            res.redirect('/NucesCircle/profile');

        }

    });



});
router.post('/addCourse', function (req, res, next) {

    Course.ADDCourse(req, function (error, val, next) {
        if (error) {
            var err = new Error(' ADD Course Error');
            err.status = 401;
            console.log('Add Course Error');
        } else { // if no error
            console.log('Sucessfully  Inserted new Course');
            res.redirect('/NucesCircle/profile');

        }

    });



});
router.post('/addLanguage', function (req, res, next) {

    Language.ADDLanguage(req, function (error, val, next) {
        if (error) {
            var err = new Error(' ADD Language Error');
            err.status = 401;
            console.log('Add Language Error');
        } else { // if no error
            console.log('Sucessfully  Inserted new Language');
            res.redirect('/NucesCircle/profile');

        }

    });



});

router.get('/DeleteSkill/:id', (req, res) => {
    console.log(' inside  DeleteProject :');
    Skill.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in Delete skill :' + err); }
    });
});

router.get('/DeleteProject/:id', (req, res) => {
    console.log(' inside  DeleteProject :');
    Project.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/NucesCircle/profile');
        }
        else { console.log('Error in DeleteProject :' + err); }
    });
});

router.post('/EditInstitute', async (req, res) => {


    Institute.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/NucesCircle/profile'); }
        else {
            console.log('Error during record update : ' + err);
        }
    });

});

router.get('/UpdateInstitute/:id', (req, res) => {
    console.log("inside updateeee ", req.body);
    Institute.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("user/EditInstitute.hbs", {
                currInstitute: doc
            });
            //console.log("inside updateeee ", doc);

        }
    });
});


router.get('/postjob', (req, res) => {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {
                    res.render("user/PostJob.hbs", {
                        viewTitle: "Post Job "
                    });
                }
            }
        });
    /*     if (req.session) {
           // delete session object
           req.session.destroy(function (err) {
               if (err) {
                   return next(err);
               } else {
                   return res.redirect('/NucesCircle');
               }
           });
         } */
});
router.post('/postjob', (req, res) => {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (!error) {
                console.log("posting job", user_.Email);
                console.log(req.body);
                Job.ADD(req, user_.Email, function (error, val, next) {
                    if (error) {
                        var err = new Error(' Post Job Error');
                        err.status = 401;
                        console.log('Post Job  Error');
                    } else { // if no error
                        console.log('Sucessfully  Posted Job');
                        res.redirect('/NucesCircle/job');

                    }

                });

            }
        })
});
router.post('/searchPostedjob', function (req, res) {
    console.log(' Search connection  : ' + req.body.Email + req.body.id + req.body.SearchField);
    var str = req.body.SearchField;
    str = str.toProperCase();

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found

                            Profile.SearchPeople("thatswhatilike@gmail.com", str, "Abaid",
                                function (error, ResultPeople, next) {
                                    if (error || !ResultPeople) console.log('nothing found.');
                                    else {
                                        console.log("users People ", ResultPeople);

                                        res.render("user/SearchResultPeople.hbs", {
                                            //sends curr user profile and all the profiles of the searched user
                                            CurrUser: user,
                                            People: ResultPeople
                                        });
                                    }


                                });



                        }
                    });
                }
            }

        });

});
router.get('/job', function (req, res, next) {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {
                    //  var err = new Error('Not authorized! Go back!');
                    //  err.status = 400;
                    //  return next(err);
                    res.redirect("/NucesCircle/signin");
                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else {
                            return res.render("user/jobs.hbs", {
                                CurrUser: user
                            });

                        }
                    });










                }
            }
        });
});

router.post('/searchJobRelevency', (req, res) => {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {

                    Profile.GetProfile(user_.Email, function (error, userProfile, next) {
                        if (error || !userProfile) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found
                            var Discipline=userProfile.Discipline;
                            Job.FindReleventJob(Discipline, Discipline, function (error, FoundJob, LocationJob, TitleJobLength, LocationJobLength, next) {
                                if (FoundJob.length == 0) msg = " No Result Found"
                                else msg = FoundJob.length + "  Results Found"
                                if (!error) {
                                    //     console.log('TitleJob ' + req.body.Title+ 'LocationJob '+req.body.Location  );
                                    res.render("user/SearchResultJob.hbs", {
                                        viewTitle: msg,
                                        CurrUser: userProfile,
                                        Jobs: FoundJob
                                    });


                                }
                                else {
                                    console.log('Error in finding job :' + error);
                                }

                                //   else { console.log('Error in Certification Record delete :' + err); }
                            });

                        }
                    });


                }
            }
        });

});
router.post('/searchjob', (req, res) => {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found

                            Job.Find(req.body.Title, req.body.Location, function (error, FoundJob, LocationJob, TitleJobLength, LocationJobLength, next) {
                                if (FoundJob.length == 0) msg = " No Result Found"
                                else msg = FoundJob.length + "  Results Found"
                                if (!error) {
                                    //     console.log('TitleJob ' + req.body.Title+ 'LocationJob '+req.body.Location  );
                                    res.render("user/SearchResultJob.hbs", {
                                        viewTitle: msg,
                                        CurrUser: user,
                                        Jobs: FoundJob
                                    });


                                }
                                else {
                                    console.log('Error in finding job :' + error);
                                }

                                //   else { console.log('Error in Certification Record delete :' + err); }
                            });

                        }
                    });


                }
            }
        });

});
router.get('/myjob', (req, res) => {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found

                            Job.FindMyPostedJobs(user_.Email, function (error, FoundJob, LocationJob, TitleJobLength, LocationJobLength, next) {
                                if (FoundJob.length == 0) msg = " No Result Found"
                                else msg = FoundJob.length + "  Results Found"
                                if (!error) {
                                    //     console.log('TitleJob ' + req.body.Title+ 'LocationJob '+req.body.Location  );
                                    res.render("user/MyPostedJobs.hbs", {
                                        viewTitle: msg,
                                        CurrUser: user,
                                        Jobs: FoundJob
                                    });


                                }
                                else {
                                    console.log('Error in finding job :' + error);
                                }

                                //   else { console.log('Error in Certification Record delete :' + err); }
                            });

                        }
                    });


                }
            }
        });

});
router.post('/ViewApplicant', (req, res) => {
    var JobID = req.body.JobId;
    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found
                            Job.findById(JobID).exec(async (error, Job) => {
                                if (!error) {
                                    Application.FindJobApplicants(JobID, function (error, Applicants, next) {
                                        //       if(FoundJob.length==0 )   msg=" No Result Found" 
                                        //     else  msg= FoundJob.length+ "  Results Found" 
                                        if (!error) {
                                            //     console.log('TitleJob ' + req.body.Title+ 'LocationJob '+req.body.Location  );
                                            res.render("user/JobCandidates.hbs", {
                                                viewTitle: msg,
                                                CurrUser: user,
                                                Job_: Job,
                                                Applicants_: Applicants
                                            });


                                        }
                                        else {
                                            console.log('Error in finding job :' + error);
                                        }

                                        //   else { console.log('Error in Certification Record delete :' + err); }
                                    });
                                }
                            });


                        }
                    });


                }
            }
        });

});
router.get('/Notification', (req, res) => {

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                if (user_ === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {

                    Profile.GetProfile(user_.Email, function (error, user, next) {
                        if (error || !user) {
                            var err = new Error('Wrong email or password.');
                            err.status = 401;
                            console.log('Wrong email or password.');
                            return res.render("user/Signin.hbs", {
                                title: '* Wrong email or password.'
                            });
                        } else { // if found

                            Notification.GetNotifications(user_.Email, function (error, ConnectionNotification, JobNotification, ReviewNotification, NotificationsCount, next) {
                                if (NotificationsCount.count == 0) msg = " No New Notification"
                                else msg = NotificationsCount.count + " New Notifications "
                                if (!error) {
                                    res.render("user/Notification.hbs", {
                                        viewTitle: msg,
                                        CurrUser: user,
                                        ConnectionNotification_: ConnectionNotification,
                                        JobNotification_: JobNotification,
                                        ReviewNotification_: ReviewNotification
                                    });


                                }
                                else {
                                    console.log('Error in finding job :' + error);
                                }

                                //   else { console.log('Error in Certification Record delete :' + err); }
                            });

                        }
                    });


                }
            }
        });

});

router.post('/ApplyJob/:id', (req, res) => {
    //   console.log("req.body.CurrUserEmail",req.body.CurrUserEmail,"  req.body.RecuriterEmail",req.body.RecuriterEmail )
    const JobID = req.params.id

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                //return res.redirect('/NucesCircle/');
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                }
                else {
                    if (user_.Email != req.body.RecuriterEmail) {
                        Job.findById(JobID).exec(async (error, Job) => {
                            if (!error) {
                                if (Job.Email != user_.Email) {
                                    Application.ADD(req.params.id, user_.Email, user_.FName, user_.LName,
                                        function (error, ResultPeople, next) {
                                            if (!error) {
                                                //console.log("applied")
                                                res.render("user/SubmitJobApplication.hbs", {

                                                    viewTitle: " Job Application Submitted Sucessfully! "
                                                }

                                                )
                                            }
                                        });

                                }
                            }
                        });
                    }
                    else {
                        res.render("user/SubmitJobApplication.hbs", {

                            viewTitle: " Error: You cannot apply for this job  "
                        });

                    }

                }

            }

        });



});
router.get('/Applicant/:id', function (req, res, next) {
    console.log("applied", req.params.id)

    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                //return res.redirect('/NucesCircle/');
                //Jobs.Find


                Application.ADD(req.params.id, user_.Email,
                    function (error, ResultPeople, next) {
                        if (!error) {
                            console.log("applied")
                        }


                    });
            }
        });
});

router.post('/FilterJobApplicant/:id', (req, res) => {
    console.log("Serach req ", req.body)
    JobID = req.params.id;
    user.findById(req.session.userId)
        .exec(function (error, user_) {
            if (error) {
                return next(error);
            } else {
                //return res.redirect('/NucesCircle/');
                if (user_ === null) {
                    res.redirect("/NucesCircle/signin");
                }
                else {

                    Application.FindJobApplicants(JobID,
                        function (error, Applcants, next) {
                            if (!error) {
                                console.log("applicants", Applcants)

                                Institute.FilterApplicantByGraduationDate(Applcants, req.body.Graduation, req.body.Institute, req.body.Degree,
                                    function (error, InstitutePeople, next) {
                                        if (error || !InstitutePeople) console.log('no people found.');
                                        else {
                                            console.log("Institiue applicants", InstitutePeople)

                                            Skill.FilterBySkill(InstitutePeople, req.body.Interests,
                                                function (error, SkillPeople, next) {
                                                    if (error || !SkillPeople) console.log('no people found.');
                                                    else {

                                                        Profile.FilterApplicantbyDiscipline(SkillPeople, req.body.Discipline,
                                                            function (error, DisciplinePeople, next) {
                                                                if (error || !DisciplinePeople) console.log('no skill found.');
                                                                else {
                                                                    //res.send(DisciplinePeople);
                                                                    return res.render("user/ApplicantSearchFilter.hbs", {
                                                                        title: 'ApplicantSearchFilter',
                                                                        FilteredApplicant_: DisciplinePeople
                                                                    });

                                                                }
                                                            });


                                                    }
                                                });




                                        }
                                    });


                            }
                        });


                }

            }

        });



});

router.get('/DeleteJobApplicant/:id', (req, res) => {
    // console.log(' inside  DeleteJobApplicant :', req);

    Application.findById(req.params.id)
        .exec(function (error, Application1) {
            if (error) {
                return next(error);
            } else {
                if (Application1 === null) {

                    res.render("user/Signin.hbs", {
                        viewTitle: "Sign IN "
                    });


                } else {

                    Job.findById(Application1.JobId)
                        .exec(function (error, Job1) {
                            if (error) {
                                return next(error);
                            } else {
                                if (Job1 === null) {

                                    res.render("user/Signin.hbs", {
                                        viewTitle: "Sign IN "
                                    });


                                } else {

                                    // Job.
                                    Notification.AddJobNotification(Job1, Application1.ApplicantAccEmail, function (error, val, next) {

                                        if (error) {
                                            var err = new Error('AddJobNotification Error');
                                            //return next(err);
                                        } else {

                                            Application.findByIdAndDelete(Application1._id)
                                                .exec(function (error, Application1) {
                                                    if (error) {
                                                        return next(error);
                                                    } else {
                                                        if (Application1 === null) {

                                                            res.render("user/Signin.hbs", {
                                                                viewTitle: "Sign IN "
                                                            });


                                                        } else {
                                                            res.redirect('/NucesCircle/myjob');

                                                        }
                                                    }
                                                });






                                        }

                                    });






                                }
                            }
                        });






                }
            }
        });





});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/NucesCircle');
            }
        });
    }
});


function handleValidationError(err, body) {
    //  console.log("field", field);
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'FName':
                body['FNameError'] = err.errors[field].message;
                break;
            case 'Password':
                body['PasswordError'] = err.errors[field].message;
                break;
            case 'Email':
                body['EmailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

String.prototype.toProperCase = function () {
    var words = this.split(' ');
    var results = [];
    for (var i = 0; i < words.length; i++) {
        var letter = words[i].charAt(0).toUpperCase();
        results.push(letter + words[i].slice(1));
    }
    return results.join(' ');
};

module.exports = router;








/* ---------------------------------API------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------*/
const morgan= require('morgan');
router.use(morgan('dev'));

router.use( (req , res , next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT , POST , PATCH , DELETE, GET');
        return res.status(200).json({});
    }
    next();

 });

 
 

  

router.get('/api/user', (req, res, next)=> {
    user.find()
    .select('FName LName Email ' /*Password*/ )
    .exec()
    .then( docs =>{
       // console.log(docs);
       const response={
        count: docs.length,
        users: docs.map(docs=>{
            return{
               FName : docs.FName,
               LName : docs.LName ,
               Email : docs.Email ,
               _id : docs._id ,
               request:{
                    type:'GET',
                    url:' http://localhost:3000/NucesCircle/api/user/'+docs._id 
               }


            }
        })
       };
        if(docs.length>=0){
        res.status(200).json(response);
         }
         else{
            res.status(404).json(
                {
                    message: 'No enteries found'
                } );
 
         }
    })
    .catch(err=>{ console.log(err)
        res.status(500).json( {error:err});
        });


  

});


router.post('/api/user', (req, res, next)=> {

   const NewUser= new user(
    {   _id: new mongoose.Types.ObjectId(),
        FName: req.body.FName,
        LName: req.body.LName,
        Email: req.body.Email,
        Password: req.body.Password

    });

    NewUser.save().then( result=>{
        console.log(result);
        res.status(201).json({
            message: ' Created  User Sucessfully',
            createdUser: {
                FName: result.FName,
                LName: result.LName,
                Email: result.Email,
               /* Password: result.Password,*/
                _id: result._id,
                request:{
                    type:'GET',
                    url:' http://localhost:3000/NucesCircle/api/user/'+result._id 
               }

            }
        });
       
    }) 
    .catch(err=>{ console.log(err)
        res.status(500).json( {error:err});
        

        });




});

router.get('/api/user/:userID', (req, res, next)=> {
    const id= req.params.userID;
    user.findById(id)
    .select('FName LName Email ' )
    .exec()
    .then(doc=>{
        //if sucessfull in finding user
        console.log("From Database ",doc);
        if (doc){
            res.status(200).json(
                {
                    user: doc,
                    request:{
                        type:'GET',
                        discription: "Get ALL Users",
                        url:' http://localhost:3000/NucesCircle/api/user'
                   }

                }
            );

        }
        else{
            res.status(404).json({
                // for id whihc is valid but user doesnot exist
                message:'No valid user entry found for provided id '
            })
        }

        })
    .catch(err=>{ console.log(err)
        // invalid id 
        res.status(500).json( {error:err});
        

        });


   

});

router.delete('/api/user/:userID', (req, res, next)=> {

   const id= req.params.userID;
   console.log( " DELTEED ID ",id );

    user.remove({_id: id }).exec()
    .then( result=>{
        res.status(200).json(
            {
                message:'Product Deleted',
                request:{
                    type:'POST',
                    url:' http://localhost:3000/NucesCircle/api/user/',
                    body:{FName:'String', LName:'String' ,Email:'Email', 
                    Password:'String'
                }
               }
            })
            
        
    })
    .catch(err=>{ console.log(err)
        // invalid id 
        res.status(500).json( {error:err});
        });



 });


router.patch('/api/user/:userID', (req, res, next)=> {
    const id= req.params.userID;
    const updateOps={};
    for (const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }

    user.update({_id:id},{ $set:updateOps} )
    .exec()
    .then( result=>{
        console.log(result);
        res.status(201).json(
           {
               message:"User Updated ",
               request:{
                type:'GET',
                discription: "Get Detail of this User",
                url:' http://localhost:3000/NucesCircle/api/user/'+id
           }

           }
        );
       
    }) 
    .catch(err=>{ console.log(err)
        res.status(500).json( {error:err});
        });


});



/*
 router.use( (req , res , next)=>{
    const error=new Error("Not found ") 
    error.status=404;
    next(error);
 });
 
 router.use( (error, req , res , next)=>{
     res.status(error.status|| 500 );
     res.json({
       error:{
         message: error.message
       }
     })
    
  });

  */