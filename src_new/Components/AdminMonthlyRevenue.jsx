import React from "react";
import { Bar } from "react-chartjs-2";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { server } from "../Variables/pathes";

const AdminMonthlyRevenue = ({ year, setYear, month, setMonth }) => {
  const [data, setData] = React.useState([]);

  const [chartYear, setChartYear] = React.useState(year);
  React.useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get(`${server}/get_total_orders_price_per_month/?year=${chartYear}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the monthly revenue data", error);
      }
    };

    fetchMonthlyRevenue();
  }, [year, chartYear]);




  // 
  const monthMap = {
    "January": 1, "February": 2, "March": 3, "April": 4,
    "May": 5, "June": 6, "July": 7, "August": 8,
    "September": 9, "October": 10, "November": 11, "December": 12
  };

  function getMonthNumber(monthName) {
    return monthMap[monthName] || null; // Returns null if not found
  }

  return (
    <div className="bg-[#0f0f0f] sm:py-5 py-5 sm:px-10 px-5 rounded-2xl w-full h-[60vh]">
      <div className="flex justify-between items-center">
        <div className="flex items-center bg-green-700 w-fit px-2 rounded gap-2 text-xl font-semibold cursor-pointer" onClick={(r) => {
          const userInput = prompt("Enter Year:", year)
          setYear(userInput)
          setChartYear(userInput)
        }}>
          <FaCalendarAlt />
          {year}
        </div>
        <p className="text-3xl font-semibold">الارباح الشهرية</p>
      </div>
      <Bar
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              label: "# of Votes",
              data: Object.values(data),
              backgroundColor: (context) => {
                const index = context.dataIndex;
                const label = Object.keys(data)[index];
                return month === getMonthNumber(label) ? 'green' : 'rgba(255, 99, 132, 0.2)'
              },
              borderColor: (context) => {
                const index = context.dataIndex;
                const label = Object.keys(data)[index];
                return month === getMonthNumber(label) ? 'green' : 'rgba(255, 99, 132, 1)'
              },
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const chartElement = elements[0];
              const label = Object.keys(data)[chartElement.index];
              const convertedMonth = getMonthNumber(label);

              if (convertedMonth == month) {
                setMonth('');
              } else {
                setMonth(convertedMonth)
              }
            }
          },
        }}
      />
    </div>
  );
};

export default AdminMonthlyRevenue;
