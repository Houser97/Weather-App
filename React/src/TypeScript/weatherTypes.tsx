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
    units: string,
}

export interface forecastType {
    dt: number,
    day: string,
    date: string,
    temperature: number,
    feels_like: number,
    weather: string,
    type: string,
    humidity: number,
    pressure: number,
    windSpeed: number,
    units: string,
}

interface hourlyForecast extends forecastType {
    hour: string
}

export interface hourlyType {
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