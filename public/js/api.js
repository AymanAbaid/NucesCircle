
$(document).ready(function(){

$('#Delete').on('click', function(event){
    console.log("---------2---------------------Delete ");
    event.preventDefault();//prevent from reloading 
     var  ID=$('#DeleteID').val(); //createInput.val('');
     if(!ID)
     {
       alert("For Deletion You have to give ID of the user")
     }
     else{

   url_="/NucesCircle/api/user/"+ID;
   
     $.ajax({
       url:url_,
       method:'DELETE',
       contentType:'application/json',
       data: JSON.stringify({
           id:ID 
       }),
       sucess:function(response){  
       }
   
       })

      }

       

})
})

$('#Edit').on('click', function(event){
  console.log("---------2---------------------Edit ");
  event.preventDefault();//prevent from reloading 
   var  ID=$('#EditID').val(); //createInput.val('');
   var  Fname_=$('#EditFName').val(); //createInput.val('');
   var  Lname_=$('#EditLName').val(); //createInput.val('');

   if(!ID)
   {
     alert("For Editing a userinformation  You have to give ID of the user")
   }
   else{

 url_="/NucesCircle/api/edituser/"+ID;
 
   $.ajax({
     url:url_,
     method:'POST',
     contentType:'application/json',
     data: JSON.stringify({
         FName: Fname_,
         LName: Lname_

     }),
     sucess:function(response){  
     }
 
     })

    }

     

})
$(document).ready(function(){
$('#Create').on('click', function(event){


   event.preventDefault();//prevent from reloading 
   var  Fname_=$('#CreateFName').val(); //createInput.val('');
   var  Lname_=$('#CreateLName').val(); //createInput.val('');
   var  Email=$('#CreateEmail').val(); //createInput.val('');
   var  Password=$('#Password').val(); //createInput.val('');

   if(!Lname_|| !Fname_ || !Email|| !Password )
   {
     alert(" User Creation: Field Empty")
   }
   else if(!ValidateEmail($('#CreateEmail').val()  ) )
   {
     //alert(" User Creation:  Invalid Email ")
   }
   else{
    url_="/NucesCircle/api/user/";
 
   $.ajax({
     url:url_,
     method:'POST',
     contentType:'application/json',
     data: JSON.stringify({
         FName: $('#CreateFName').val(),
         LName: $('#CreateLName').val() , 
         Email: $('#CreateEmail').val() ,
         Password: $('#Password').val()

     }),
     sucess:function(response){  
     }
 
     })

    }

     

})
})


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}