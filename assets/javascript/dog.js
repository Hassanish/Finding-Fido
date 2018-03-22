$(document).ready(function(){

// Creating the animal function to pull information from the Petfinder API
function animal (){
  var apiKey = "359eebb45ac45f0d4449411094f651f8";
  var queryURL = "http://api.petfinder.com/pet.getRandom?format=json&output=full&animal=dog&key=" + apiKey;

    $.ajax({
      type : 'GET',
      data : {},
      url : queryURL+'&callback=?' ,
      dataType: 'json',
      success : function(data) { 
        console.log(data);
        // Creating a variable to shorten path to get to dog info
        var petInfo = data.petfinder.pet
        console.log(petInfo);
        // Var to determine age of the pet 
        var petAge = petInfo.age.$t;
        console.log(petAge);
        // Var to determine the breed of the pet. If multiple breeds, set the first value 
        // equal to the breed value
        if(petInfo.breeds.breed[0] != undefined){
          var petBreed = petInfo.breeds.breed[0];
          petBreed = petBreed.$t;
          console.log(petBreed);
        } else {
          var petBreed = petInfo.breeds.breed.$t;
          console.log(petBreed);
        };
        // Finding zip code of shelter
        var shelterZip = petInfo.contact.zip.$t;
        console.log(shelterZip);
        // Finding the email contact of shelter
        var shelterEmail = petInfo.contact.email.$t; 
        console.log(shelterEmail);
        // Loading photos of the dog into an array
        var dogPhotos = [];
        for(i=0; i<petInfo.media.photos.photo.length; i++){
          var currentPhoto = petInfo.media.photos.photo[i];
          dogPhotos.push(currentPhoto.$t);
          console.log(dogPhotos);
        }
      },
      error : function (request, error)
      {
        alert("Request: "+JSON.stringify(request));
      }
    })
  };





animal();

});
