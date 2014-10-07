$(function () {

    if (localStorage.getItem("bg") == undefined) {
        localStorage.setItem("bg", "img/bg/1.jpg");
    }
    $("body").css("background-image", 'url("' + localStorage.bg + '")');

    $(".link-menu").click(function () {
        $("section:not(#index) header").addClass("bg-black");
        $("#menu a").css("display", "inline-block");
        $("section").fadeOut();
        $("#menu").fadeIn();
    });

    $(".back").click(function () {
        $("section:not(#index) header").removeClass("bg-black");
        $("section").fadeOut();
        $("#index").fadeIn();
    });

    $(".link-data").click(function () {
        $("#records header a").css("display", "inline-block");
        $("section:not(#index)").fadeOut();
        $("#records").fadeIn();
        $("#records #data").html('');
        var data = JSON.parse(localStorage.getItem("data"));
        for (var i = 0; i < data.length; i++) {
            $("#records #data").append("<div class='time'><a href='#!'>" + data[i]["date"] + " - " + data[i]["name"] + "</a><span class='trash' data-id='" + data[i]["id"] + "'></span><div class='data'>" + data[i]["data"] + "</div></div>");
        }
    });

    $("#records #data").on("click", ".time a", function () {
        $(this).next().next(".data").slideToggle();
    });

    $("#records #data").click(function (e) {
        e.stopPropagation();
    });

    $("#records #data").on("click", ".time .trash", function () {
        var id = $(this).data("id");
        var data = JSON.parse(localStorage.getItem("data"));
        for (var i = 0; i < data.length; i++) {
            if (data[i]["id"] === id) {
                if (confirm("Are you sure?")) {
                    if (data.splice(i, 1)) {
                        localStorage.setItem("data", JSON.stringify(data));
                        $(this).parent(".time").slideUp();
                    }
                }
            }
        }
    });

    $(".link-theme").click(function () {
        $("section:not(#index)").fadeOut();
        $("#theme").fadeIn();
        $("body #theme").html('');

        for (var i = 1; i < 10; i++) {
            $("body #theme").append('<img class="theme" src="img/bg/' + i + '.jpg" />');
        }
    });

    $("#theme").on('click', '.theme', function () {
        var img = $(this).attr("src");
        localStorage.setItem("bg", img);
        $("body").css("background-image", 'url("' + localStorage.bg + '")');
        $("#theme").fadeOut();
        $("#index").fadeIn();
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
        $("#table table tbody").append('<tr><td class="lap">Start</td><td>' + now() + '</td><td class="elapsed">00:00:00</td><td class="total">00:00:00</td></tr>');
        $(this).hide();
        $("#lap, #pause, #stop, table").css("display", "inline-block");
        interval = setInterval("count();", 1000);
    });

    $("#lap").click(function () {
        var lap = $("#table table tbody tr td.lap").last().text();
        if (lap === "Start") {
            lap = 0;
        }
        var newLap = parseInt(lap) + 1;
        var time = $("#time").text();
        var total = $("#table table tbody tr td.total").last().text();

        var timeStart = new Date("30/07/2014 " + total).getTime();
        var timeEnd = new Date("30/07/2014 " + time).getTime();

        var elapsed = (timeEnd - timeStart);

        $("#table table tbody").append('<tr><td class="lap">' + newLap + '</td><td>' + now() + '</td><td class="elapsed">' + msToTime(elapsed) + '</td><td class="total">' + time + '</td></tr>');
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

        var name = prompt("Save as:");

        if (name !== null) {

            $(this).hide();

            var id = new Date();
            id = id.getFullYear() + "-" + (id.getMonth() + 1) + "-" + id.getDate() + "-" + id.getHours() + "-" + id.getMinutes() + "-" + id.getSeconds();

            var date = new Date();
            date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

            var time = $("#table").html();

            if (localStorage.getItem("data") === null) {
                var data = [];
            } else {
                var data = JSON.parse(localStorage.getItem("data"));
            }

            data.push({
                'id': id,
                'name': name,
                'date': date,
                'data': time,
                'active': "y"
            });
            localStorage.setItem("data", JSON.stringify(data));
            alert("Successfully saved!");
        }

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