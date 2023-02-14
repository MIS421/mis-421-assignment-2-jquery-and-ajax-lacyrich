var len;
var results = '';
const searchButton = document.getElementById('#searchButton');
const siteBackground = document.getElementById('#siteName');
const timeButton = document.getElementById('#timeButton');

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/' + $.param(params),
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


searchButton.addEventListener('click', function () {
    apiSearch();
});


siteBackground.addEventListener('click', function () {
    changeBackgroundImage();
});

function changeBackgroundImage() {
    document.body.style.backgroundImage = 'url("evening.jpg")';
}


timeButton.on('click', function () {
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
        buttons: {
            OK: function () {
                $(this).dialog('close');
            }
        }
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