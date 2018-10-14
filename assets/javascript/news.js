//=============== News API =======================================================//

var url =
  "https://newsapi.org/v2/everything?" +
  "q=trump&" +
  "from=2018-09-20&" +
  "sortBy=popularity&" +
  "apiKey=5abbfcf32dc647a5820b696b9c80ebdf";
    // 'apiKey=bc18a090e0be4d5699343166c9ba8378';

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

// var config = {
//     apiKey: "AIzaSyCqK8grk7zfqoU9T9bVD3s0RwLO4GT-stk",
//     authDomain: "beyondthebubble-48a3c.firebaseapp.com",
//     databaseURL: "https://beyondthebubble-48a3c.firebaseio.com",
//     projectId: "beyondthebubble-48a3c",
//     storageBucket: "beyondthebubble-48a3c.appspot.com",
//     messagingSenderId: "1068799382212"
// };
// firebase.initializeApp(config);

//============= Variables ======================================================//
// Gets values from user form

var userInput = $("#searchInput").val();
var queryUrl =
  "https://newsapi.org/v2/everything?q=" +
  userInput +
  "&from=2018-09-01&" +
  "sortBy=popularity&" +
  "apiKey=5abbfcf32dc647a5820b696b9c80ebdf";

//==== Around the World Colum ===============================================//

var userInterest = ["politics", "economy", "cooking", "sports", "technology", "texas", "united states"];  
var atwThumbs =
  "https://newsapi.org/v2/everything?q=" +
  userInterest[1] +
  "&from=2018-09-20&" +
  "sortBy=popularity&" +
  "apiKey=5abbfcf32dc647a5820b696b9c80ebdf";


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
           
            var storyUrl = response.articles[i].url;
            var source = response.articles[i].source.name;
            
            var link = $("<a target='_blank'></a>").attr("href", storyUrl).attr('id', userInterest[i]).addClass('storyThumb atw-font');
            
            var storyThumb = $('<div></div>')
            var thumbPicUrl = response.articles[i].urlToImage;
            // console.log(thumbPicUrl);
            var thumbPic = $('<img></img>').attr('src', thumbPicUrl).attr({ width: "250", height: "175" }).addClass('userImage atw-story');
            var hr = $("<hr>");
            
            var userHeadlineUrl = response.articles[i].title;
            var title = $("<p>").text(userHeadlineUrl).append("<br>", "<hr>", "Source: ", "'", source, "<br>", "Based on your interest in: ", userInterest[i],);
            // console.log(userHeadlineUrl);
            
            var picTitle = $(title).prepend(hr).prepend(thumbPic);
            var thumbNail = $(link).html(storyThumb).html(picTitle);
            $("#atw-col").prepend(thumbNail);
        }
    })  
});


   
   





//=================== Button Functionality (completed. DO NOT TOUCH !!!!) ====================//

$("#searchBtn").on("click", function () {
    if ($("#searchInput").val() === "") { }
    else {
        
        userInput = $("#searchInput").val();
        queryUrl = "https://newsapi.org/v2/everything?q=" + userInput + "&from=2018-09-20&" + "sortBy=popularity&" + 
            //new key
        "apiKey=5abbfcf32dc647a5820b696b9c80ebdf";
        // console.log(queryUrl);
        // console.log(userInput);

         
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {
            
                for (i = 0; i < 15; i++) {
                    //console.log(response.articles[i].url);
                    //console.log(response.articles[2].source.name);
                
                    var storyUrl = response.articles[i].url;
                    var source = response.articles[i].source.name;
               
                    var link = $("<a target='_blank'></a>").attr("href", storyUrl).attr('id', userInput).addClass('storyThumb');
                
                    var storyThumb = $('<div></div>')
                    var thumbPicUrl = response.articles[i].urlToImage;
                
                    var thumbPic = $('<img></img>').attr('src', thumbPicUrl).attr({ width: "250", height: "100" }).addClass('userImage');
                    var hr = $("<hr>");
                
                    var userHeadlineUrl = response.articles[i].title;
                    var title = $("<p>").text(userHeadlineUrl).append("<br>", "<hr>", "Source: ", "'", source, "<br>", "Your Search Term: ", "'", userInput, "'");
                
                    // console.log(userHeadlineUrl);
                
                    var picTitle = $(title).prepend(hr).prepend(thumbPic);
                    var thumbNail = $(link).html(storyThumb).html(picTitle);
                    $("#newStory").prepend(thumbNail);
                }
            
        });
        //====== End of button =============//
        $("#searchInput").val("");
    }
});

