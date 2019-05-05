require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const usersController = require('./controllers/usersController');
var session = require('express-session');
var multer  = require('multer')
//var upload = multer({ dest: 'public/uploads/' })
//var MongoStore = require('connect-mongo')(session);

var app = express(); 
//Middle ware
app.use(bodyparser.urlencoded({

    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
// catch 404 and forward to error handler
/*
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
}); 
  */
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
  
  

//use sessions for tracking logins

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
 //   store: new MongoStore({
 //     mongooseConnection: db
  //  })
  }));



app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Express server has been started at port : 3000');
});

app.use('/NucesCircle', usersController);


