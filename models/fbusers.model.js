
const mongoose = require('mongoose');
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
      required: 'This field is required.' 
    }, Token:{
      type: String,
      required: 'This field is required.' 
    }, Email:{
      type: String,
      required: 'This field is required.' 
    }
   
  
});



//mongoose.model('users', usersSchema);

var Fbuser = mongoose.model('fbusers', fbusersSchema);
module.exports = Fbuser;

