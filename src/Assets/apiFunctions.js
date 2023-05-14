const capitalizeFirstLetter = (word) => {
    let firstLetter = word.charAt(0)
    let firstLetterCap = firstLetter.toUpperCase()
    return firstLetterCap + word.slice(1)
}

const getDateFromDT = (dt) => {
    const dateRaw = new Date(dt * 1000)
    const date = dateRaw.toLocaleDateString()
    const day = dateRaw.toLocaleString('en-US', { weekday: 'long' });
    return {day, date}
}

const getHourFromDT = (dt) => {
    const rawDate = new Date(dt * 1000)
    return rawDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true})
}

const getCityCoords = async (city) => {
    const coordsDataRaw = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
    const coordsData = await coordsDataRaw.json()
    return coordsData.length ? {lat: coordsData[0].lat, lon: coordsData[0].lon} : false
}

export const fetchWeatherData = async (city) => {
    const coords = await getCityCoords(city)
    if(!coords) return false 
    const {lat, lon} = await getCityCoords(city)
    const weatherDataRaw = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
    const {current, daily, hourly} = await weatherDataRaw.json()
    const {humidity, pressure, temp, visibility, wind_speed, weather, feels_like, dt} = current
    const {day, date} = getDateFromDT(dt)

    const currentData = {
        dt,
        description: capitalizeFirstLetter(weather[0].description),
        humidity: humidity,
        pressure: pressure,
        temperature: temp,
        icon: weather[0].main,
        lat,
        lon,
        city,
        feels_like,
        wind: wind_speed,
        visibility,
        date,
        day
    }

    const forecastData = []

    for(const forecast of daily){
        const dt = forecast.dt;
        const {day, date} = getDateFromDT(dt)
        const data = {
        dt,
        day,
        date,
        temperature: forecast.temp.day,
        feels_like: forecast.feels_like.day,
        weather: forecast.weather[0].main,
        type: 'daily',
        city //Se agrega para mejorar KEY al momento de renderizar ForecastCard en Forecast.
        }
        forecastData.push(data)
    }

    const forecastDataHourly = {set1: [], set2: [], set3:[], set4:[]}

    hourly.map((forecast, index) => {
        const dt = forecast.dt;
        const hour = getHourFromDT(dt)
        const {day, date} = getDateFromDT(dt)
        const data = {
        dt,
        hour,
        date,
        day,
        temperature: forecast.temp,
        feels_like: forecast.feels_like,
        weather: forecast.weather[0].main,
        type: 'hourly'
        }

        if(index < 12){
        forecastDataHourly.set1.push(data)   
        } else if(index < 24){
        forecastDataHourly.set2.push(data)  
        } else if(index < 36){
        forecastDataHourly.set3.push(data)  
        } else{
            forecastDataHourly.set4.push(data)  
        }
    })

    return {current: currentData, forecast: forecastData, hourly: forecastDataHourly, hasData: true}
}