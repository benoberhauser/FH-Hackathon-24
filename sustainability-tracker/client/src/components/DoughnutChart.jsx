import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ currentCO2, goalCO2 }) => {
  const co2Percentage = Math.min((currentCO2 / goalCO2) * 100, 100);

  const data = {
    labels: ['Eingespartes CO₂', 'Rest zum Ziel'],
    datasets: [
      {
        label: 'CO₂ Einsparung',
        data: [co2Percentage, 100 - co2Percentage],
        backgroundColor: ['#36a2eb', '#e0e0e0'],
        borderColor: ['#36a2eb', '#e0e0e0'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    circumference: 180,
    rotation: 270,
    cutout: '70%', 
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
