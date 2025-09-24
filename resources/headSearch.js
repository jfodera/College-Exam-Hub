/*Search bar related Javascript*/ 

/*Clears the value of the searchbar element.*/
function clearField(){
   var element = document.getElementById("searchBar");
   element.value = ""; 
}

/*When a query is entered by the user, this function compares it to the possible options and if there is a match, has the user 
travel there. Passes in the event in order to prevent the reload.*/ 
function travel(event){
   //preventing reload
   event.preventDefault();

   var searchVal = $('#searchBar').val();

   if(searchVal == "Biology"){
      //must be absolute so works on every page
      //rel: pages/coursePages/BIOL-1010/introBiol.html 
      window.location.href = 'https://ceh.josephfodera25-bf8.workers.dev/pages/coursePages/BIOL-1010/introBiol.html';
   }else if(searchVal == "Intro to Computer Science"){
      //rel: pages/coursePages/CSCI-1100/computerSci.html
      window.location.href = 'https://ceh.josephfodera25-bf8.workers.dev/pages/coursePages/CSCI-1100/computerSci.html';
   }else if(searchVal == "Data Structures"){
      //rel: pages/coursePages/CSCI-1200/datastructures.html 
      window.location.href = 'https://ceh.josephfodera25-bf8.workers.dev/pages/coursePages/CSCI-1200/datastructures.html';
   }else if(searchVal == "Physics 1"){
      //rel: pages/coursePages/PHYS-1100/physics1.html
      window.location.href = 'https://ceh.josephfodera25-bf8.workers.dev/pages/coursePages/PHYS-1100/physics1.html';
   }else{
      $('#searchBar').val("");
      alert("No Results Found");
   }
}



$(document).ready(function () {

/*Autocomplete styling and functionalities*/
var classes = ["Biology", "Intro to Computer Science", "Data Structures", "Physics 1"];

/*So that this function is always called*/
autoComp(document.getElementById("searchBar"), classes);

function autoComp(inpElem, classz){
   var curFoc; 

   //whenever value changed this is called
   inpElem.addEventListener("input", function()  {


      //whats in textbox
      var val = this.value; 
      //val is empty 
      closeAllLists();
      if(!val){
         return false;
      }
      
      curFoc = -1;

      //div housing list of suggestions 
      var house = document.createElement("DIV");
      house.setAttribute("class", "auto-items");
      //adds to autoHolder (not searchbar)
      this.parentNode.appendChild(house);


      //word comparisons for current input
      for(var i = 0; i < classz.length; i++){
         //if item starts with same letters, uppercase for consistency so that comparison is not case sensitive
         if(classz[i].substr(0,val.length).toUpperCase() == val.toUpperCase()){
            //creates box for said matching elem
            curBox = document.createElement("DIV");
            //makes sure matching highlighted
            curBox.innerHTML = "<strong>" + classz[i].substr(0,val.length) + "</strong>";
            //the rest
            curBox.innerHTML += classz[i].substr(val.length);

            //creates input item to hold array box val so that when clicked will transfer
            curBox.innerHTML += "<input type='hidden' value='" + classz[i] + "'>";

               //if someonw clicks on that div, change cal of their input 
            curBox.addEventListener("click", function() {
               //works because only one input in this specific div
               inpElem.value = this.getElementsByTagName("input")[0].value;
               closeAllLists();
               //so still on it when u select
               $('#searchBar').focus();
            });

            //adds this box to the div list
            house.appendChild(curBox);
         }

      }

      //incase no res 
      if(house.childElementCount == 0){
         house.remove(); 
      }

      /*Closes all of the seggestions*/
      function closeAllLists(){
         var autItems = document.getElementsByClassName("auto-items");
         for(var i = 0; i < autItems.length; i++){
            autItems[i].parentNode.removeChild(autItems[i]); 
         }
      }
      //doesn't show up when out of the seach bar
      document.addEventListener("click", function(){
         closeAllLists();
      });
   });
}
});
