
      // Declaring variables and initial array of gifs
      var topics = ["electric slide", "macarena", "the worm", "history of dance", "carlton dance", "dance"];

      var i = 0;

      // Function creates new buttons
      function renderButtons() {

        $("#buttons-view").empty();
        
        for (i = 0; i < topics.length; i++) {

          var a = $("<button>");
          
          a.addClass("topicgif");
          
          a.attr("data-name", topics[i]);
          
          a.text(topics[i]);
          
          $("#buttons-view").append(a);
        }
      }

      // Function displays gifs
      function displayGifs() {

        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

        //For testing purposes
        console.log("queryURL " + queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

            console.log(response);

            $("#gifs-view").empty();
            
            for (i = 0; i < 10; i++) {

          // Creates a div to hold the gif
          //  var newDiv = $('<div>');

          // newDiv.addClass("gif-box");

          // newDiv.attr("id", [i]);

          // $("#gifs-view").append(newDiv);

          // var coolGif = $('#gif' + [i]);

          var movingUrl = response.data[i].images.downsized_medium.url;

          var stillUrl = response.data[i].images.downsized_still.url;

          var rating = response.data[i].rating;

          console.log("StillURL " + stillUrl);

          $("#gifs-view").append('<div class="generated-gif" id="rating"><b>Rating:</b> ' + rating + '</div>');
          $("#gifs-view").append('<div class="generated-gif" id="coolgif"><img src="' + stillUrl + '" width="150" class="gif" data-state="still" data-still="' + stillUrl + '" data-animate="' + movingUrl + '" data-index="' + [i] + '"></div>');
          // $('#gifs-view').append(coolGif);


          $('div.data-index' + [i]).wrapAll("<div class='gif-box'>");

        
        }
          
        })


      

      }


      
      

      // Function to add button
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        
        var topic = $("#topic-input").val().trim().toLowerCase();

          var topicInArray = topics.indexOf(topic);

          if (topicInArray == -1) {

        topics.push(topic);

        
        renderButtons();
      
      }

      })



       // Function to animate gifs
      $("#gifs-view").on("click", "img", function() {

      var state = $(this).attr('data-state');
      var animateUrl = $(this).attr('data-animate');
      var frozenUrl = $(this).attr('data-still');

      console.log(animateUrl);


      if (state === "still") {

        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");

      }

      if (state === "animate") {

        $(this).attr("src", frozenUrl);
        $(this).attr("data-state", "still");

      }

    })
     

      $(document).on("click", ".topicgif", displayGifs);

      
      renderButtons();


