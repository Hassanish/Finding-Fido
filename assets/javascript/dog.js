// Initialize Firebase
var config = {
  apiKey: "AIzaSyBYi9sH72Uv9hFD--jiwoxQ5MEun8Vsw9k",
  authDomain: "finding-fido.firebaseapp.com",
  databaseURL: "https://finding-fido.firebaseio.com",
  projectId: "finding-fido",
  storageBucket: "",
  messagingSenderId: "89497676577"
};
firebase.initializeApp(config);

$(document).ready(function(){

// DEFINING GLOBAL VARIABLES
  var database = firebase.database();
  var petInfo;
  var petName;
  var petAge;
  var petId;
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
  var shelterID;
  var shelterName;
  var shelterCity;
  var shelterState;
  var shelterFullAddress;
  var dogPhotos =[];
  var apiKey = "359eebb45ac45f0d4449411094f651f8";
  var thisPetInfo = {};

// Pulls a random dog from the API
function randomDog (){
  var queryURL = "http://api.petfinder.com/pet.getRandom?format=json&output=full&animal=dog&key=" + apiKey;

  $.ajax({
    type : 'GET',
    data : {},
    url : queryURL+'&callback=?' ,
    dataType: 'json',
    success : function(data) { 
      setDogInfo(data, 0);
      // findShelterName();
      addDogs();
      reset();
      
    },
    error : function (request, error)
    {
      alert("Request: "+JSON.stringify(request));
    }
  })
};


// Pulls pet info based on criteria 
function findPet (){
var queryURL = "http://api.petfinder.com/pet.find?format=json&output=full&animal=dog&key=" + apiKey;
var searchZip = $("#searchZip").val().trim();
var searchSize = $("#searchSize").val().trim();
var searchGender = $("#searchGender").val().trim();
var searchAge = $("#searchAge").val().trim();
var searchNeutered = $("#searchNeutered").prop("checked");
var searchVaccinated = $("#searchVaccinated").prop("checked");
var searchHouseTrained = $("#searchHouseTrained").prop("checked");
var searchNoKids = $("#searchNoKids").prop("checked");
var searchNoCats = $("#searchNoCats").prop("checked");
var searchSpecialNeeds = $("#searchSpecialNeeds").prop("checked");
if(searchSize== "Any!"){
  searchSize = null;
};
if(searchGender == "Either!"){
    searchGender = null;
};
if(searchAge == "Any!"){
  searchAge = null;
};
  $.ajax({
    type : 'GET',
    url : queryURL+'&callback=?' ,
    dataType: 'json',
    data : {
      size: searchSize,
      sex: searchGender,
      location: searchZip,
      age : searchAge,
    },
    success : function(data) { 
      console.log(data);
      for(occurance=0; occurance<25; occurance++){
        console.log(occurance);
      setDogInfo(data, occurance);
        var trueCounter=0;
        var searchCounter=0;
        // Putting the possible search parameters in an array 
        var responseArray = [searchNeutered, searchHouseTrained, searchNoCats, searchNoKids, searchSpecialNeeds, searchVaccinated];
        var petInfoArray = [petNeuter, petHouseTrained, petCats, petKids, petSpecial, petShots];
        var trueResponseArray = ["Neutered/Spayed","House trained","Unknown","Unknown","Unknown","Vaccinated"]
        for(i=0;i<responseArray.length;i++){
          if(responseArray[i] == true){
            searchCounter++;
            if(petInfoArray[i] == trueResponseArray[i]){
              trueCounter++;
            };
          };
        };
        if(trueCounter == searchCounter) {
            findShelterName();
            addDogs();
            
        };
        reset();
      };
    },
    error : function (request, error)
    {
      alert("Request: "+JSON.stringify(request));
    }
  })
};

// Find shelter name based on ID using API 
function findShelterName (){
  var queryURL = "http://api.petfinder.com/shelter.get?format=json&id="+shelterID+"&key=" + apiKey;

    $.ajax({
      type : 'GET',
      data : {},
      url : queryURL+'&callback=?' ,
      dataType: 'json',
      success : function(data) { 
        console.log(data);
        shelterName = (data.petfinder.shelter.name.$t);
        console.log(shelterName);
      },
    })
};


// Reset function to clear variables
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
  shelterID= " ";
  shelterName= " ";
  shelterCity= " ";
  shelterState=" ";
  shelterFullAddress= " ";
  dogPhotos =[];
  trueCounter = 0;
  searchCounter =0;
};

// Dummy function to communicate with map.js 
function buildMap (address){
};

// Function to set all API data received from the call to a variable  
function setDogInfo(data, occurance){
  console.log(data);
  // Creating a variable to shorten path to get to dog info
  petInfo = data.petfinder.pet
  if(petInfo == undefined){
   petInfo = data.petfinder.pets.pet[occurance]; 
  }
  console.log(petInfo);
  // Name of the pet
  petName = petInfo.name.$t;
  // Age of the pet 
  petAge = petInfo.age.$t;
  // ID of the pet 
  petId = petInfo.id.$t;
  // Gender of the pet
  petGender = petInfo.sex.$t;
  // Converting letter into full word
  if (petGender == "M") {
    petGender = "Male"
  } 
  else {
    petGender = "Female"
  };

  // Var to determine the breed of the pet. If multiple breeds, set the first value equal to the breed value
  if (petInfo.breeds.breed[0] != undefined) {
    petBreed = petInfo.breeds.breed[0];
    petBreed = petBreed.$t;
  } else {
    petBreed = petInfo.breeds.breed.$t;
  };
  // Changing pit bull terrier to AKC name
  if (petBreed == "Pit Bull Terrier") {
    petBreed = "American Staffordshire Terrier"
  };
  //Splitting the bread in separate strings
  var breedSplit = petBreed.split(" ");
  breedSite = "http://www.akc.org/dog-breeds/"
  //Add each string to the URL to link to the AKC site with the correct page
  for (i = 0; i < breedSplit.length; i++){
    var breed = breedSplit[i];
    if (i < breedSplit.length - 1){
      breedSite += breed + "-";
    } else {
      breedSite += breed;
    };
  };
  console.log(breedSite);

  // Breed size 
  petSize = petInfo.size.$t;

  // Converting size into full word
  if (petSize == "L") {
    petSize = "Large";
  } else if (petSize == "M") {
    petSize = "Medium";
  } else if (petSize == "S") {
    petSize = "Small";
  } else {
    petSize = "Extra Large"
  };

  // Descr from shelter
  petDesc = petInfo.description.$t;

  // Loading photos of the dog into an array
  dogPhotos = [];
  for(i=0; i<petInfo.media.photos.photo.length; i++){
    var currentPhoto = petInfo.media.photos.photo[i];
    dogPhotos.push(currentPhoto.$t);
  };

  // Background info on dog (neutered, vaccinated, good with kids, housetrained)
  var petOptions = petInfo.options.option;
  if (Array.isArray(petOptions)) {
    for (i = 0; i < petOptions.length; i++) {
      if (petOptions[i].$t == "altered") {
        petNeuter = "Neutered/Spayed";
      };
      if (petOptions[i].$t == "hasShots") {
        petShots = "Vaccinated";
      };
      if (petOptions[i].$t == "noKids") {
        petKids = "Not good with children";
      };
      if (petOptions[i].$t == "housetrained") {
        petHouseTrained = "House trained";
      };
      if (petOptions[i].$t == "noCats") {
        petCats = "Not good with cats";
      };
      if (petOptions[i].$t == "specialNeeds") {
        petSpecial = "This dog has special needs. Please contact the shelter to learn more.";
      };
    };
  } else if (petOptions.$t != undefined) {
    if (petOptions.$t == "altered") {
      petNeuter = "Neutered/Spayed";
    } else if (petOptions.$t == "hasShots") {
      petShots = "Vaccinated";
    } else if (petOptions.$t == "noKids") {
      petKids = "Not good with children";
    } else if (petOptions.$t == "housetrained") {
      petHouseTrained = "House trained";
    } else if (petOptions.$t == "noCats") {
      petCats = "Not good with cats";
    } else if (petOptions.$t == "specialNeeds") {
      petSpecial = "This dog has special needs. Please contact the shelter to learn more.";
    };
  };

  // Zip code of shelter
  shelterZip = petInfo.contact.zip.$t;

  // Email contact of shelter
  shelterEmail = petInfo.contact.email.$t; 
  if(shelterEmail == undefined){
    shelterEmail = "Not Available";
  };

  // Phone number of the shelter
  shelterPhone = petInfo.contact.phone.$t;
  if(shelterPhone == undefined){
    shelterPhone = "Not Available";
  };

  // City location of the shelter
  shelterCity = petInfo.contact.city.$t;
  if(shelterCity == undefined){
    shelterCity = " ";
  };

  // State location of the shelter
  shelterState = petInfo.contact.state.$t;
  if(shelterState == undefined){
    shelterState = "Not Available";
  };

  // Full address of shelter"
  if (petInfo.contact.address1.$t != undefined) {
    shelterFullAddress = petInfo.contact.address1.$t + ", " + shelterCity + ", "
      + shelterState + ", " + shelterZip;
  } else {
    shelterFullAddress = shelterZip;
  };

  // buildMap(shelterFullAddress);
  // ID of the shelter
  shelterID = petInfo.shelterId.$t;


};

//Function to add summary dog cards and modals for each dog
function addDogs(){
  findShelterName();
  // Create new page elements to hold short info on dog
  var newDiv = $("<div class='card' style='width: 18rem'>");
  var newImg = $("<img class='card-img-top'>");
  var newH5 = $("<h5 class='card-title'>");
  var newP = $("<p class='card-text'>");
  var mapButton=$("<button type='button' class='btn btn-primary' id='mapBtn' >Locate Me</button>");

  // Change the attributes and text of created elements
  newImg.attr("src", dogPhotos[2]);
  newH5.text(petName);
  if(shelterCity != " "){
    newP.html(petBreed+"<br>"+ shelterCity+", "+shelterState);
  } else {
    newP.text(petBreed);
  };

newP.append(mapButton);

  // CREATING THE MODAL & all related classes
    var newModal = $("<div class='modal' role='dialog' aria-hidden='true'>");
    var modalDialog = $("<div class='modal-dialog' role='document'>");
    newModal.append(modalDialog);
    // Creates main content of modal
    var modalContent=$("<div class='modal-content'>");
    modalDialog.append(modalContent);
    // Creates the div to hold the modal header
    var modalHeader=$("<div class='modal-header'>");
    modalContent.append(modalHeader);
    // Creates the div to hold the modal title & append to header
    var modalTitle=$("<h5 class='modal-title'>");
    modalHeader.append(modalTitle);
    // Creates the div for the body of the modal
    var modalBody=$("<div class='modal-body'>");
    modalContent.append(modalBody);
    // Creates a div to hold the attributes of the pet
    var modalAttributes=$("<div class='modal-dog-attr'>");
    modalBody.append(modalAttributes);
    // Creates a div to hold the pet descr
    var modalDesc=$("<div class='modal-dog-desc'>");
    modalBody.append(modalDesc);
    // Creates a div to hold the contact shelter info
    var modalContact=$("<div class='shelter-contact'>");
    modalBody.append(modalContact);
    // Creates a div for the modal footer
    var modalFooter =$("<div class='modal-footer'>");
    modalContent.append(modalFooter);
    // Creates buttons in the footer for closeing the modal and adding to favorites
    var closeButton=$("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>");
    modalFooter.append(closeButton);
    var favoriteButton=$("<button type='button' class='btn btn-primary' id='favorite'>Add to Favorites</button>");
    modalFooter.append(favoriteButton);

    // Giving the modal an id of the pet 
    newModal.attr("id", petId);
    newModal.attr("aria-labelledby", petId);

    // Linking the button to the modal for the pet with a matching Id
    var seeMoreBtn = $("<button type='button' class='btn btn-primary' id='seeMoreBtn' data-toggle='modal'>More info for "+petName+"</button>");
    seeMoreBtn.attr("data-target", "#"+petId);
    // Adding attributes for use in Google Maps API
    seeMoreBtn.attr("dog", petId);
    seeMoreBtn.attr("address", shelterFullAddress);

    // Changing content of the modal
    // Title of the modal is the pet's name
    modalTitle.append(petName);

    // Append an image at the beginning of the modalBody
    var modalImg = $("<img>");
    modalImg.attr("src", dogPhotos[3]);
    modalBody.prepend(modalImg);

    // Only post if the following qualities are KNOWN. 
    if(petCats != "Unknown"){
      modalAttributes.append(petCats + "<br>");
    };
    if(petNeuter != "Unknown"){
      modalAttributes.append(petNeuter + "<br>");
    };
    if(petSpecial != "Unknown"){
      modalAttributes.append(petSpecial + "<br>");
    };
    if(petKids != "Unknown"){
      modalAttributes.append(petKids + "<br>");
    };
    if(petHouseTrained != "Unknown"){
      modalAttributes.append(petHouseTrained + "<br>");
    };
    if(petShots != "Unknown"){
      modalAttributes.append(petShots + "<br>");
    };

    modalAttributes.append(petSize+" / "+petAge+" / "+petGender+"<br>");
    modalAttributes.append(petBreed+"<br> <a href='"+breedSite+"' target=_blank>Find out more about "+petBreed+"s!");

    
    // Append the description to the modal description div 
    modalDesc.append("Details about "+petName+" from the shelter: <br>"+petDesc + '<br>');

    // Determine what to post to the modal contact info & appending to modal
  
    modalContact.append("Contact the shelter to learn more about "+petName+"!");

    // Append the phone, email, and address to the contact section
    modalContact.append("<br> Phone: " +shelterPhone
      +"<br> Email: "+shelterEmail+"<br> Address/Zip: "+shelterFullAddress);


  // Creating an object to hold the current pet's info and push to database
  var thisPetInfo = {
    name: petName,
    age: petAge,
    gender: petGender,
    breed: petBreed,
    size: petSize,
    site: breedSite,
    descr: petDesc,
    neuter: petNeuter,
    shots: petShots,
    kids: petKids,
    houseTrained: petHouseTrained,
    cats: petCats,
    special: petSpecial,
    email: shelterEmail,
    phone: shelterPhone,
    zip: shelterZip,
    id: shelterID,
    shelterName: shelterName,
    city: shelterCity,
    state: shelterState,
    address: shelterFullAddress,
    photos: dogPhotos
  };
  database.ref().push(thisPetInfo);
    

  // Append to the newly created div
  
  newDiv.append(newImg);
  newDiv.append(newH5);
  newDiv.append(newP);
  newDiv.append(seeMoreBtn);
  newDiv.append(newModal);

  // Append div to the page
  $(".randomDog").prepend(newDiv);
  // $(".searchDog").prepend(newDiv);

};

// When user clicks "show me adoptable dogs," run the following fuctions
$("#showDogs").on("click", function(){
  event.preventDefault();
  // Fade out the Show me Adoptable Dogs Button
  $("#showDogs").fadeOut();
  // Fade out the home page picture
  $("#homedog").fadeOut();
  // Fade in the random dogs
  $(".randomDog").fadeIn();
  // Fade in the search form
  $(".searchBox").fadeIn(2000);
  // Run the random dog function 10 times
  for(i=0;i<10;i++){
    randomDog();
    reset();
  }; 

});

// When the user clicks the "see more" button 
$("body").on("click", "#seeMoreBtn",function(){
  event.preventDefault();
  // Setting a variable to get the petId of the current dog to match with the map div
  var id=document.getElementById("seeMoreBtn").getAttribute("dog");
  console.log(id);
  petId = id;
  // Setting a variable to get the address of the current dog to run the initialize function 
  var address=document.getElementById("seeMoreBtn").getAttribute("address");
  shelterFullAddress = address;
  console.log(address);


  reset();
})

// When user clickes "Add to Favorites," run the following
$("body").on("click", "#favorite", function(){
    event.preventDefault();
    // Set value of database isFavorite to true
    // show all database isfavorites == true on page 
});

// When the user clicks "search," run the following 
$("body").on("click", "#search", function(){
  event.preventDefault();
  // Fade out the Show me Adoptable Dogs Button
  $("#showDogs").fadeOut(0);
  // Fade out the home page picture
  $("#homedog").fadeOut();
  // Clear out random dogs
  $(".randomDog").html("");
  // Fade in the search dogs
  $(".searchBox").fadeIn(600);
  
  // Call the API & Print results
  findPet();

  // Reset the search box for zip
  // $("#searchZip").val("");
});

});