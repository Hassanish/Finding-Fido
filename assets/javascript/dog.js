$.getJSON('http://api.petfinder.com/pet.getRandom?format=json&key=359eebb45ac45f0d4449411094f651f8&callback=?')
  .done(function(petApiData){ console.log(petApiData)});
  

  function animal (){
    var apiKey = "359eebb45ac45f0d4449411094f651f8";
    var queryURL = "http://api.petfinder.com/pet.getRandom?format=json&animal=dog&key=" + apiKey;

    $.ajax({
      url: queryURL,
      jsonp: "callback",
      dataType: "jsonp"
    }).then(function(response) {
    console.log(response);
    });

  };

  animal();