"use strict"

$(() => {
    $(".hamburger-button").on("click", function() {
        $(".hamburger-button .bar").toggleClass("is-active");
        $(".hamburger-nav").toggleClass("is-active");
    });
})