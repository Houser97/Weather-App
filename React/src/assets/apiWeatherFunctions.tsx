import { hourlyForecast, hourlyType, sunsetSunriseDataType } from "../TypeScript/weatherTypes"

interface Coordinates {
    lat: number,
    lon: number
}

export const capitalizeFirstLetter = (word: string) => {
    let firstLetter = word.charAt(0)
    let firstLetterCap = firstLetter.toUpperCase()
    return firstLetterCap + word.slice(1)
}

const getDateFromDT = (dt: number, timezone: string) => {
    const dateRaw = new Date(dt * 1000)
    const options = { timeZone: timezone};
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options); //Se formatea la fecha según el timezone para
    //evitar problemas de calcular incorrectamente isDay en ForecastCard.
    const day = dateRaw.toLocaleString('en-US', { weekday: 'long', timeZone: timezone });
    return {day, date: dateTimeFormat.format(dateRaw)}
}

const getHourFromDT = (dt: number, timezone: string) => {
    const rawDate = new Date(dt * 1000)
    return rawDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: timezone})
}

const getHourFromDT24 = (dt: number, timezone: string) => {
    const rawDate = new Date(dt * 1000)
    return rawDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hourCycle: 'h23', timeZone: timezone})
}

const getCityCoords = async (city: string) => {
    const coordsDataRaw = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
    const coordsData = await coordsDataRaw.json()
    return coordsData.length ? {lat: coordsData[0].lat, lon: coordsData[0].lon} : false
}

export const fetchWeatherData = async (city: string, units = 'metric') => {
    const coords = await getCityCoords(city)
    if(!coords) return false 
    const {lat, lon}: Coordinates = coords
    const weatherDataRaw = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=${units}&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
    const {current, daily, hourly, timezone} = await weatherDataRaw.json()
    const {humidity, pressure, temp, visibility, wind_speed, weather, feels_like, dt, sunset, sunrise, uvi} = current
    const {day, date} = getDateFromDT(dt, timezone)
    const hour = getHourFromDT24(dt, timezone)
    const sunsetFormatted = getHourFromDT(sunset, timezone)
    const sunriseFormatted = getHourFromDT(sunrise, timezone)
    const currentData = {
        dt,
        description: capitalizeFirstLetter(weather[0].description),
        humidity: humidity,
        pressure: pressure,
        temperature: temp,
        max: daily[0].temp.max,
        min: daily[0].temp.min,
        feelsDay: daily[0].feels_like.day,
        feelsNight: daily[0].feels_like.night,
        icon: weather[0].main,
        lat,
        lon,
        city,
        feels_like,
        wind: wind_speed,
        visibility,
        date,
        day,
        sunset: sunsetFormatted,
        sunrise: sunriseFormatted,
        sunsetDt: sunset,
        sunriseDt: sunrise,
        hour,
        uvi,
        units //Se agrega el valor del estado unitTemp para garantizar que todo se renderice al mismo
        // tiempo en lugar de que las unidades primero y luego el valor dado por la API.
    }

    const forecastData = []
    const sunsetSunriseData: sunsetSunriseDataType = {} // Se usa para saber en Sunrise y Sunset en los días de predicción, lo cual se usa
    //para determinar si es día o noche en el forecast de daily

    for(const forecast of daily){
        const dt = forecast.dt;
        const {day, date} = getDateFromDT(dt, timezone)
        const sunrise = forecast.sunrise
        const sunset = forecast.sunset
        const data = {
        dt,
        day,
        date,
        temperature: forecast.temp.day,
        feels_like: forecast.feels_like.day,
        weather: forecast.weather[0].main,
        type: 'daily',
        sunrise,
        sunset,
        pressure: forecast.pressure,
        humidity: forecast.humidity,
        windSpeed: forecast.wind_speed,
        units,
        }
        forecastData.push(data)
        sunsetSunriseData[date] = {sunrise, sunset}
    }

    const forecastDataHourly: hourlyType = {set1: [], set2: [], set3:[], set4:[]}
    hourly.map((forecast: any, index: number) => {
        const dt = forecast.dt;
        const hour = getHourFromDT(dt, timezone)
        const {day, date} = getDateFromDT(dt, timezone)
        const data: hourlyForecast = {
        dt,
        sunrise: sunsetSunriseData[date]['sunrise'],
        sunset: sunsetSunriseData[date]['sunset'],
        hour,
        date,
        day,
        temperature: forecast.temp,
        feels_like: forecast.feels_like,
        pressure: forecast.pressure,
        humidity: forecast.humidity,
        windSpeed: forecast.wind_speed,
        weather: forecast.weather[0].main,
        units,
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