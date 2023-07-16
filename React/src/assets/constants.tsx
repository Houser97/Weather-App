export const METRIC_OPTIONS = [{option: 'metric', unit: '°C'}, {option: 'imperial', unit: '°F'}]
export const FORECAST_OPTIONS = ['daily', 'hourly']

export const forecastDailySet = [
    {
        set: 'set1',
        number: 1
    },
    {
        set: 'set2',
        number: 2
    },
    {
        set: 'set3',
        number: 3
    },
    {
        set: 'set4',
        number: 4
    },
]

interface unitsType {
    [index: string]: unitType
}

interface unitType {
    [index: string]: string,
    pressure: string,
    humidity: string,
    wind: string,
    temperature: string,
}

export const units: unitsType = {
    metric: {
        pressure: 'hPa',
        humidity: '%',
        wind: 'km/h',
        temperature: '°C',
    },
    imperial: {
        pressure: 'hPa',
        humidity: '%',
        wind: 'mph',
        temperature: '°F',
    }
}

export const weatherDataArray = [
    {
        icon: 'WindSpeed',
        name: 'Wind Speed',
        variable: 'wind'
    },
    {
        icon: 'Humidity',
        name: 'Humidity',
        variable: 'humidity'
    },
    {
        icon: 'Barometer',
        name: 'Pressure',
        variable: 'pressure'
    }
]