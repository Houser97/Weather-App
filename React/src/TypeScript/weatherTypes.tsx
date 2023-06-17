export interface currentType {
    dt: number,
    description: string,
    humidity: number,
    pressure: number,
    temperature: number,
    icon: string,
    lat: number,
    lon: number,
    city: string,
    feels_like: number,
    wind: number,
    visibility: number,
    date: string,
    day: string,
    sunset: number,
    sunrise: number,
    hour: string,
    units: string
}

export interface forecastType {
    dt: number,
    day: string,
    date: string,
    temperature: number,
    feels_like: number,
    weather: string,
    type: string,
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
    // Otros slices y sus estados aquí...
}