import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { currentType, hourlyType, forecastType, weatherDataType, RootState } from "../../TypeScript/weatherTypes";
import { fetchWeatherData } from '../../assets/apiWeatherFunctions'

const currentInitialValue: currentType = {
    dt: 0,
    description: '',
    humidity: 0,
    pressure: 0,
    temperature: 0,
    icon: '',
    min: 0,
    max: 0,
    lat: 0,
    lon: 0,
    city: '',
    feels_like: 0,
    wind: 0,
    visibility: 0,
    date: '',
    day: '',
    sunset: '00:00 AM',
    sunrise: '00:00 AM',
    sunriseDt: 0,
    sunsetDt: 0,
    hour: '00:00',
    units: ''
}

const forecastElementDailyInitialValue: forecastType = {
    dt: 0,
    day: '',
    date: '',
    temperature: 0,
    feels_like: 0,
    weather: '',
    type: 'daily',
    humidity: 0,
    pressure: 0,
    windSpeed: 0,
    units: ''    
}

const forecastDailyInitialValue: forecastType[] = Array(1).fill(forecastElementDailyInitialValue)

const forecastHourlyInitialValue: hourlyType = {
    set1: [
        { 
            ...forecastElementDailyInitialValue,
            hour: '00:00'
        }
    ],
    set2: [
        { 
            ...forecastElementDailyInitialValue,
            hour: '00:00'
        }
    ],
    set3: [
        { 
            ...forecastElementDailyInitialValue,
            hour: '00:00'
        }
    ],
    set4: [
        { 
            ...forecastElementDailyInitialValue,
            hour: '00:00'
        }
    ],

}

const initialState: weatherDataType = {
    current: currentInitialValue,
    forecastDaily: forecastDailyInitialValue,
    forecastHourly: forecastHourlyInitialValue,
    hasData: false,
    isLoading: false,
    isCityValid: true
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeatherData: (state) => {
            state.isLoading = true
        },
        getDataSuccess: (state, {payload}) => {
            state.current = payload.current
            state.forecastDaily = payload.forecast
            state.forecastHourly = payload.hourly
            state.isLoading = false
            state.hasData = true
            state.isCityValid = true
        },
        setIsLoading: (state) => {
            state.isLoading = false
        },
        getDataFailure: (state) => {
            state.hasData = false //Trabajar en este reducer, pendiente.
        },
        setCityValidation: (state, {payload}) => {
            state.isCityValid = payload.cityValidation
        }
    }
})

export const {
    getWeatherData,
    getDataSuccess,
    setIsLoading,
    getDataFailure,
    setCityValidation
} = weatherSlice.actions

export const weatherDataSelector = (state: RootState) => state.weather
//Ya que en la store se guardó al SLICE como weather, se debe agregar esta palabra como propiedad del state.
//RootState

export default weatherSlice.reducer

//Se define función que busca la data del clima. Esta función estaba anteriormente en el componente de Search.
export const fetchWeatherDataRedux = (city: string, tempUnit: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(getWeatherData())

        try{
            const weatherData = await fetchWeatherData(city, tempUnit)
            // Si las coordenadas no son válidas fetchWeatherData retorna false
            if(weatherData){ 
                const {current, forecast, hourly} = weatherData
                dispatch(getDataSuccess({current, forecast, hourly}))
                dispatch(setCityValidation({cityValidation: true}))
            } else {
                dispatch(setCityValidation({cityValidation: false}))
                dispatch(setIsLoading())
            }
        } catch(error){
            dispatch(getDataFailure())
        }
    }
}