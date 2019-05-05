const mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({

    CreaterEmail: {
        type: String,
        required: 'This field is required.'

    },
    Message:{
        type: String,
        required: 'This field is required.'
    },
    FullName:{
        type: String,
        required: 'This field is required.'
    },
    ProfilePic:{
        type: String,
        required: 'This field is required.'
    },
   Time:{
        type: String,
        required: 'This field Time is required.'
    }

});

PostSchema.statics.GetPosts = function (OwnerEmail,Friends, callback) {
    //console.log("GetPosts ", OwnerEmail,  "FRIENDS ", Friends );
    Post.find({})
        .exec(function (err, FoundPosts) {
            if (err) {
                return callback(err)
            } else if (!FoundPosts) {
                var err = new Error('profile not found.');
                err.status = 401;
                return callback(err);
            }
           //ALL posts w/o friends  Friends;

            var resultset = []
            for ( i=0 ; i<FoundPosts.length ; i++ )
            {
                    
                  
                        if( FoundPosts[i].CreaterEmail==OwnerEmail)
                        {
                            resultset.push(FoundPosts[i]);
                        }


            }
    //        console.log("MY POSTS  ",resultset);

            for ( i=0 ; i<FoundPosts.length ; i++ )
            {
                    
                    for( j=0 ; j<Friends.length; j++)
                    {
                        if(FoundPosts[i].CreaterEmail==Friends[j] )
                        {
                            resultset.push(FoundPosts[i]);
                        }

                    }

            }
//            console.log("MY and other prople POSTS  ",resultset);

            //console.log("ALL posts before friends ",resultset);
        /*    if(Friends.length==0)
            {   for ( i=0 ; i<FoundPosts.length ; i++ )
                {
                    
                        if( FoundPosts[i].CreaterEmail==OwnerEmail  )
                        {
                            resultset.push(FoundPosts[i]);
                        }


                }
            }
*/
       //   console.log("ALL  indiide func posts ",resultset);

            return callback(null, resultset);
        });
        
}

PostSchema.statics.CreatePost = function (req, callback) {
    var d = new Date();
    date=
    Post1 = new Post();
    Post1.CreaterEmail=req.body.CreaterEmail;
    Post1.Message=req.body.Message;
    Post1.FullName=req.body.FullName;
    Post1.ProfilePic=req.body.ProfilePic;

    Post1.Time=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();

    Post1.save((err, doc) => {
 
         if (!err)
         return callback(null, Post1); 
         else {
             console.log('Error during Connection record insertion : ' + err);
             var err = new Error('Connection Error insertion.');
             err.status = 401;
             return callback(err);
         }
     });
   }



//mongoose.model('users', usersSchema);
var Post = mongoose.model('post', PostSchema);
module.exports = Post;
/*

 var resultset = [];
                            const post1 = await Post.find({})//get all posts
                            for (i = 0; i < post1.length; i++) {
                                resultset.push(post1[i])
                            }
*/




