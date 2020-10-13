export const appInitialState = {
  firstCountry: null,
  indicators: [],
  isFetching: false,
  page: 1,
};

export function appReducer(appState, action) {
  switch (action.type) {
    case "selectedCountry": {
      return {
        ...appState,
        firstCountry: action.payload,
      };
    }
    case "resetIndicators": {
      return {
        ...appState,
        indicators: [],
        page: 1,
      };
    }
    case "startIndicatorsFetch": {
      return {
        ...appState,
        isFetching: true,
      };
    }
    case "finishIndicatorsFetch": {
      return {
        ...appState,
        indicators: [...appState.indicators, ...action.payload],
        isFetching: false,
        page: appState.page + 1,
      };
    }
    default:
      return appState;
  }
}
