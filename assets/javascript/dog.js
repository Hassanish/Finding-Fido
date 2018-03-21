
  function animal (){
    var apiKey = "359eebb45ac45f0d4449411094f651f8";
    var queryURL = "http://api.petfinder.com/pet.find?key=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    console.log(response);
    });

  };