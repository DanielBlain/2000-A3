'use strict';

let today_num = new Date();
let index = today_num.getDay() -1;

class Weekday {
    constructor(name, weather, precipitationValue, temp) {
        this.name = name;
        this.weather = weather;
        this.precipitationValue = precipitationValue;
        this.temp = temp;
    }
}


const monday = new Weekday("monday", "sunny", 0, 26);
const tuesday = new Weekday("tuesday", "sunny", 0, 26);
const wednesday = new Weekday("wednesday", "cloudy", 10, 22);
const thursday = new Weekday("thursday", "sunny", 10, 26);
const friday = new Weekday("friday", "rainy", 40, 18);
const saturday = new Weekday("saturday", "rainy", 40, 22);
const sunday = new Weekday("sunday", "sunny", 10, 24);
const weekdays = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

const weather = {
    weekdayDisplay: $('.weekday'),
    weatherImage: $('.weather-image'),
    precipitation: $('#precipitation'),
    temperature: $('.temperature p'),
    degrees: 'celsius',
    currentObject: '',
    displayOnLoad: function(day) {
        displayWeather(day);
        // calls function displayWeather using parameter day.
    },
    determineDay: function(index){
        this.displayOnLoad(weekdays[index]);
        // calls method displayOnLoad using variable index as the array index for object weekdays.
    },
}

weather.determineDay(index);
$('.weekday-menu').removeClass('expanded');
$('.expand').removeClass('expanded');
weekDisplay(weekOrder());

$('.celsius').on('click', () => {
    weather.degrees = 'celsius';
    unitConversion(weather.currentObject);
    if ($('.celsius').hasClass('degree-inactive') === true) {
        $('.celsius').toggleClass("degree-active degree-inactive");
        $('.fahrenheit').toggleClass("degree-active degree-inactive");
    }
});

$('.fahrenheit').on('click', () => {
    weather.degrees = 'fahrenheit';
    unitConversion(weather.currentObject);
    if ($('.fahrenheit').hasClass('degree-inactive') === true) {
        $('.celsius').toggleClass("degree-active degree-inactive");
        $('.fahrenheit').toggleClass("degree-active degree-inactive");
    }
});

$('.expand').on('click', () => {
    if ($('.expand').hasClass('expanded') === true) {
        weather.determineDay(index);
    }
    $('.weekday-menu, .expand').toggleClass('expanded');
});


function weekOrder() {
    let order = weekdays;
    for (let day of weekdays) {
        if (day === weekdays[index]) {
            return order;
        }
        else {
            order.unshift;
            order.push(day);
        }
    }
}

function weekDisplay(array) {
    let orderNum = 1;
    for (let object of array) {
        $('.weather-tab').each(function() {
            if ($(this).hasClass(object.name) === true) {
                $(this).css('order', orderNum);
                orderNum+=1;
                $(this).on('click', () => {
                    displayWeather(object);
                });
                $(this).hover(
                    function() {
                        $(this).css('background-color', 'var(--clr-gray200)');
                    }, 
                    function() {
                        $(this).css('background-color', 'var(--clr-gray100)');
                    }
                );
            }
        });
    }
}

function displayWeather(object) {
    weather.currentObject = object;
    weather.weekdayDisplay.text(object.name);
    if (object.weather === 'sunny') {
        weather.weatherImage.attr({src:'images/sunny.svg', alt: 'sunny'});
    }
    else if (object.weather === 'cloudy') {
        weather.weatherImage.attr({src:'images/sunny_cloudy.png', alt: 'cloudy'});
    }
    else if (object.weather === 'rainy') {
        weather.weatherImage.attr({src:'images/rainy.svg', alt: 'rainy'});
    }
    weather.precipitation.text(object.precipitationValue);
    unitConversion(object);
}

function unitConversion(object) {
    if (weather.degrees === 'celsius') {
        weather.temperature.text(object.temp);
    }
    else if (weather.degrees === 'fahrenheit') {
        let fahrenheit = Math.round(object.temp * 1.8 + 32);
        weather.temperature.text(fahrenheit);
    }
}