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
    displayWeather: function(day) {
        this.weekdayDisplay.text(day.name);
        if (day.weather === 'sunny') {
            weather.weatherImage.attr({src:'images/sunny.svg', alt: 'sunny'});
        }
        else if (day.weather === 'cloudy') {
            weather.weatherImage.attr({src:'images/sunny_cloudy.png', alt: 'cloudy'});
        }
        else if (day.weather === 'rainy') {
            weather.weatherImage.attr({src:'images/rainy.svg', alt: 'rainy'});
        }
        this.precipitation.text(day.precipitationValue);
        weather.temperature.text(day.temp);
    },
    determineDay: function(index){
        this.displayWeather(weekdays[index]);
    },
}

weather.determineDay(index);
$('.weekday-menu').removeClass('expanded');
$('.expand').removeClass('expanded');
weekDisplay(weekOrder());

$('.celsius').on('click', () => {
    weather.temperature.text(weekdays[index].temp);
    weather.degrees = 'celcius';
    if ($('.celsius').hasClass('degree-inactive') === true) {
        $('.celsius').toggleClass("degree-active degree-inactive");
        $('.fahrenheit').toggleClass("degree-active degree-inactive");
    }
});

$('.fahrenheit').on('click', () => {
    let fahrenheit = Math.round(weekdays[index].temp * 1.8 + 32);
    weather.temperature.text(fahrenheit);
    weather.degrees = 'fahrenheit';
    if ($('.fahrenheit').hasClass('degree-inactive') === true) {
        $('.celsius').toggleClass("degree-active degree-inactive");
        $('.fahrenheit').toggleClass("degree-active degree-inactive");
    }
});

$('.expand').on('click', () => {
    $('.weekday-menu').toggleClass('expanded');
    $('.expand').toggleClass('expanded');
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
                console.log(orderNum);
                orderNum+=1;
            }
        });
    }
}