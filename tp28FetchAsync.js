//SELECTEUR
let titleCitySelector = document.querySelector("#city-name-js");
let weatherParagraphSelector = document.querySelector("#actual-weather-js");
let paragraphTempSelector = document.querySelector("#temp-js");
let iconImgSelector = document.querySelector("img");
let userInputSelector = document.querySelector("#input-city-js");
let validationSelector = document.querySelector("#validation-js");

//variable pour le fetch
let url = "http://api.openweathermap.org/data/2.5/weather?";
let city = "Montpellier";
let apiKey = "48ec351e62163ca3d1c6d625c60da787";

let weatherRequestSecondWay = async () => {
  const response = await fetch(
    `${url}q=${city}&appid=${apiKey}&units=metric&lang=fr`
  ); // Generate the Response object
  if (response.ok) {
    const jsonValue = await response.json(); // Get JSON value from the response body
    return Promise.resolve(jsonValue);
  }
};

validationSelector.addEventListener("click", () => {
  city = userInputSelector.value;
  weatherRequestSecondWay()
    .then((response) => {
      titleCitySelector.textContent = response.name;
      weatherParagraphSelector.textContent = `${response.weather[0].description}`;
      iconImgSelector.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`
      );
      paragraphTempSelector.textContent = `${Math.floor(response.main.temp)}°`;
    })
    .catch((e) => {
      titleCitySelector.textContent = `la requete n'a pas fonctionné ${e}`;
    });
});
