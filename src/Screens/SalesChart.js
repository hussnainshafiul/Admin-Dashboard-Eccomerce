import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';


const SalesChart = () => {
  const [salesData, setSalesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesSnapshot = await firebase.firestore().collection("orders").get();
        const salesByMonth = new Array(12).fill(0);

        salesSnapshot.forEach((doc) => {
          const order = doc.data();
          const timestamp = order.timestamp.toDate();
          const month = timestamp.getMonth();
          salesByMonth[month]++;
        });

        // Define colors for each month
        const colors = [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)", // February
        '#FF8042',
        '#0088FE', '#00C49F', '#FFBB28', '#AF19FF', '#FF1952',
          "rgba(75, 192, 192, 0.6)", // October
          "rgba(153, 102, 255, 0.6)", // November
          "rgba(255, 159, 64, 0.6)" // December
        ];

        // Create data for the bar chart with colors for each month
        setSalesData({
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "Number of Sales",
              backgroundColor: colors,
              borderColor: '#00C49F',
              borderWidth: 1,
              data: salesByMonth
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <h1>Number of Sales by Month</h1>
      <div style={{ height: "400px", width: "600px" }}>
        {salesData.datasets && (
          <Bar
            data={salesData}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SalesChart;
