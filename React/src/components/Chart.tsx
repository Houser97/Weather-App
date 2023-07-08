import '../styles/Chart.css'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js'
import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { filterSelector } from '../redux/slices/filter'
import { DateTime } from 'luxon';
import ForecastSetSelector from './ForecastSetSelector'

interface Accumulator {
    labels: string[],
    data: number[],
    max: number,
    min: number
}

interface setSelectorProp {
    setCurrentSet: Dispatch<SetStateAction<string>>
    currentSet: string
}

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)

const ChartMinMaxOffset = 1

const Chart = ({setCurrentSet, currentSet}: setSelectorProp) => {

    const { forecastOption } = useSelector(filterSelector)

    const { current, forecastDaily, forecastHourly } = useSelector(weatherDataSelector)
    const [labels, setLabels] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun"])
    const [dataChart, setDataChart] = useState([4, 2, 5, 2, 8, 7])
    const [maxValue, setMaxValue] = useState(40)
    const [minValue, setMinValue] = useState(20)
    const [units, setUnits] = useState(current.units === 'metric' ? '°C' : '°F')

    useEffect(() => {
        setUnits(current.units === 'metric' ? '°C' : '°F')
    }, [current.units])

    const getforecastDailyData = () => {
        return forecastDaily.reduce((acc: Accumulator, forecast) => {
            const temperature = forecast.temperature
            const date = DateTime.fromFormat(forecast.date, 'M/d/yyyy', { locale: 'en-US' })
            const label = date.toFormat('EEEE, MMM d');
            acc.labels = [...acc.labels, label]
            acc.data = [...acc.data, temperature]
            acc.max = Math.max(acc.max, temperature)
            acc.min = Math.min(acc.min, temperature)
            return acc
          }, {labels: [], data: [], max: -Infinity, min: Infinity})
    }

    const getforecastHourlyData = () => {
        return forecastHourly[currentSet].reduce((acc: Accumulator, forecast) => {
            const temperature = forecast.temperature
            const date = DateTime.fromFormat(forecast.date, 'M/d/yyyy', { locale: 'en-US' })
            const label = date.toFormat('EEE MMM d, ') + forecast.hour;
            acc.labels = [...acc.labels, label]
            acc.data = [...acc.data, temperature]
            acc.max = Math.max(acc.max, temperature)
            acc.min = Math.min(acc.min, temperature)
            return acc
          }, {labels: [], data: [], max: -Infinity, min: Infinity})
    }

    useEffect(() => {
        //Acá se debe escoger el set a iterar cuando el forecast sea hourly
      const data = forecastOption === 'daily' ? getforecastDailyData() : getforecastHourlyData()

      setLabels(data.labels)
      setDataChart(data.data)
      setMaxValue(Math.ceil(data.max + ChartMinMaxOffset))
      setMinValue(Math.ceil(data.min - ChartMinMaxOffset))
    
    }, [current.city, forecastOption, current.units, currentSet])
    

    const data = {
    labels: labels,
    datasets: [{
      label: "First dataset",
      data: dataChart,
      fill: "start",
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(250,174,50,1)");
        gradient.addColorStop(1, "rgba(250,174,50,0)");
        return gradient;
      },
      borderColor: "#F28C38",
      pointBorderColor: "#F28C38",
      pointBorderWidth: 1,
      tension: 0.5,
      borderWidth: 6
    }]
    }

    const options: any = {
        responsive: true,
        maintainAspectRatio: false, //Permite especificar altura y ancho de gráfica en CSS.
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },

            },
            y: {
                min: minValue,
                max: maxValue,
                ticks: {
                    stepSize: 2,
                    callback: (value: number) => value + units
                },
                grid: {
                    display: false
                }
            }
        }
    }

  return (
    <div className='chart__forecastSelector'>
        <div className='chart-set-selector'>
            <ForecastSetSelector setCurrentSet={setCurrentSet} currentSet = {currentSet} visible = {forecastOption === 'hourly'} />
        </div>
        <div className='chart-container'>
            <Line data={data} options={options}></Line>
        </div>
    </div>
  )
}

export default Chart