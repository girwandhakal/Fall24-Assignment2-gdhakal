function apiSearch() {
    document.getElementById("searchResults").style.visibility = "visible";
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '01baec8dedab45ba9a21909bfcc4c267'
        }
    })  
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p class="resultItem"><a target="_blank" href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a> ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
        })
        .fail(function () {
            alert('error');
        });
}

function changeImage() {
    var params = {
        'orientation' : 'landscape'
    }
    $.ajax({
        url: "https://api.unsplash.com/photos/random?" + $.param(params),
        type: "GET",
        headers: {
            'Authorization': 'Client-ID QcVBPh_T1FE-H_9vs15bveW8pVITb2XcUy7QaUBKQiY'
        }
    })
        .done(function (data) {
            document.getElementsByTagName("body")[0].style.backgroundImage = `url(${data.urls.regular})`;
        })
            .fail(function () {
                alert("error");
            })
}

function feelingLucky() {

    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '01baec8dedab45ba9a21909bfcc4c267'
        }
    })
        .done(function (data) {
            window.location.href = data.webPages.value[0].url;
        })
        .fail(function () {
            alert('error');
        });
}

$(function () {

    $("#Search").on('click', function () {
        if ($('#query').val() == "") {
            return;
        }
            apiSearch();
        })
})

$(function () {
    $("#im-feeling-lucky").on('click', function () {
        feelingLucky();
    })
    $("#get-time").on('click', function () {
        var now = new Date();
        var timeString = `${now.getHours()}:${now.getMinutes()}`;
        $("#time-div").text(timeString);
        $("#time-div").dialog();
    })
    $("#title").on('click', function () {
        changeImage();
    })
})
