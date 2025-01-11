// components/MonthlyRevenueChart.js
import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  BarElement,
  ArcElement,
  Legend,
} from "chart.js";
import dynamic from 'next/dynamic';

const useTranslation = dynamic(() => import('react-i18next'), { ssr: false });


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [
          1200, 1900, 3000, 5000, 2300, 3400, 4000, 4800, 3000, 4200, 5000,
          6000,
        ],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Curved lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  return (
    <div className=" flex flex-col m-12 gap-12">
      <h1 className=" text-black">{}</h1>
      <Bar data={data} options={options} />
      <Line data={data} options={options} />
      <Doughnut data={data} options={options} />;
    </div>
  );
};

export default Dashboard;
