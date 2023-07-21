import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Progress Over Time",
    },
  },
};

const ProgressGraph = ({
  learnedWordsData,
  learnedWordsDates,
  reviewedWordsData,
  reviewedWordsDates,
}) => {
  const data = {
    labels: learnedWordsDates,
    reviewedWordsDates,
    datasets: [
      {
        label: "Words Learned",
        data: learnedWordsData,
        borderColor: "rgba(121, 80, 242)",
        backgroundColor: "rgba(121, 80, 242, 0.5)",
      },
      {
        label: "Words Reviewed",
        data: reviewedWordsData,
        borderColor: "rgba(96, 167, 168)",
        backgroundColor: "rgba(96, 167, 168, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ProgressGraph;
