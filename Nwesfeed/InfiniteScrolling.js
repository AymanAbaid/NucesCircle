//GET ALLL POSTS
var currentIndexPost=3;
//window.currentIndexPost = currentIndexPost;

$(function(){
   
    $('#post').on('click',function(){

        console.log( " post button !" );
        var MainDiv = $('.Row4');
        MainDiv.html('');
        getNextPost(0 ,3);

      //  $('#Row4').append(getNextPost(0 ,5));
        var  createInput=$('#postBody'); 
        createInput.val('');
        console.log( " after post button !" );

      /* $.ajax({
            url:'/NucesCircle/post',
            contentType: 'application/json',
            success: function(response) {
                var MainDiv = $('.Row4');
                MainDiv.html('');
               var trHTML = '';
               console.log( " sucess !" );

               len = response.items.length;
               for( var i = 0;  i < len ; i++) {
                for(var prop in response.items[i]) {
                 //do something with jsonArray[i][prop], you can filter the prototype properties with hasOwnProperty
                 //alert(response.items[i][prop]);
                // alert(prop);
                }
        }

               response.items.forEach( function(items){

                if(response.CurrUser.Email== items.CreaterEmail )
                {
                trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+items._id+'><input type="hidden" id="Message" name="Message" value='+items.Message+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='+items.CreaterEmail+'>                                 <button class="update-button">UPDATE/PUT</button>\
                <button class="delete-button">DELETE</button></td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
                + items.ProfilePic + '></p><em> <a id="#aNameStyle">&nbsp;' + 
                items.FullName + '</a><em style="color : gray "><br>&nbsp;' + items.Time 
                + '</em></em><div class="post-body2"> <p style="  padding:  5px; text-align: left;">' + 
                items.Message +  ' </p></div></td></tr></table><br><br>';
                }
                else{
                    trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+items._id+'><input type="hidden" id="Message" name="Message" value='+items.Message+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='
                    +items.CreaterEmail+'> </td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
                + items.ProfilePic + '></p><em> <a id="#aNameStyle">&nbsp;' + 
                items.FullName + '</a><em style="color : gray "><br>&nbsp;' + items.Time 
                + '</em></em><div class="post-body2"> <p style="  padding:  5px; text-align: left;">' + 
                items.Message +  ' </p></div></td></tr></table><br><br>';
                }

            });  
            $('#Row4').append(trHTML);
 var  createInput=$('#postBody'); 
        createInput.val('');



            }



        }) 
        console.log( "Error");

    });
    */

});
});

function getNextPost(currIndex ,count,flag ) {
    var trHTML = '';
    console.log( "  getNextPost !" , currIndex," ",count );
    $(function(){
    $.ajax({
        url:'/NucesCircle/post',
        contentType: 'application/json',
        success: function(response)
         {
         console.log( " ajax sucess");
         //alert("window.currentIndexPost =",window.currentIndexPost,"   currIndex=",currIndex);

        // window.currentIndexPost=currIndex;
     //    console.log("window.currentIndexPost =",window.currentIndexPost,"   currIndex=",currIndex);
            if(flag==1)
            {currIndex=currentIndexPost+1}
           len = response.items.length;
           currUserEmail=response.CurrUser.Email;
            lengthP=count+currIndex;
            
           for( var i = currIndex;  i < lengthP ; i++) {
            console.log( "  get req !" );

          // for(var prop in response.items[i]) 
           
            if(currUserEmail== response.items[i][CreaterEmail] )
            {
            trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+  response.items[i]["_id"]+'><input type="hidden" id="Message" name="Message" value='+  response.items[i]["Message"]+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='+response.items[i]["CreaterEmail"]+'>                                 <button class="update-button">UPDATE/PUT</button>\
            <button class="delete-button">DELETE</button></td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
            +  response.items[i]["ProfilePic"]  + '></p><em> <a id="#aNameStyle">&nbsp;' + 
            response.items[i]["FullName"] + '</a><em style="color : gray "><br>&nbsp;' + response.items[i]["Time"]
            + '</em></em><div class="post-body2"> <p style="  padding:  5px; text-align: left;">' + 
            response.items[i]["Message"] +  ' </p></div></td></tr></table><br><br>';
            }
            else{
               // alert(  "hell" +response.items[i]["CreaterEmail"] );
               trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+  response.items[i]["_id"]+'><input type="hidden" id="Message" name="Message" value='+  response.items[i]["Message"]+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='+response.items[i]["CreaterEmail"]
               +'></td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
               +  response.items[i]["ProfilePic"]  + '></p><em> <a id="#aNameStyle">&nbsp;' + 
               response.items[i]["FullName"] + '</a><em style="color : gray "><br>&nbsp;' + response.items[i]["Time"]
               + '</em></em><div class="post-body2"> <p style="  padding:  5px; text-align: left;">' + 
               response.items[i]["Message"] +  ' </p></div></td></tr></table><br><br>';
            
        }


             //do something with jsonArray[i][prop], you can filter the prototype properties with hasOwnProperty
             //alert(response.items[i][prop]);
            // alert(prop);
            
    }


    $('#Row4').append(trHTML);

          

        }



    }) 
    
})
console.log( "Resulthtml " , trHTML);
return trHTML;
}







//on load
$( document ).ready(function() {
    console.log( "on page load !" );
    $('#post').click();

});


//window.currentIndexPost=3;

$(document).ready(function() {
  //  currentIndexPost=currentIndexPost+1;

     //alert(currentIndexPost);
    var win = $(window);
    // Each time the user scrolls
    win.scroll(function() {
        
        // End of the document reached?
        if ($(document).height() - win.height() == win.scrollTop()) {
            $('#loading').show();
           alert("Document end ", currentIndexPost);
           getNextPost(currentIndexPost ,1);
           window.currentIndexPost=window.currentIndexPost+1;
            // Uncomment this AJAX call to test it
            /*
            $.ajax({
                url: 'get-post.php',
                dataType: 'html',
                success: function(html) {
                    $('#posts').append(html);
                    $('#loading').hide();
                }
            });
            */


          //  $('#posts').append(randomPost());
          //  $('#loading').hide();
        }
    });
});























//create post
$('#create-post').on('submit', function(event){

 event.preventDefault();//prevent from reloading 
  var  createInput=$('#postBody'); //createInput.val('');
  var  CreaterEmail=$('#CreaterEmail');
  var  FullName=$('#FullName');
  var  ProfilePic=$('#ProfilePic');
  var Msg=createInput.val();
  var Purifiedmsg=Msg.replace(/</i,"<.");
  var Purifiedmsg=Purifiedmsg.replace(/>/i,".>");


  $.ajax({
    url:'/NucesCircle/post',
    method:'POST',
    contentType:'application/json',
    data: JSON.stringify({
        Message:Purifiedmsg ,
        CreaterEmail:CreaterEmail.val() ,
        FullName:FullName.val() ,
        ProfilePic :ProfilePic.val() 
    }),
    sucess:function(response){
        console.log(response);
        $('#post').click();

    }

    })


})
//UPDATE POST
$('#Row4').on('click', '.update-button', function() {
    
    if($("#Row4").find('table').length) {
        // table exists
        var Email='' 
        var id=' '
        var prevMsg=''
       // console.log( " table exists "+ $("#Row4").find('table').html()  )
        
        $(this).closest('tr').find("[name^=CreaterEmail]").each(function() { //getting email 
                Email=this.value
        });
        $(this).closest('tr').find("[name^=postID]").each(function() { //getting id and email        
                id=this.value
        });

       // $(this).closest('tr').find("[name^=Message]").each(function() 
        //{ //getting id and email    
            //$(this).closest('tr').find("input").each(function() { //getting id and email 
        
            prevMsg = $(this).closest('table').find(".post-body2").text();
           // });
        
//$(this).closest('table').find("[name^=Message]").replaceWith( "<h2>New headinge</h2>" );
          //  prevMsg=this.value
     console.log( "prevMsg",prevMsg)
     console.log( $(this).closest('table').find(".post-body2").html('') )
        $(this).closest('table').find(".post-body2").replaceWith( '<input type="text" id="Edited" name="Message" style=" padding:0px; width:100% ; height:100px; " required="required"> <br><br><button id="SavePost" type="submit" style="width:150px ;color: white ;background-color: rgb(139, 40, 115) ;">Save</button>' );
       $(this).closest('table').find("#Edited").val(prevMsg);
       

      

    }





});
//EDIT
$('.Row4').on('click', '#SavePost', function() {
  
    if($("#Row4").find('table').length) {
        // table exists
        var id=' '
        if($(this).html()=="Save"  )
        {
        console.log( " table exists "+ $(this).html() )
        
    
        $(this).closest('table').find("[name^=postID]").each(function() { //getting id             
                    id=this.value
        });

        newMessage=$(this).closest('table').find("#Edited").val();
        var Purifiedmsg=newMessage.replace(/</i,"<.");
        Purifiedmsg=Purifiedmsg.replace(/>/i,".>");
        $.ajax({
            url: '/NucesCircle/EditPost/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newMessage: Purifiedmsg }),
            success: function(response) {
                $('#post').click();
            }

    
        });
        console.log( $(this).closest('table').find(".post-body2").html('') )

    }
       } 
    else {
        // no table found
        console.log( " no table found "  )

       }
       console.log( " Deleted "  )

       $('#post').click();
});
//Delet POST
$('.Row4').on('click', '.delete-button', function() {
  
    if($("#Row4").find('table').length) {
        // table exists
        var Email='' 
        var id=' '
        console.log( " table exists "+ $("#Row4").find('table').html()  )
        
        $(this).closest('tr').find("[name^=CreaterEmail]").each(function() { //getting email 
                Email=this.value
        });
        $(this).closest('tr').find("[name^=postID]").each(function() { //getting id and email    
        //$(this).closest('tr').find("input").each(function() { //getting id and email 
    
                id=this.value
            });
            console.log( " ID and Email " +id +" "+ Email);
            $.ajax({
                url: '/NucesCircle/DeletePost/' + id,//+'/'+,
                method: 'DELETE',
                contentType: 'application/json',
                success: function(response) {
                    console.log(response);
                }
            }); 

       } 
    else {
        // no table found
        console.log( " no table found "  )

       }
       console.log( " Deleted "  )

       $('#post').click();
});





if(response.CurrUser.Email== items.CreaterEmail )
{
trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+items._id+'><input type="hidden" id="Message" name="Message" value='+items.Message+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='+items.CreaterEmail+'>                                 <button class="update-button">UPDATE/PUT</button>\
<button class="delete-button">DELETE</button></td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
+ items.ProfilePic + '></p><em> <a id="#aNameStyle">&nbsp;' + 
items.FullName + '</a><em style="color : gray "><br>&nbsp;' + items.Time 
+ '</em></em><div class="post-body2"> <p style="  padding:  5px; text-align: left;">' + 
items.Message +  ' </p></div></td></tr></table><br><br>';
}
else{
    trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+items._id+'><input type="hidden" id="Message" name="Message" value='+items.Message+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='
    +items.CreaterEmail+'> </td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
+ items.ProfilePic + '></p><em> <a id="#aNameStyle">&nbsp;' + 
items.FullName + '</a><em style="color : gray "><br>&nbsp;' + items.Time 
+ '</em></em><div class="post-body2"> <p style="  padding:  5px; text-align: left;">' + 
items.Message +  ' </p></div></td></tr></table><br><br>';
}



$(function(){
    console.log( "on post load !" );

    $('#post').on('click',function(){

       // console.log(response.items);


        $.ajax({
            url:'/NucesCircle/post',
            contentType: 'application/json',
            success: function(response1) {
                var MainDiv = $('.Row4');
                MainDiv.html('');
                var trHTML = '';
                totalPosts=response1.items.length;
                for( i=0 ; i<totalPosts ; i++)
                {
                    Posts.push(response1.items[i]);

                }
         
            
            console.log( " Posts " ,Posts.length );

            CurrUser_.push(response1.CurrUser);
            console.log( " totalPosts " ,totalPosts );

           // getNextPost(0,3 , Posts);

            }
        


        })    
   
    })
    
})