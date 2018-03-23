$(document).ready(function(){

var petInfo;
var petName;
var petAge;
var petGender;
var petBreed;
var petSize;
var breedSite;
var petDesc;
var petNeuter = "Unknown";
var petShots = "Unknown";
var petKids = "Unknown";
var petHouseTrained = "Unknown";
var petCats = "Unknown";
var petSpecial = "Unknown";
var shelterEmail;
var shelterPhone;
var shelterZip;
var shelterFullAddress;
var dogPhotos =[];

// Creating the animal function to pull all relevant information from the Petfinder API
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
        petInfo = data.petfinder.pet
        console.log(petInfo);
        // Name of the pet
        petName = petInfo.name.$t;

        // Age of the pet 
        petAge = petInfo.age.$t;

        // Gender of the pet
        petGender = petInfo.sex.$t;
        // Converting letter into full word
        if(petGender == "M"){
          petGender = "Male"
        } else {
          petGender = "Female"
        };

        // Var to determine the breed of the pet. If multiple breeds, set the first value equal to the breed value
        if(petInfo.breeds.breed[0] != undefined){
          petBreed = petInfo.breeds.breed[0];
          petBreed = petBreed.$t;
          console.log(petBreed);
        } else {
          petBreed = petInfo.breeds.breed.$t;
          console.log(petBreed);
        };
        // Changing pit bull terrier to AKC name
        if(petBreed =="Pit Bull Terrier"){
          petBreed = "American Staffordshire Terrier"
        };
        //Splitting the bread in separate strings
        var breedSplit = petBreed.split(" ");
        breedSite = "http://www.akc.org/dog-breeds/"
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

        // Breed size 
        petSize = petInfo.size.$t;

        // Converting size into full word
        if(petSize == "L"){
          petSize = "Large";
        } else if (petSize == "M"){
          petSize = "Medium";
        } else if (petSize == "S"){
          petSize = "Small";
        } else {
          petSize = "Extra Large"
        };

        // Descr from shelter
        petDesc = petInfo.description.$t;
     
        // Background info on dog (neutered, vaccinated, good with kids, housetrained)
        var petOptions = petInfo.options.option;
        console.log(petOptions);
        if(Array.isArray(petOptions)){
          for(i=0; i<petOptions.length; i++){
            if(petOptions[i].$t == "altered"){
              petNeuter = "Neutered/Spayed";
            };
            if(petOptions[i].$t == "hasShots"){
              petShots = "Vaccinated";
            };
            if(petOptions[i].$t == "noKids"){
              petKids = "Not good with children";
            };
            if(petOptions[i].$t == "housetrained"){
              petHouseTrained = "House trained";
            };
            if(petOptions[i].$t == "noCats"){
              petCats = "Not good with cats";
            };
            if(petOptions[i].$t == "specialNeeds"){
              petSpecial = "This dog has special needs. Please contact the shelter to learn more.";
            };
          };
        } else {
          if(petOptions.$t == "altered"){
            petNeuter = "Neutered/Spayed";
          } else if (petOptions.$t == "hasShots"){
            petShots = "Vaccinated";
          }else if(petOptions.$t == "noKids"){
            petKids = "Not good with children";
          }else if(petOptions.$t == "housetrained"){
            petHouseTrained = "House trained";
          }else if(petOptions.$t == "noCats"){
            petCats = "Not good with cats";
          }else if(petOptions.$t == "specialNeeds"){
            petSpecial = "This dog has special needs. Please contact the shelter to learn more.";
          };
        }

        // Zip code of shelter
        shelterZip = petInfo.contact.zip.$t;

        // Full address of shelter"
        if(petInfo.contact.address1.$t != undefined){
          shelterFullAddress = petInfo.contact.address1.$t + ", " + petInfo.contact.city.$t + ", "
           + petInfo.contact.state.$t + ", " + shelterZip;
        } else {
          shelterFullAddress = shelterZip;
        };

        console.log(shelterFullAddress);

        // Email contact of shelter
        shelterEmail = petInfo.contact.email.$t; 

        // Phone number of the shelter
        shelterPhone = petInfo.contact.phone.$t;

        // Loading photos of the dog into an array
        dogPhotos = [];
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

  function reset(){
    petInfo= " ";
    petName = " ";
    petAge= " ";
    petGender= " ";
    petBreed= " ";
    petSize= " ";
    breedSite= " ";
    petDesc= " ";
    petNeuter = "Unknown";
    petShots = "Unknown";
    petKids = "Unknown";
    petHouseTrained = "Unknown";
    petCats = "Unknown";
    petSpecial = "Unknown";
    shelterEmail= " ";
    shelterPhone= " ";
    shelterZip= " ";
    shelterFullAddress= " ";
    dogPhotos =[];
  }
  
  animal();
  reset();

// On button click, run the following fuctions
$(".button").on("click", function(){
  animal();
})

});
