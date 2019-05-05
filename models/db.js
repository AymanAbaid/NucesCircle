const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/UsersDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./users.model');
require('./post.model');
require('./profile.model');
require('./education.model');
require('./project.model');
require('./course.model');
require('./skill.model');
require('./connect.model');
require('./language.model');
require('./certification.model');
require('./experience.model');
require('./job.model');
require('./jobapplication.model');
require('./notification.model');
require('./review.model');
require('./fbusers.model');


