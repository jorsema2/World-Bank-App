export const chartInitialState = {
  isLoading: false,
  isRequestValid: true,
  datasets: [],
  years: [],
  isLine: true,
  indicatorName: null,
  // ChartData is only used in one useEffect. It's unnecessary.
  // However, if it's deleted, chartPage always shows "not-found". Review!
  chartData: {},
  areIndicatorsShown: false,
};

export function chartReducer(chartState, action) {
  switch (action.type) {
    case "invalidateRequest": {
      return {
        ...chartState,
        isRequestValid: false,
      };
    }
    case "validateRequest": {
      return {
        ...chartState,
        isRequestValid: true,
      };
    }
    case 'FETCH_DATA_SUCCESS':{
      return {
        ...chartState,
        ...action.payload,
        isLoading: false,
      }
    }
    case "changeChartType": {
      return {
        ...chartState,
        isLine: !chartState.isLine,
      };
    }
    case "openIndicators": {
      return {
        ...chartState,
        areIndicatorsShown: true,
      };
    }
    case "closeIndicators": {
      return {
        ...chartState,
        areIndicatorsShown: false,
      };
    }
    case "startLoading": {
      return {
        ...chartState,
        isLoading: true,
      };
    }
    case "finishLoading": {
      return {
        ...chartState,
        isLoading: false,
      };
    }
    default:
      return chartState;
  }
}
