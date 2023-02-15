var len;
var results = '';

//const timeButton = document.getElementById('#timeButton');

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "1d86a4de538b4df0bcb3f18620b14169");
      },

      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}

function apiLucky() {
    var params = {
        "q": $("#query").val(),
        "count": "1",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "1d86a4de538b4df0bcb3f18620b14169");
        },

        type: "GET",
    })
        .done(function (data) {
            if (data.webPages.value.length > 0) {
                window.location = data.webPages.value[0].url;
            } else {
                alert("No results found");
            }
        })
        .fail(function () {
            alert("error");
        });
}

document.getElementById("feelingLuckyButton").addEventListener("click", function () {
    apiLucky();
});

document.getElementById("searchButton").addEventListener("click", function () {
    apiSearch();
});


let backgroundImageIndex = 0;
const backgroundImages = ['url("day.jpg")','url("afternoon.jpg")', 'url("evening.jpg")'];

document.getElementById("siteName").addEventListener("click", function () {
    changeBackgroundImage();
});

function changeBackgroundImage() {
    backgroundImageIndex = (backgroundImageIndex + 1) % backgroundImages.length;
    document.body.style.backgroundImage = backgroundImages[backgroundImageIndex];
    document.body.style.color = 'white';
}

document.getElementById("timeButton").addEventListener("click", function () {
   showTime();
});

function showTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = formatTime(hours, minutes);

    $('#timeButton').text(formattedTime);

    $('#timeButton').dialog({
        title: 'Current Time',
        modal: true,
        
       
    });

}

function formatTime(hours, minutes) {
    let formatHours = hours;
    let formatMinutes = minutes;

    if (hours < 10) {
        formatHours = `0${hours}`;
    }

    if (minutes < 10) {
        formatMinutes = `0${minutes}`;
    }

    return `${formatHours}:${formatMinutes}`;
}

