
$('#Delete').on('submit', function(event){
    console.log("---------2---------------------post ");
    event.preventDefault();//prevent from reloading 
     var  ID=$('#DeleteID').val; //createInput.val('');
     console.log("---------2---------------------post ". ID);

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
})