/*JS File for each course home page*/

$(document).ready(function() {
    
    // gets filename for read
    var wholeUrl = window.location.pathname;
    var fname = ""
    if(wholeUrl.substring(wholeUrl.length-5, wholeUrl.length) == ".html"){
      fname = wholeUrl.substring(wholeUrl.lastIndexOf('/') + 1, wholeUrl.length-5);
    }else{
      fname = wholeUrl.substring(wholeUrl.lastIndexOf('/') + 1, wholeUrl.length);
    }



    // examArr stores information about every exam in the course's JSON file
    var examArr = [];

    // displays info about every exam in examArr
    function displayExams() {
        var output = "";
        // check if examArr is empty
        if (examArr.length == 0) {
            output += "<h1>No exams!</h1>";
        } else {
            // for each exam, makes a button that displays information about that particular exam by writing HTML to output
            $.each(examArr, function() {
                output += "<a class=\"exam\" href=\"" + this.examPage + "\">" + "<button><h3>" + this.examName + "</h3>";
                output += "<h4>Rating:</h4>";
                output += "<div class=\"stars\">";
                // this loop adds stars displaying the rating
                for (var i = 0; i < 5; i++) {
                    if (i + 0.5 <= this.rating) {
                        output += "<img src=\"../../../resources/star-1989-13270-550x550.png\">";
                    } else {
                        output += "<img src=\"../../../resources/800px-Five-pointed_star.svg.png\">";
                    }
                }
                output += "</div>";
                output += "<h4>" + this.rating + "/5</h4>";
                output += "<p>Year: " + this.examYear + ", "+ this.numRatings + " rating";
                if (this.numRatings != 1) {
                    output += "s";
                }
                output += "</p></button></a>";
            });
        }
        //inserts output into div of class exams
        $(".exams").html(output);
    }

    $.ajax({
        type: "GET",
        // for ability to use any page
        url: fname + ".json",
        dataType: "json",
        success: function (jsonData) {
            examArr = jsonData.exams;

            // changes what exams are showing based on examType.value (what exams the user chooses to see), then
            // displays them; this changes examArr
            $("#examType").change(function() {
                examArr = jsonData.exams;
                var type = $(this).val();
                if (type != "all") {
                    examArr = examArr.filter(function(exam) {
                        return exam.examType === type;
                    });
                }
                displayExams();
            });

            // sorts exams shown based on sortBy.value (how user wants to sort them), then displays them; this
            // sorts examArr in different ways
            $("#sortBy").change(function() {
                if ($(this).val() === "mostRecent") {
                    // examArr.sort((a,b) => b.examYear - a.examYear);
                    examArr.sort(function(a,b) {
                        return b.examYear - a.examYear;
                    });
                } else if ($(this).val() === "rating") {
                    // examArr.sort((a,b) => b.rating - a.rating);
                    examArr.sort(function(a,b) {
                        return b.rating - a.rating;
                    });
                } else if ($(this).val() === "mostPopular") {
                    // examArr.sort((a,b) => b.numRatings - a.numRatings);
                    examArr.sort(function(a,b) {
                        return b.numRatings - a.numRatings;
                    });
                }
                displayExams();
            });

            // displays exams when page first loads
            // examArr.sort((a,b) => b.examYear - a.examYear);
            examArr.sort(function(a,b) {
                return b.examYear - a.examYear;
            });
            displayExams();
            
        }, error: function(msg) {
            alert("Error: " + msg.status + " " + msg.statusText);
        }
    });



});