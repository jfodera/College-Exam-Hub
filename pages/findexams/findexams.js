/*Drag and drop functions that handle user interactions with the page */

//only going to allow the functions to be executed when the whole html page is loaded 
$(document).ready(function () {
    //function to handle to force file to not open in a new tab and for events to happen once at a time
    function preventDefaultBehavior(event){
        event.preventDefault();
        event.stopPropagation();
    }

    //function to add visual effect of when file is inside the target box
    function handleDragEnter(event){
        preventDefaultBehavior(event);
        $('#dragDrop').addClass('whileOver');
    }

    //function to handle when a file is being dragged over the target box
    function handleDragOver(event){
        preventDefaultBehavior(event);
        //adding visual effect as well
        $('#dragDrop').addClass('whileOver');
    }

    //function to handle when a file is being dragged out of the box without being dropped
    function handleDragLeave(event){
        preventDefaultBehavior(event);
        //removing the visual effects on the file being inside the target box
        $('#dragDrop').removeClass('whileOver');
        //hiding the upload button because user did not drop the file inside 
        $('#uploadButton').hide();

    }

    //function to handle when file is dropped inside the target box
    function handleDrop(event){
        preventDefaultBehavior(event);

        //adjusting margin
        $('#mainSection').removeClass('mainSec');
        $('#mainSection').addClass('mainSecChange');
        
        //removing the content that is initially inside the box
        $('#dragDrop').removeClass('whileOver');

        //getting the file from the drag and drop event
        var file = event.originalEvent.dataTransfer.files[0];
    

        //gets the file name and puts it in the paragraph tag that has the id "fileName"
        var par = $('#fileName');
        par.empty();
        par.html(file.name);
        
        //showing the upload button so user can upload file that is dropped
        $('#uploadButton').show();

        //showing drop down so user can select from it for upload
        $('#options').prop('disabled', false);

        //hiding the contents inside the box so they can be replaced by the file information and file itself
        $('#ddSelect').hide();
        $('#fileAtr').show();
        $('#fileIcon').show();

    }

    //function to handle if the user wants to remove file and upload another file instead
    function clickRemove(event){
        //adjusting the page to look like how it used to be before file input
        $('#mainSection').removeClass('mainSecChange');
        $('#mainSection').addClass('mainSec');
        $('#fileAtr').hide();
        $('#ddSelect').show();
        $('#uploadButton').hide();
        $('#options').prop('disabled', true);
    }

    //function to handle if the user selected a course and uploading to the website
    function alertSuccess(event){
        var selectedOption = document.getElementById("options");
        //getting the options from the drop down for comparison
        var selectedByUser = selectedOption.value;

        //if the user selection is empty, meaning user didn't select a course
        if(selectedByUser == ""){
            //display alert and prevent page from reloading
            alert('Please select a course to upload exam to.');
            preventDefaultBehavior(event);
        }

        else{
            //if the user selected a valid course 
            alert("File Successfully Sent!");
        }
        //adjusting margin
        $('#mainSection').removeClass('mainSecChange');
        $('#mainSection').addClass('mainSec');

    }

    //this function will handle creating the same thing that happens when the user drags
    //and drops a file but instead, they choose a file from their computer
    function handleFindFilename(event) {
        //adjusting the margins so the page looks good
        $('#mainSection').removeClass('mainSec');
        $('#mainSection').addClass('mainSecChange');

        //getting the name of the file selected
        var fileName = event.target.files[0].name;
        
        //making sure to get the paragraph tag to put the name of file inside
        var par = $('#fileName');
        par.empty();
        par.html(fileName);

        //hiding and showing appropriate buttons
        $('#options').prop('disabled', false);
        $('#uploadButton').show();
        $('#ddSelect').hide();
        $('#fileAtr').show();
        $('#fileIcon').show();
    }

    //starting with the upload button hidden since no file has been dropped yet
    $('#uploadButton').hide();

    //starting with upload info hidden since no file has been dropped yet
    $('#fileAtr').hide();

    //starting with the file icon to be hidden since no file has been dropped yet
    $('#fileIcon').hide();

    //starting with drop down disabled
    $('#options').prop('disabled', true);


    //adding the event listeners corresponding to the function created to give full drag and drop functionality
    $(document).on('dragenter','#dragDrop',handleDragEnter);
    $(document).on('dragover','#dragDrop',handleDragOver);
    $(document).on('dragleave','#dragDrop',handleDragLeave);
    $(document).on('drop','#dragDrop',handleDrop);
    $(document).on('click', '#fileAtr', clickRemove);
    $(document).on('click','#uploadButton', alertSuccess);
    $(document).on('change', 'input[type="file"]', handleFindFilename);
});


/*Doc Ready Functions, specifically if email confirmed or not*/
$(document).ready(function () {
//Function for if email not confirmed
    if (sessionStorage.getItem('isConfirmed') != null) {
        $(".midpage").css('visibility', 'visibile');
    }else{
        $(".midpage").css('visibility', 'hidden');
    }
});