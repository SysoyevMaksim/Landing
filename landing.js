let last_known_scroll_position = 0;
let ticking = false;
let home = document.getElementById("home");
let functions = document.getElementById("functions");
let screenshots = document.getElementById("screenshots");
let homeLink = document.getElementById("homeLink");
let functionsLink = document.getElementById("functionsLink");
let screenshotsLink = document.getElementById("screenshotsLink");

function atScroll(scroll_pos) {
    // console.log(home.getBoundingClientRect().y <= 0);
    // console.log(functions.getBoundingClientRect().y <= 0);
    // console.log(screenshots.getBoundingClientRect().y <= 0);
    // console.log("_______________________________________");
    if (screenshots.getBoundingClientRect().y <= 1) {
        screenshotsLink.style.color = "#ff5252";
        homeLink.style.color = "white";
        functionsLink.style.color = "white";
    } else if (functions.getBoundingClientRect().y <= 1) {
        screenshotsLink.style.color = "white";
        homeLink.style.color = "white";
        functionsLink.style.color = "#ff5252";
    } else {
        screenshotsLink.style.color = "white";
        homeLink.style.color = "#ff5252";
        functionsLink.style.color = "white";
    }
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            atScroll(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;
    }
});

function to_information(){
    document.getElementById("information_bt").style.color = "#ff5252";
    document.getElementById("information_bt").style.borderColor = "#ff5252";
    document.getElementById("search_bt").style.color = "white";
    document.getElementById("search_bt").style.borderColor = "white";
    document.getElementById("scanner_bt").style.color = "white";
    document.getElementById("scanner_bt").style.borderColor = "white";
    document.getElementById("love_bt").style.color = "white";
    document.getElementById("love_bt").style.borderColor = "white";
    document.getElementById("Information").style.display = "block";
    document.getElementById("Search").style.display = "none";
    document.getElementById("Scanner").style.display = "none";
    document.getElementById("Love").style.display = "none";
}

function to_search(){
    document.getElementById("information_bt").style.color = "white";
    document.getElementById("information_bt").style.borderColor = "white";
    document.getElementById("search_bt").style.color = "#ff5252";
    document.getElementById("search_bt").style.borderColor = "#ff5252";
    document.getElementById("scanner_bt").style.color = "white";
    document.getElementById("scanner_bt").style.borderColor = "white";
    document.getElementById("love_bt").style.color = "white";
    document.getElementById("love_bt").style.borderColor = "white";
    document.getElementById("Information").style.display = "none";
    document.getElementById("Search").style.display = "block";
    document.getElementById("Scanner").style.display = "none";
    document.getElementById("Love").style.display = "none";
}

function to_scanner(){
    document.getElementById("information_bt").style.color = "white";
    document.getElementById("information_bt").style.borderColor = "white";
    document.getElementById("search_bt").style.color = "white";
    document.getElementById("search_bt").style.borderColor = "white";
    document.getElementById("scanner_bt").style.color = "#ff5252";
    document.getElementById("scanner_bt").style.borderColor = "#ff5252";
    document.getElementById("love_bt").style.color = "white";
    document.getElementById("love_bt").style.borderColor = "white";
    document.getElementById("Information").style.display = "none";
    document.getElementById("Search").style.display = "none";
    document.getElementById("Scanner").style.display = "block";
    document.getElementById("Love").style.display = "none";
}

function to_love(){
    document.getElementById("information_bt").style.color = "white";
    document.getElementById("information_bt").style.borderColor = "white";
    document.getElementById("search_bt").style.color = "white";
    document.getElementById("search_bt").style.borderColor = "white";
    document.getElementById("scanner_bt").style.color = "white";
    document.getElementById("scanner_bt").style.borderColor = "white";
    document.getElementById("love_bt").style.color = "#ff5252";
    document.getElementById("love_bt").style.borderColor = "#ff5252";
    document.getElementById("Information").style.display = "none";
    document.getElementById("Search").style.display = "none";
    document.getElementById("Scanner").style.display = "none";
    document.getElementById("Love").style.display = "block";
}

atScroll();