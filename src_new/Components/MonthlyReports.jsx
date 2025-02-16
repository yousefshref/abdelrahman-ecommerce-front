import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const MonthlyReports = () => {
  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-5 h-full">
      <div className="flex justify-between items-center">
        <MdKeyboardDoubleArrowDown className="text-green-600 text-xl" />
        <h3 className="text-2xl md:text-4xl font-light text-white">
          Monthly Report
        </h3>
      </div>
      <div className="mt-10 md:h-1/2 h-3/4">
        <Line
          data={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Argivit",
                data: [0, 10, 20, 30, 40],
              },
              {
                label: "Creatin",
                data: [10, 0, 20, 15],
              },
              {
                label: "Protin",
                data: [20, 30, 50, 40],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyReports;
