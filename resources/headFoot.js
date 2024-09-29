/*Header-Footer JS File*/

/*Just updates when the page was html page located on was last modified*/
function lastMod(){
   var element = document.getElementById("date");
   var text = document.lastModified;
   element.innerHTML += text;
}

/*Confirm email functionality*/
function confEm(){
   sessionStorage.setItem('isConfirmed', 'true'); 
   location.reload(); 
}




$(document).ready(function () {


   //conf email-> make sure formatting is right based on if email is confirmed or not` `
   if (sessionStorage.getItem('isConfirmed') != null) {
      $('.confLink').remove();

      var newp = document.createElement("DIV");
      newp.setAttribute("class", "welMike");
      newp.setAttribute("id", "mikeIn");
      newp.innerHTML = "Welcome <br> mike@rpi.edu!"; 

      document.getElementById('header').appendChild(newp); 
   } 

});