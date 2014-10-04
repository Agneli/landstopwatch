$(function () {

    if (localStorage.getItem("bg") == undefined) {
        localStorage.setItem("bg", "img/bg/1.jpg");
    }
    $("body").css("background-image", 'url("' + localStorage.bg + '")');

    $(".link-menu").click(function () {
        $("#menu").fadeIn();
        $("body #menu").html('');

        for (var i = 1; i < 10; i++) {
            $("body #menu").append('<img class="theme" src="img/bg/' + i + '.jpg" />');
        }
    });

    $("#menu").on('click', '.theme', function () {
        var img = $(this).attr("src");
        localStorage.setItem("bg", img);
        $("body").css("background-image", 'url("' + localStorage.bg + '")');
        $("#menu").fadeOut();
    });

    function now() {
        var now = new Date();
        var hours = now.getHours();
        var seconds = now.getSeconds();
        var minutes = now.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }

    function date() {
        var now = new Date();
        var day = now.getDate();
        var month = (now.getMonth() + 1);

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }

        var date = day + '/' + month + '/' + now.getFullYear();
        return date;
    }

    $("#start").click(function () {
        $("table tbody").append('<tr><td class="lap">Start</td><td>' + now() + '</td><td class="elapsed">00:00:00</td><td class="total">00:00:00</td></tr>');
        $(this).hide();
        $("#lap, #pause, #stop, table").css("display", "inline-block");
        interval = setInterval("count();", 1000);
    });

    $("#lap").click(function () {
        var lap = $("table tbody tr td.lap").last().text();
        if (lap === "Start") {
            lap = 0;
        }
        var newLap = parseInt(lap) + 1;
        var time = $("#time").text();
        var total = $("table tbody tr td.total").last().text();

        var timeStart = new Date("30/07/2014 " + total).getTime();
        var timeEnd = new Date("30/07/2014 " + time).getTime();

        var elapsed = (timeEnd - timeStart);

        $("table tbody").append('<tr><td class="lap">' + newLap + '</td><td>' + now() + '</td><td class="elapsed">' + msToTime(elapsed) + '</td><td class="total">' + time + '</td></tr>');
    });

    $("#resume").click(function () {
        $(this).hide();
        $("#pause").css("display", "inline-block");
        interval = setInterval("count();", 1000);
    });

    $("#pause").click(function () {
        $(this).hide();
        $("#resume").css("display", "inline-block");
        clearInterval(interval);
    });

    $("#stop").click(function () {
        $("header > a").hide();
        $("#save, #new").css("display", "inline-block");

        var time = $("#time").text();
        var total = $("table tbody tr td.total").last().text();

        var timeStart = new Date("30/07/2014 " + total).getTime();
        var timeEnd = new Date("30/07/2014 " + time).getTime();

        var elapsed = (timeEnd - timeStart);

        $("table tbody").append('<tr><td class="lap">Finish</td><td>' + now() + '</td><td class="elapsed">' + msToTime(elapsed) + '</td><td class="total">' + time + '</td></tr>');
        clearInterval(interval);
    });

    $("#save").click(function () {
        $(this).hide();
        var data = $("#table").html();

        var dataId = new Date();
        dataId = dataId.getFullYear() + "-" + (dataId.getMonth() + 1) + "-" + dataId.getDate() + "-" + dataId.getHours() + "-" + dataId.getMinutes() + "-" + dataId.getSeconds();

        localStorage.setItem("data", "{'id':" + dataId + ", 'data':" + data + "}");
        alert("Successfully saved!");

    });

    $("#new").click(function () {
        location.reload();
    });

    $("#date").text(date());

});

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var seconds = s % 60;
    s = (s - seconds) / 60;
    var minutes = s % 60;
    var hours = (s - minutes) / 60;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
}

function formatTime(seconds) {
    var minutes = 0;
    var hours = 0;

    while (seconds >= 60) {
        if (seconds >= 60) {
            seconds = seconds - 60;
            minutes = minutes + 1;
        }
    }

    while (minutes >= 60) {
        if (minutes >= 60) {
            minutes = minutes - 60;
            hours = hours + 1;
        }
    }

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var formated = hours + ":" + minutes + ":" + seconds;
    return formated;
}
var seconds = 0;

function count() {
    seconds++;
    $("#time").text(formatTime(seconds));
}

function zera() {
    clearInterval(interval);
    seconds = 0;
    $("#time").text(formatTime(seconds));
}