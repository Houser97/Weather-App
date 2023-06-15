interface Coordinates {
    lat: number,
    lon: number
}

interface forecastType {
    dt: number,
    day: string,
    date: string,
    temperature: number,
    feels_like: number,
    weather: string,
    type: string,
    units: string, 
    hour?: string
}

interface hourlyType {
    set1: Array<forecastType>,
    set2: Array<forecastType>,
    set3: Array<forecastType>,
    set4: Array<forecastType>
}

const capitalizeFirstLetter = (word: string) => {
    let firstLetter = word.charAt(0)
    let firstLetterCap = firstLetter.toUpperCase()
    return firstLetterCap + word.slice(1)
}

const getDateFromDT = (dt: number) => {
    const dateRaw = new Date(dt * 1000)
    const date = dateRaw.toLocaleDateString()
    const day = dateRaw.toLocaleString('en-US', { weekday: 'long' });
    return {day, date}
}

const getHourFromDT = (dt: number) => {
    const rawDate = new Date(dt * 1000)
    return rawDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true})
}

const getHourFromDT24 = (dt: number, timezone: string) => {
    const rawDate = new Date(dt * 1000)
    return rawDate.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: false, timeZone: timezone})
}

const getCityCoords = async (city: string) => {
    const coordsDataRaw = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
    const coordsData = await coordsDataRaw.json()
    return coordsData.length ? {lat: coordsData[0].lat, lon: coordsData[0].lon} : false
}

export const fetchWeatherData = async (city: string, units = 'metric') => {
    const coords = await getCityCoords(city)
    if(!coords) return false 
    const {lat, lon}: Coordinates = coords
    const weatherDataRaw = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=${units}&appid=a17d8aca84846ee500b328a8df181e45`, { mode: "cors" })
    const {current, daily, hourly, timezone} = await weatherDataRaw.json()
    const {humidity, pressure, temp, visibility, wind_speed, weather, feels_like, dt, sunset, sunrise} = current
    const {day, date} = getDateFromDT(dt)
    const hour = getHourFromDT24(dt, timezone)
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
        day,
        sunset,
        sunrise,
        hour,
        units //Se agrega el valor del estado unitTemp para garantizar que todo se renderice al mismo
        // tiempo en lugar de que las unidades primero y luego el valor dado por la API.
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
        city, //Se agrega para mejorar KEY al momento de renderizar ForecastCard en Forecast.
        units    
        }
        forecastData.push(data)
    }

    const forecastDataHourly: hourlyType = {set1: [], set2: [], set3:[], set4:[]}

    hourly.map((forecast: any, index: number) => {
        const dt = forecast.dt;
        const hour = getHourFromDT(dt)
        const {day, date} = getDateFromDT(dt)
        const data: forecastType = {
        dt,
        hour,
        date,
        day,
        temperature: forecast.temp,
        feels_like: forecast.feels_like,
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