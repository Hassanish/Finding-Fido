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
        // Creating a variable to shorten path to get to dog info
        var petInfo = data.petfinder.pet
        console.log(petInfo);
        // Var to determine name of the pet
        var petName = petInfo.name.$t;
        console.log(petName);
        // Var to determine age of the pet 
        var petAge = petInfo.age.$t;
        console.log(petAge);
        // Var to determine gender of the pet
        var petGender = petInfo.sex.$t;
        if(petGender == "M"){
          petGender = "Male"
        } else {
          petGender = "Female"
        };
        console.log(petGender);
        // Var to determine the breed of the pet. If multiple breeds, set the first value equal to the breed value
        if(petInfo.breeds.breed[0] != undefined){
          var petBreed = petInfo.breeds.breed[0];
          petBreed = petBreed.$t;
          console.log(petBreed);
        } else {
          var petBreed = petInfo.breeds.breed.$t;
          console.log(petBreed);
        };
        // Changing pit bull terrier to AKC name
        if(petBreed =="Pit Bull Terrier"){
          petBreed = "American Staffordshire Terrier"
        };
        //Splitting the bread in separate strings
        var breedSplit = petBreed.split(" ");
        var breedSite = "http://www.akc.org/dog-breeds/"
        //Add each string to the URL to link to the AKC site with the correct page
        for(i=0; i<breedSplit.length; i++){
          var breed = breedSplit[i];
          if(i<breedSplit.length -1){
            breedSite+=breed+"-";
          }else{
            breedSite+=breed;
          };
        };
        console.log(breedSite);
        
        // Descr from shelter
        var petDesc = petInfo.description.$t;
     
        // Zip code of shelter
        var shelterZip = petInfo.contact.zip.$t;

        // Email contact of shelter
        var shelterEmail = petInfo.contact.email.$t; 

        // Phone number of the shelter
        var shelterPhone = petInfo.contact.phone.$t;

        // Loading photos of the dog into an array
        var dogPhotos = [];
        for(i=0; i<petInfo.media.photos.photo.length; i++){
          var currentPhoto = petInfo.media.photos.photo[i];
          dogPhotos.push(currentPhoto.$t);
        };
        console.log(dogPhotos);
      
      },
      error : function (request, error)
      {
        alert("Request: "+JSON.stringify(request));
      }
    })
  };





animal();

});
