/*Hompage JavaScript File Place variables and functions in this file */

/*So that each dropdown bar selection is checked*/
function scoCheck(){
   var selBox = document.getElementById("schoolSel");
   var txtLoc = document.getElementById("locResp");


   if (selBox.value != "Rensselaer Polytechnic Institute"){
      txtLoc.innerHTML= "Sorry this University is not currently supported";
      $("#locResp").css('margin-bottom', '0');

      //does to both
      $(".mainBut").removeAttr('href'); 
      $(".mainBut").css('opacity', '0.5'); 
      $(".mainBut").removeAttr('id'); 
      $(".mainBut").removeAttr('onclick'); 

      $("#supCourse").css('opacity', '0.75');
      $("#supCourse").removeAttr('href');
      $(".confLink").css('opacity', '0.75');
      $(".confLink").removeAttr('onclick');
      


   }else{
      txtLoc.innerHTML = ""; 
      //so that entire div doesn't change when text appears/disappears
      $("#locResp").css('margin-bottom', '27px');

      
      $(".mainBut").css('opacity', '1');

      var elms = $(".mainBut"); 
      elms[0].id = 'findEx';
      elms[0].href = 'pages/findExams/findexams.html';
      elms[1].id= 'confEm';
      $("#confEm").attr('onclick', "confEm();");
      $("#supCourse").css('opacity', '1');
      $("#supCourse").attr('href', "pages/courseList/courseList.html");
      $(".confLink").css('opacity', '1');
      $(".confLink").attr('onclick', "confEm();");
   }
}