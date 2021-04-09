import React from "react";
import { Line } from "react-chartjs-2";

function PriceChart(props) {
  let dates = [];
  let price_morele = [];
  let price_proline = [];
  let price_xkom = [];
  
  for (const historyObj of props.price_history) {

    dates.push(new Date(historyObj.history_date));


    price_morele.push(historyObj.price_morele);
    price_proline.push(historyObj.price_proline);
    price_xkom.push(historyObj.price_xkom);
  }
  dates.reverse();
  price_morele.reverse();
  price_proline.reverse();
  price_xkom.reverse();





  return (
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: "Morele",
              data: price_morele,
              fill: false,
              borderColor: 'rgb(236, 90, 73)',
              tension: 0.1
            },
            {
              label: "Proline",
              data: price_proline,
              fill: false,
              borderColor: 'rgb(45, 187, 247)',
              tension: 0.1
            },
            {
              label: "xkom",
              data: price_xkom,
              fill: false,
              borderColor: 'rgb(0, 0, 0)',
              tension: 0.1
            }
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
                maxTicksLimit: 5
              }
            }],
          },
        }} />
    </div>
  );
}

export default PriceChart;
