/**
 * ResultChart.jsx
 * Displays a horizontal bar chart of live vote results.
 * Uses Chart.js via react-chartjs-2.
 */

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultChart = ({ nominees, votes }) => {
  const labels = nominees.map((n) => `${n.symbol} ${n.name}`);
  const data = nominees.map((n) => votes[n.id] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Votes",
        data,
        backgroundColor: [
          "rgba(233, 69, 96, 0.8)",
          "rgba(22, 33, 62, 0.8)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(33, 150, 243, 0.8)",
        ],
        borderColor: [
          "#e94560",
          "#16213e",
          "#4caf50",
          "#ffc107",
          "#2196f3",
        ],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Live Vote Count",
        font: { size: 16, weight: "bold" },
        color: "#1a1a2e",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: "Number of Votes",
          color: "#666",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ResultChart;