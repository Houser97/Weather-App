import "./style.css";

const displayObject = (() => {
  const display = {
    name: "", temperature: "", description: "", latitude: "", longitude: "",
  };

  const addData = (name, temperature, description, latitude, longitude) => {
    display.name = name;
    display.temperature = temperature;
    display.description = description;
    display.latitude = latitude;
    display.longitude = longitude;
  };

  return { addData, display };
})();

const flow = ((doc) => {
  const form = doc.querySelector("form");

  function getInputValue() {
    const input = doc.querySelector("input");
    const city = input.value;
    input.value = "";
    return city;
  }

  function changeDisplay(display) {
    const title = doc.querySelector(".city-section");
    title.textContent = display.name;
    const temperatureValue = doc.querySelector(".value-temperature");
    temperatureValue.textContent = display.temperature;
    const descriptionDisplay = doc.querySelector(".description-data");
    descriptionDisplay.textContent = display.description;
    const logitudeDisplay = doc.querySelector(".longitude-data");
    logitudeDisplay.textContent = display.longitude;
    const latitudeDisplay = doc.querySelector(".latitude-data");
    latitudeDisplay.textContent = display.latitude;
  }

  function changeImageBackground(display) {
    const img = doc.querySelector("img");
    if (display.description === "few clouds") img.src = "few-clouds.jpg";
    else if (display.description === "overcast clouds") img.src = "Overcast-clouds.jpg";
    else if (display.description === "broken clouds") img.src = "broken-clouds.jpg";
    else if (display.description === "clear sky") img.src = "Clear-sky.jpg";
    else img.src = "Background.jpg";
  }

  function getAPI(e) {
    e.preventDefault();
    const city = getInputValue();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
      .then((response) => response.json())
      .then((response) => {
        const namePlace = response.name;
        const temperature = response.main.temp;
        const descriptionWeather = response.weather[0].description;
        const latitude = response.coord.lat;
        const longitude = response.coord.lon;

        displayObject.addData(namePlace, temperature, descriptionWeather, latitude, longitude);
        changeDisplay(displayObject.display);
        changeImageBackground(displayObject.display);
        console.log(response);
      })
      .catch(() => {
        console.log("Error");
      });
  }

  return { form, getAPI };
})(document);

flow.form.addEventListener("submit", flow.getAPI);
