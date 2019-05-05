//GET ALLL POSTS
$(function(){

    $('#post').on('click',function(){

       // console.log(response.items);


        $.ajax({
            url:'/NucesCircle/post',
            contentType: 'application/json',
            success: function(response) {
                var MainDiv = $('.Row4');
                MainDiv.html('');
               var trHTML = '';


               response.items.forEach( function(items){

                if(response.CurrUser.Email== items.CreaterEmail )
                {
                trHTML +='<table  id="Education" ><tr><td class="id"><input type="hidden" id="postID" name="postID" value='+items._id+'><input type="hidden" id="Message" name="Message" value='+items.Message+'><input type="hidden" id="CreaterEmail" name="CreaterEmail" value='+items.CreaterEmail+'>                                 <button class="update-button">UPDATE/PUT</button>\
                <button class="delete-button">DELETE</button></td></tr><tr><td><p><img alt="profile picture" width="52" height="52" align="left" src=' 
                + items.ProfilePic + '></p><em> <a id="#aNameStyle">&nbsp;' + 
                items.FullName + '</a><em style="color : gray "><br>&nbsp;' + items.Time 
                + '</em></em><div class="post-body2"> <p class="PostP"  >' + 
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

});
//on load
$( document ).ready(function() {
    console.log( "on page load !" );
    $('#post').click();

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





/*
            console.log( " ID and Email " +id +" "+ Email);
            $.ajax({
                url: '/products/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ newName: newName }),
                success: function(response) {
                 
                }
            }); 

       } else {
        // no table found
        console.log( " no table found "  )

       }
       console.log( " Deleted "  )

       $('#post').click();
       */