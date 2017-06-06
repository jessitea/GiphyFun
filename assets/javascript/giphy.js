      /////////////////////////////////////////////////////////
      // Declaring global variables and initial array of gifs//
      /////////////////////////////////////////////////////////
      var topics = ["the twist", "electric slide", "macarena", "the worm", "history of dance", "carlton dance", "breakdance"];

      var i = 0;

      //////////////////////////////////
      // Function creates new buttons //
      /////////////////////////////////
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

      ////////////////////////////
      // Function displays gifs //
      ////////////////////////////
      function displayGifs() {

          // Declared variables for ajax query, grabs each topic and puts it in queryURL
          var topic = $(this).attr("data-name");
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

          //For testing purposes
          // console.log("queryURL " + queryURL);

          $.ajax({
              url: queryURL,
              method: "GET"
          }).done(function(response) {

              console.log(response);

              $("#gifs-view").empty();

              $("#gifs-view").append("<h2><strong>Click on a gif to animate</h2></strong>");

              //Displays 10 images from query
              for (i = 0; i < 12; i++) {


                  // Create a new div to hold each gif + rating generated from the query //
                  var newDiv = $('<div>');

                  newDiv.addClass("gif-box");

                  newDiv.attr("id", "gif" + [i]);

                  $("#gifs-view").append(newDiv);

                  var coolGif = $('#gif' + [i]);
                  ////////////////////////////////////////////////////////////////////////


                  // Declared variables to create gif + rating and append it to html
                  var movingUrl = response.data[i].images.downsized_medium.url;

                  var stillUrl = response.data[i].images.downsized_still.url;

                  var rating = response.data[i].rating;

                  console.log("StillURL " + stillUrl);

                  coolGif.append('<div class="rating"><b>Rating:</b> ' + rating + '</div>');
                  coolGif.append('<div class="generated-gif"><img src="' + stillUrl + '" width="150" class="gif" data-state="still" data-still="' + stillUrl + '" data-animate="' + movingUrl + '" data-index="' + [i] + '"></div>');
                  $('#gifs-view').append(coolGif);

                  // Wraps the rating div + gif div into newDiv
                  $(".rating .generated-gif").wrapAll($('.gif-box'));


              }

          })




      }




      // Function to add button
      $("#add-topic").on("click", function(event) {
          event.preventDefault();

          var topic = $("#topic-input").val().trim().toLowerCase();

          var topicInArray = topics.indexOf(topic);

          //Checks to make sure no duplicate buttons
          if (topicInArray == -1) {

              topics.push(topic);

              renderButtons();

              $("#topic-input").val("");

          }

      })



      // Function to animate gifs
      $("#gifs-view").on("click", "img", function() {

          var state = $(this).attr('data-state');
          var animateUrl = $(this).attr('data-animate');
          var frozenUrl = $(this).attr('data-still');

          // For testing purposes
          // console.log(animateUrl);

          // Checks if 'data-state' is 'still', then replaces current source url with an animated url and replaces current 'data-state' to animate
          if (state === "still") {

              $(this).attr("src", animateUrl);
              $(this).attr("data-state", "animate");

          }

          // Checks if 'data-state' is 'animate', then replaces current source url with an still url and replaces current 'data-state' to still
          if (state === "animate") {

              $(this).attr("src", frozenUrl);
              $(this).attr("data-state", "still");

          }

      })

      // Fuction that uses images of arrows to scroll through rendered buttons
      $('#rightArrow').click(function() {
          event.preventDefault();
          $('#buttons-view-outer').animate({
              scrollLeft: "+=200px"
          }, "slow");
      });

      $('#leftArrow').click(function() {
          event.preventDefault();
          $('#buttons-view-outer').animate({
              scrollLeft: "-=200px"
          }, "slow");
      });

      //Calls displayGifs function on click of any class of '.topicgif'
      $(document).on("click", ".topicgif", displayGifs);

      //Calls function to create buttons at start of document from initial array
      renderButtons();