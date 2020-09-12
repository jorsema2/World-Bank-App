const allColors = [
  "rgba(255, 0, 0, 0.8)",
  "rgba(0, 255, 0, 0.8)",
  "rgba(0, 0, 255, 0.8)",
  "rgba(128, 0, 128, 0.8)",
];

export const chartInitialState = {
  isLoading: false,
  filteredOptions: [],
  isRequestValid: true,
  chosenIDs: [],
  datasets: [],
  isLine: true,
  countryColors: allColors,
  indicatorName: null,
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
    case "setFilteredOptions": {
      return {
        ...chartState,
        filteredOptions: action.payload,
      };
    }
    case "retrieveColors": {
      return {
        ...chartState,
        countryColors: allColors,
      };
    }
    case "resetDatasets": {
      return {
        ...chartState,
        datasets: action.payload,
      };
    }
    case "addDataset": {
      return {
        ...chartState,
        datasets: action.payload,
      };
    }
    case "setIndicatorName": {
      return {
        ...chartState,
        indicatorName: action.payload,
      };
    }
    case "setRemainingColors": {
      return {
        ...chartState,
        countryColors: action.payload,
      };
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
    case "uploadData": {
      return {
        ...chartState,
        chartData: action.payload,
      };
    }
    case "setChosenIDs": {
      return {
        ...chartState,
        chosenIDs: action.payload,
      };
    }
    default:
      return chartState;
  }
}
