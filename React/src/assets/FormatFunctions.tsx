import ForecastCard from "../components/ForecastCard"
import { currentType, forecastType, hourlyForecast, hourlyType } from "../TypeScript/weatherTypes"

export const getforecastDailyData = (forecastDaily: forecastType[], current: currentType) => {
    return forecastDaily.map((forecastData, index) => {
      return(
        <ForecastCard data={forecastData} key={`forecast-daily-${index}-${current.city}`} />
      )
    })
  }

export const getforecastHourlyData = (forecastHourly: hourlyType, current: currentType) => {
    const sets = Object.keys(forecastHourly)
    const data = sets.reduce((acc, set: string) => {
        return [...acc, ...forecastHourly[set]]
    }, [] as hourlyForecast[])

    return data.map((forecastData, index) => {
        return(
        <ForecastCard data={forecastData} key={`forecast-hourly-${index}-${current.city}`} />
        )
    })
}