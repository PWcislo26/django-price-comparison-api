import React from "react";
import { Line } from "react-chartjs-2";

function PriceChart(props) {

  let dates = [];
  let prices = [];

  for (const historyObj of props.chartData) {

    dates.push(new Date(historyObj.history_date).toDateString());


    prices.push(historyObj.product_price);
    
  }
  dates.reverse();
  prices.reverse();
  
  return (
    
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: props.retailer,
              data: prices,
              fill: false,
              borderColor: 'rgb(236, 90, 73)',
              tension: 0.0
            },
          ],
        }}
        height={600}
        width={900}
        options={{
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7
              }
            }],
          },
        }} />
    </div>
  );
}

export default PriceChart;
