"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  console.log("DoughnutChart");
  console.log({ accounts: accounts });

  const accountBalances = accounts.map((account) => account.currentBalance);
  const accountLabels = accounts.map((account) => account.name);

  const data = {
    datasets: [
      {
        label: "Banks",
        data: accountBalances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: accountLabels,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "50%",
        plugins: {
          legend: { display: false },
        },
      }}
    />
  );
};

export default DoughnutChart;
