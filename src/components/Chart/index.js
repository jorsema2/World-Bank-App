import React from "react";
import { Line, Bar } from "react-chartjs-2";

const Chart = (props) => {
  return (
    <div>
      {props.chartData && (
        <div style={{ width: 768, height: 400 }}>
          {props.isLine && (
            <Line
              data={props.chartData}
              width={100}
              height={100}
              options={{ maintainAspectRatio: false }}
            />
          )}
          {!props.isLine && (
            <Bar
              data={props.chartData}
              width={100}
              height={100}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Chart;
