export interface currentType {
    [index: string]: string | number
    dt: number,
    description: string,
    humidity: number,
    pressure: number,
    temperature: number,
    min: number,
    max: number,
    icon: string,
    lat: number,
    lon: number,
    city: string,
    feels_like: number,
    wind: number,
    visibility: number,
    date: string,
    day: string,
    sunset: string,
    sunrise: string,
    sunsetDt: number,
    sunriseDt: number,
    hour: string,
    uvi: number,
    units: string,
}

export interface forecastType {
    dt: number,
    day: string,
    date: string,
    temperature: number,
    feels_like: number,
    weather: string,
    sunrise: number,
    sunset: number,
    type: string,
    humidity: number,
    pressure: number,
    windSpeed: number,
    units: string,
}

export interface hourlyForecast extends forecastType {
    hour: string
}

export interface hourlyType {
    [index: string]: hourlyForecast[], // Signature Index para dinámicamente acceder a keys en getforecastHourlyData()
    set1: hourlyForecast[],
    set2: hourlyForecast[],
    set3: hourlyForecast[],
    set4: hourlyForecast[]
}

export interface weatherDataType {
    current: currentType,
    forecastDaily: forecastType[],
    forecastHourly: hourlyType,
    hasData: boolean,
    isLoading: boolean,
    isCityValid: boolean
}

export interface RootState {
    weather: weatherDataType;
}

export interface sunsetSunriseDataType {
    [index: string]: {
        sunset: number,
        sunrise: number
    }
}