//=============== News API =======================================================//

var url = 'https://newsapi.org/v2/everything?' +
    'q=trump&' +
    'from=2018-03-18&' +
    'sortBy=popularity&' +
    'apiKey=bc18a090e0be4d5699343166c9ba8378';

$.ajax({
    url: url,
    method: "GET",
}).then(function (response) {
    // console.log(response);
    // var article = response.articles[3].urlToImage;
    // console.log(article);
    // $("#articleSpace").append(article);
    // var newThumb = $("<img>").attr("src", article);
    //$("#articleSpace").append(newThumb);
});

//============== Firebase =======================================================//

var config = {
    apiKey: "AIzaSyCqK8grk7zfqoU9T9bVD3s0RwLO4GT-stk",
    authDomain: "beyondthebubble-48a3c.firebaseapp.com",
    databaseURL: "https://beyondthebubble-48a3c.firebaseio.com",
    projectId: "beyondthebubble-48a3c",
    storageBucket: "beyondthebubble-48a3c.appspot.com",
    messagingSenderId: "1068799382212"
};
firebase.initializeApp(config);

//============= Variables ======================================================//
// Gets values from user form

var userInput = $("#searchInput").val();
var queryUrl = 'https://newsapi.org/v2/everything?q=' + userInput + '&from=2018-03-18&' + 'sortBy=popularity&' + 'apiKey=bc18a090e0be4d5699343166c9ba8378';

//==== Around the World Colum ===============================================//

// 1. Generate storyThumbs to be displayed in the Around the world col from the userInterest[].

// 2. "Beyond my bubble" will display current search results (10)

// 3. "Search History" will display past searches currnetly being held in an array

//loop through the userInterest array and create thumbnails to be appended to the around the world col.
var userInterest = ["politics", "economy", "cooking", "sports", "technology", "texas", "united states"];

    //query the api with userInterests
    var atwThumbs = 'https://newsapi.org/v2/everything?q=' + userInterest[1] + '&from=2018-03-18&' + 'sortBy=popularity&' + 'apiKey=bc18a090e0be4d5699343166c9ba8378';

    //console.log(atwThumbs);
//Generate ATW THUMBS
$(document).ready(function(){
    $.ajax({
        url: atwThumbs,
        method: "GET",
    }).then(function (response) {
        // user interest []
         userInterest = ["Politics", "Economy", "Cooking", "Sports", "Technology", "Texas", "United States"];
        for (i = 0; i < userInterest.length; i++) {
            //console.log(userInterest[i]);
            //console.log(response.articles[i].url);
            //console.log(response.articles[2].source.name);
            //create linkt to story
            var storyUrl = response.articles[i].url;
            var source = response.articles[i].source.name;
            //create link
            var link = $("<a target='_blank'></a>").attr("href", storyUrl).attr('id', userInterest[i]).addClass('storyThumb atw-font');
            //create div to hold image, and headline
            var storyThumb = $('<div></div>')
            // create the pic
            var thumbPicUrl = response.articles[i].urlToImage;
            // console.log(thumbPicUrl);
            var thumbPic = $('<img></img>').attr('src', thumbPicUrl).attr({ width: "350", height: "100" }).addClass('userImage atw-story');
            var hr = $("<hr>");
            // get headline
            var userHeadlineUrl = response.articles[i].title;
            var title = $("<p>").text(userHeadlineUrl).append("<br>", "<hr>", "Source: ", "'", source, "<br>", "Based on your interest in: ", userInterest[i],);
            // $("#newStory").prepend(title);
            // console.log(userHeadlineUrl);
            // Stack the photo and the headline
            var picTitle = $(title).prepend(hr).prepend(thumbPic);
            // $("#newStory").prepend(picTitle);
            var thumbNail = $(link).html(storyThumb).html(picTitle);
            $("#atw-col").prepend(thumbNail);
        }
    })  
});


   
   





//=================== Button Functionality (completed. DO NOT TOUCH !!!!) ====================//

$("#searchBtn").on("click", function () {
    if ($("#searchInput").val() === "") { }
    else {
        // get user search term from field
        userInput = $("#searchInput").val();
        // add it to url
        queryUrl = 'https://newsapi.org/v2/everything?q=' + userInput + '&from=2018-03-18&' + 'sortBy=popularity&' + 'apiKey=bc18a090e0be4d5699343166c9ba8378';
        // console.log(queryUrl);
        // console.log(userInput);

        // ajax call for user input. 
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {
            for (i = 0; i < 15; i++) {
                //console.log(response.articles[i].url);
                //console.log(response.articles[2].source.name);
                //create linkt to story
                var storyUrl = response.articles[i].url;
                var source = response.articles[i].source.name;
                //create link
                var link = $("<a target='_blank'></a>").attr("href", storyUrl).attr('id', userInput).addClass('storyThumb');
                //create div to hold image, and headline
                var storyThumb = $('<div></div>')
                // create the pic
                var thumbPicUrl = response.articles[i].urlToImage;
                // console.log(thumbPicUrl);
                var thumbPic = $('<img></img>').attr('src', thumbPicUrl).attr({ width: "250", height: "100" }).addClass('userImage');
                var hr = $("<hr>");
                // get headline
                var userHeadlineUrl = response.articles[i].title;
                var title = $("<p>").text(userHeadlineUrl).append("<br>", "<hr>", "Source: ", "'", source, "<br>", "Your Search Term: ","'", userInput,"'");
                // $("#newStory").prepend(title);
                // console.log(userHeadlineUrl);
                // Stack the photo and the headline
                var picTitle = $(title).prepend(hr).prepend(thumbPic);
                // $("#newStory").prepend(picTitle);
                var thumbNail = $(link).html(storyThumb).html(picTitle);
                $("#newStory").prepend(thumbNail);
            }
        });
        //====== End of button =============//
        $("#searchInput").val("");
    }
});

