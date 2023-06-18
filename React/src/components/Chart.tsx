import '../styles/Chart.css'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
)

const Chart = () => {
    const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "First dataset",
      data: [4, 2, 5, 2, 8, 7],
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
      borderWidth: 4
    }]
    }

    const options: any = {
        responsive: true,
        plugins: {
            legend: false
        },
        scales: {
            xAxes: [{gridLines: { color: "green" }}],
            yAxes: [{gridLines: { color: "#131c2b" }}],
            x: {
                grid: {
                    display: false,
                    color: 'gray',
                    borderColor: 'green'
                },

            },
            y: {
                min: -2,
                max: 10,
                ticks: {
                    stepSize: 2,
                    callback: (value: number) => value + 'K'
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