import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const RenderLineChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    type: "line",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 5,
          usePointStyle: true,
          fontSize: "12px",
          color: "#101010",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
          color: "#101010",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: true,
          color: "#101010",
          stepSize: 200,
        },
        // to remove the y-axis grid
        grid: {
          display: true,
        },
        border: {
          dash: [2, 2],
        },
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};
