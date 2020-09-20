import React, { useReducer } from "react";
import styled from "styled-components";
import { Line, Bar } from "react-chartjs-2";
import { chartReducer, chartInitialState } from "../../Reducers/chartReducer";
import Header from "../../components/Header";

const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

const Chart = (props) => {
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );

  function changeChart() {
    chartDispatch({ type: "changeChartType" });
  }
  return (
    <div>
      <Header />
      <div>
        <IndicatorName>{chartState.indicatorName}</IndicatorName>
        <div style={{ width: 1200, height: 400 }}>
          {chartState.isLine && (
            <Line
              data={chartState.chartData}
              width={100}
              height={100}
              options={{ maintainAspectRatio: false }}
            />
          )}
          {!chartState.isLine && (
            <Bar
              data={chartState.chartData}
              width={100}
              height={100}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
        <div>
          <button onClick={() => changeChart()}>Change chart type</button>
        </div>
      </div>
    </div>
  );
};

export default Chart;