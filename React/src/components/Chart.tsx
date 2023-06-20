import '../styles/Chart.css'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
} from 'chart.js'
import { useSelector } from 'react-redux'
import { weatherDataSelector } from '../redux/slices/weather'
import { useEffect, useState } from 'react'

interface Accumulator {
    labels: string[],
    data: number[],
    max: number,
    min: number
}

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    //Filler,
)

const ChartMinMaxOffset = 0.5

const Chart = () => {

    const { current, forecastDaily } = useSelector(weatherDataSelector)
    const [labels, setLabels] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun"])
    const [dataChart, setDataChart] = useState([4, 2, 5, 2, 8, 7])
    const [maxValue, setMaxValue] = useState(40)
    const [minValue, setMinValue] = useState(20)

    useEffect(() => {
      const data = forecastDaily.reduce((acc: Accumulator,forecast) => {
        const temperature = forecast.temperature
        const label = forecast.day
        acc.labels = [...acc.labels, label]
        acc.data = [...acc.data, temperature]
        acc.max = Math.max(acc.max, temperature)
        acc.min = Math.min(acc.min, temperature)
        return acc
      }, {labels: [], data: [], max: -Infinity, min: Infinity})

      setLabels(data.labels)
      setDataChart(data.data)
      setMaxValue(data.max + ChartMinMaxOffset)
      setMinValue(data.min - ChartMinMaxOffset)
    
    }, [current.city])
    

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
                    callback: (value: number) => value + '°C'
                },
                grid: {
                    display: false
                }
            }
        }
    }

  return (
    <div className='chart-container'>
        <Line data={data} options={options}></Line>
    </div>
  )
}

export default Chart