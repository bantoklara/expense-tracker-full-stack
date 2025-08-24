import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Title,
    Tooltip,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Title,
    Tooltip,
    Filler
);

const MonthlyStatistic = ({ expenses }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, 
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                grid: {
                    display: false,
                },
            },
        },
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        const sorted = expenses
            .filter((exp) => new Date(exp.date).getMonth() === new Date().getMonth())
            .sort((exp1, exp2) => new Date(exp1.date).getDate() - new Date(exp2.date).getDate())
        const month = new Date(sorted[0].date).toLocaleString('default', { month: 'short' })
        const xCoordinate = [... new Set(sorted.map(exp => `${month} ${new Date(exp.date).getDate()}`))]
        const yCoordinate = [...Array(xCoordinate.length).keys()].map(i => 0);

        let maxYValue = 0;
        for (let i = 0, index = 0; i < sorted.length; i++) {
            if (i !== 0 && new Date(sorted[i].date).getDate() !== new Date(sorted[i - 1].date).getDate())
                index++;
            yCoordinate[index] += Number(sorted[i].amount);
            if (maxYValue < yCoordinate[index]) {
                maxYValue = yCoordinate[index]
            }
        }

        setData({
            labels: xCoordinate,
            datasets: [
                {
                    fill: true,
                    data: yCoordinate,
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return "purple";
                        }

                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, "rgba(118, 13, 160, 0.3)");
                        gradient.addColorStop(1, "rgba(118, 13, 160, 1)");
                        return gradient;
                    },
                    lineTension: 0.3,
                    pointRadius: 0
                }
            ]
        })
    }, [expenses]);

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ minWidth: "350px" }}>
                {data && <Line options={options} data={data} />}
            </div>
        </div>
    )
}

export default MonthlyStatistic
