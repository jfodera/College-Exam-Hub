/*JS File for each wzM home page*/

$(document).ready(function() {

   // make sure email is confirmed in order to rate
   //Function for if email not confirmed
   if (sessionStorage.getItem('isConfirmed') != null) {
      $("#leaveReview").css('visibility', 'visibile');
   }else{
      // alert("hit"); 
      $("#leaveReview").css('visibility', 'hidden');
   }



   //for consistency and ability to use for all types
   var prevUrl = document.referrer;
   var fname = ""
   if(prevUrl.substring(prevUrl.length-5, prevUrl.length) == ".html"){
     fname = prevUrl.substring(prevUrl.lastIndexOf('/') + 1, prevUrl.length-5);
   }else{
     fname = prevUrl.substring(prevUrl.lastIndexOf('/') + 1, prevUrl.length);
   }

   $('#topBut').attr('href', prevUrl);
   
   //finds and reads in their specific exam info and outputs it using ajax, works with any course or any exam. all needs is json 
   $.ajax({
      type: "GET",
      url: "../" + fname + ".json", 
      dataType: "json", 
      success: function (jsonData){
         //plus one to not include slash
         var wholeUrl = window.location.pathname;
         var fname = ""
         if(wholeUrl.substring(wholeUrl.length-5, wholeUrl.length) == ".html"){
           fname = wholeUrl.substring(wholeUrl.lastIndexOf('/') + 1, wholeUrl.length-5);
         }else{
          fname = wholeUrl.substring(wholeUrl.lastIndexOf('/') + 1, wholeUrl.length);
         }
         $.each(jsonData.exams, function(i, exam){
            if(exam.examName.substring(0,exam.examName.length-4) == fname){
               //adding info from only that exam to page

               //cause I'm lazy and I don't wanna type it every time
               $('title').html(exam.examTitle);

               //filling preview
               $('iframe').attr('src', "../rawExams/" + exam.examName);
               $('h1').html(exam.examTitle); 
               $('#rating').html(exam.rating + "/5");
               //getting stars
               for (var c = 0; c < 5; c++) {
                  if (c + 0.5 <= exam.rating) {
                      $('#stars').append('<img src=\"../../../../resources/whiteFull.png\">');
                  } else {
                     $('#stars').append('<img src=\"../../../../resources/whiteEmpt.svg.png\">');
                  }
              }

              if(!exam.examType.includes("final")){
               $('#cat').html("Exam " + exam.examType);
              }else{
               $('#cat').html(exam.examType);
              }

              $('#numRat').html(exam.numRatings);
              $('#year').html(exam.examYear);
            } 
         });

      },
      //error section taken directly from 'lab7 solved.js' example
      error: function(msg) {
      	// there was a problem
      	alert("There was a problem: " + msg.status + " " + msg.statusText);
    	}
   });
   //adding a rating
   var stars = document.querySelectorAll("#leaveReview img");
   stars = Array.from(stars);
   var rating = 0;
   $(stars).each(function() {
      $(this).on("click", function() {
         rating = stars.indexOf(this) + 1;
         $(stars).each(function() {
            if (stars.indexOf(this) < rating) {
               this.src = "../../../../resources/star-1989-13270-550x550.png";
            } else {
               this.src = "../../../../resources/800px-Five-pointed_star.svg.png";
            }
         });
      });
  });
  //display the rating you left
  $("#leaveReview button").on("click", function() {
      if (rating > 0) {
         $("#displayRating").html("You rated this exam " + rating + "/5");
      }
  });
});