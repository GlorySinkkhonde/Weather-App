const inputEl = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const backBtn = document.querySelector(".back-btn");
const partTwo = document.querySelector(".part-two");
const partOne = document.querySelector(".part-one");
const datesPart = document.querySelector(".dates");
const descriptionEl= document.querySelector(".description-el");
const locationEl= document.querySelector(".location-el");
const tempEl= document.querySelector(".temp-el");
const humidityEl= document.querySelector(".humidity-el");
const feelsLikeEl= document.querySelector(".feels-like-el");
const windSpeedEl= document.querySelector(".wind-speed-el");
const day1 = document.querySelector(".day-1");
const day2 = document.querySelector(".day-2");
const day3 = document.querySelector(".day-3");
const day4 = document.querySelector(".day-4");
const day5 = document.querySelector(".day-5");
const day1Temp = document.querySelector("#day1-temp");
const day2Temp = document.querySelector("#day2-temp");
const day3Temp = document.querySelector("#day3-temp");
const day4Temp = document.querySelector("#day4-temp");
const day5Temp = document.querySelector("#day5-temp");
let infoTxt = document.querySelector(".info-text")
const weatherIcons = document.querySelector(".weather-icons");

let api;

inputEl.addEventListener("keyup", (e) =>{
    if(e.key == "Enter"){
    getWeatherApi(inputEl.value);
    partOne.style.display = "none";
    partTwo.style.display = "block";
    inputEl.value = "";
    }
})

searchBtn.onclick = (e) => {

    getWeatherApi(inputEl.value);
    
}

backBtn.onclick =() =>{
    partOne.style.display = "block";
    partTwo.style.display = "none";
    
}

locationBtn.onclick = () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert("Geolocation is not supported by this browser");
    }
}



function showPosition(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    

    api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetchApi();
    
}

function fetchApi(){

    infoTxt.classList.add("pending");
    infoTxt.innerText = "Getting Weather Details...";

    fetch(api).then(function (response) {
        return response.json();
    }).then(function (results) {
        console.log(results);
        displayResults(results);
    })
}


function getWeatherApi(city){
    api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    fetchApi();
}

function displayResults(results){

    if(results.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputEl.value} isn't a valid city name`
      }else{
         //displaying results in the dates section

         day1.innerText = (results.list[0].dt_txt).slice(0,10);
         day2.innerText = (results.list[4].dt_txt).slice(0,10);
         day3.innerText = (results.list[12].dt_txt).slice(0,10);
         day4.innerText = (results.list[20].dt_txt).slice(0,10);
         day5.innerText = (results.list[28].dt_txt).slice(0,10);
 
         day1Temp.innerText = Math.trunc((results.list[0].main.temp));
         day2Temp.innerText = Math.trunc((results.list[4].main.temp));
         day3Temp.innerText = Math.trunc((results.list[12].main.temp));
         day4Temp.innerText = Math.trunc((results.list[20].main.temp));
         day5Temp.innerText = Math.trunc((results.list[28].main.temp));

         //changing weather icons

        let weatherId = results.list[0].weather[0].id

        if(weatherId == 800){
            weatherIcons.src = "./images/Weather-Icons/cloud-sun-solid white.svg";
        }else if(weatherId >= 200 && weatherId <= 232){
            weatherIcons.src = "./images/Weather-Icons/cloud-bolt-solid (3).svg";
        }else if(weatherId >= 300 && weatherId <= 321){
            weatherIcons.src = "./images/Weather-Icons/cloud-showers-water-solid white.svg";
        }else if(weatherId >= 500 && weatherId <= 531){
            weatherIcons.src = "./images/Weather-Icons/cloud-sun-rain-solid white.svg";
        }else if(weatherId >= 600 && weatherId <= 622){
            weatherIcons.src = "./images/Weather-Icons/snowflake-solid white.svg";
        }else if(weatherId >= 701 && weatherId <= 781){
            weatherIcons.src = "./images/Weather-Icons/smog-solid white.svg";
        }else if(weatherId >= 801 && weatherId <= 804){
            weatherIcons.src = "./images/Weather-Icons/cloud-solid white.svg";
        }

        console.log(weatherIcons);

}
 
         //displaying results in left and right (main) sections
 
         descriptionEl.innerText = (results.list[0].weather[0].description);
         locationEl.innerText = (results.city.name);
         tempEl.innerText = Math.trunc((results.list[0].main.temp));
         humidityEl.innerText = (results.list[0].main.humidity);
         feelsLikeEl.innerText = Math.trunc((results.list[0].main.feels_like));
         windSpeedEl.innerText = (results.list[0].wind.speed);

         partOne.style.display = "none";
         partTwo.style.display = "block";
         inputEl.value = "";
 
      }

   
        
