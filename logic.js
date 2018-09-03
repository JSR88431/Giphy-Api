var topics = ["basketball", "cars", "technology", "dogs", "babies"];


function displayTopic() {

    var allTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PQbgJKw0tsxshkPmzMHm6TgY15Kx4RTA&q=" + allTopic + "&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var result = response.data;

        for (var i = 0; i < result.length; i++) {

            var topicDiv = $("<div>");
            var p = $("<p class = 'text-muted font-weight-bold text-center'>");
            $(p).text("Rating: " + result[i].rating);
            var image = $("<img class='img-responsive pics m-1 mb-3'>");
            $(image).attr("src", result[i].images.fixed_height_still.url);
            $(image).attr("data-state", "still");
            $(image).attr("data-animate", result[i].images.fixed_height.url);
            $(image).attr("data-still", result[i].images.fixed_height_still.url);
            $(topicDiv).append(p);
            $(topicDiv).append(image);
            $("#giphy").prepend(topicDiv);


            $(image).hover(function () {
                $(this).css('opacity', '0.3');
            },
                function () {
                    $(this).css('opacity', '1');
                }
            );
        }

    })
}


// ANIMATE THE GIF
function animateStill() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

}


// MAKE BUTTONS FOR THE TOPICS
function makeButtons() {

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button class='m-1 btn btn-success'>");
        b.addClass("topic");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttons").append(b);
    }
}

// CLICK FUNCTION TO ADD BUTTONS FROM INPUT FIELD

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val();
    topics.push(topic);

    makeButtons();
})


// CALL ALL FUNCTIONS
$(document).on("click", ".pics", animateStill);
$(document).on("click", ".topic", displayTopic);
makeButtons();
