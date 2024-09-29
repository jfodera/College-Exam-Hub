//This javascript will read in the JSON file containing course list info and display it in the courseList.html page

//performing the function only if the html is ready
$(document).ready(function() {

    //using the the jQuery AJAX function to request data from a server without reloading entire page
       $.ajax({
            //get request which is used to get data from a server
            type: "GET",
            //specifies the url from where to get the data
            url: "courseList.json",
            //specifying the type of data that the server expect to get 
            dataType: "json",

            //function executes only if the AJAX request is succesful
            success: function(responseData, status){
            
            //variable that will hold every subject and its courses
            var courseItems = "";  
            
            //looping through the json's courses array going subject by subject
            $.each(responseData.courses, function(i, courses) {
                
                //looping through each subject's courses array
                $.each(courses, function(subject, exams) {
                    
                    //getting the name of the subject 
                    var subjectName = subject;
                    
                    //adding the subject title to be the heading of its bubble with courses
                    courseItems += '<h2 id="subjectTitle"> ' + subjectName +' </h2>';
                    
                    //creating the bubble that will store the courses list
                    courseItems += '<div class = "bubble"><ul>';
                    
                    //looping through the array of courses (course1, course2, etc) 
                    $.each(exams, function(i, examInfo) {
                       
                        //looping through each course number array and getting the name of the course and its link
                        $.each(examInfo, function(coursePos, courseVal) {
                            //getting the course name
                            var courseName = courseVal[0];
                            
                            //getting the course link
                            var courseLink = courseVal[1];
                            
                            //adding it to the unordered list for display inside the bubble
                            courseItems += '<li><a href="' + courseLink + '">' + courseName + '</a></li>';
                        });
                    }); 
                    //closing the bubble that contains all the courses supported
                    courseItems+= '<ul></div>';
                });    
            });

            //adding the courseItems generated from the json file to the html courseInfo div
            $('#courseInfo').html(courseItems);
            }, 

            //print error message just in case we get an error  
            error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
            }
        
    });	

});