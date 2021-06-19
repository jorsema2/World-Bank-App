export const appInitialState = {
  firstCountry: null,
  indicators: [],
  isFetching: false,
  page: 1,
  isLight: true,
};

export const TYPES = {
  RESET_APP: "RESET_APP",
  SELECT_CURRENT_COUNTRY: "SELECT_CURRENT_COUNTRY",
  RESET_INDICATORS: "RESET_INDICATORS",
  START_INDICATORS_FETCH: "START_INDICATORS_FETCH",
  FINISH_INDICATORS_FETCH: "FINISH_INDICATORS_FETCH",
  TOGGLE_THEME: "TOGGLE_THEME",
}


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
    case "toggleTheme": {
      return {
        ...appState,
        isLight: !appState.isLight,
      }
    }
    default:
      return appState;
  }
}
