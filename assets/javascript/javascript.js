var contentArray = ["Twin Peaks", "Game of Thrones", "The Walking Dead", "Sherlock", "Orange is the New Black", "The Simpsons", "American Dad", "Adventure Time", "Daredevil", "Jessica Jones", "Luke Cage"];
var i = 0;
var j = 0;
var callButtons = function() {
	for (var i = 0; i < contentArray.length; i++) {
		console.log(contentArray[i]);
		var newButton = $("<button class='btn btn-default'>");
		newButton.attr("data-show", contentArray[i])
		.html(contentArray[i])
		.appendTo("#buttonArea");
	}
	callGif();
}
var callGif = function() {
	$(".btn").on("click",function(){
		$("#gifArea1").empty();
		$("#gifArea2").empty();
		console.log(this);
		var contentSelected = $(this).attr("data-show");
		var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + contentSelected +"&api_key=vM9vIaMqN7X9I2ar4hHiG2SD8bYv5Zgm&limit=10&rating=pg";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$("#gifArea").empty();
			console.log(response);			
			for (var j = 0; j < 10; j++) {
				var newDiv = $("<div>");
				var newGif = $("<img class='gif'>");
				newGif.attr("src", response.data[j].images.fixed_height_still.url)
				.attr("id", "gifImg" + j)
				.attr("data-state", "still")
				.attr("data-still", response.data[j].images.fixed_height_still.url)
				.attr("data-animate", response.data[j].images.fixed_height.url)
				.attr("alt", contentArray[i])
				.appendTo(newDiv);
				if(j<5) {
					newDiv.appendTo("#gifArea1");
				} else {
					newDiv.appendTo("#gifArea2");
				}
			}
			toggleAnimate();
		})			
	})
}	
var toggleAnimate = function() {
	$(".gif").on("click",function () {
		console.log($(this));
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("data-state", "animate")
			.attr("src", $(this).attr("data-animate"));
		} else {
			$(this).attr("data-state", "still")
			.attr("src", $(this).attr("data-still"));
		}
	})
}
var submitEvent = function() {
	$('#submitButton').on("click", function(event) {
	// event.preventDefault;
		var makeButton = $("#userRequest").val().trim();
		if (!contentArray.includes(makeButton)) {
			$("#buttonArea").empty();
			contentArray.push(makeButton);
			callButtons();
		}
	})
}
$("document").ready(function() {
	callButtons();
	submitEvent();
})