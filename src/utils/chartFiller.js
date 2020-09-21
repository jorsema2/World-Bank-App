function chartObjectBuilder(years, datasets) {
  // Build the object that's going to be used as data in the chart:
  const newChartData = {
    labels: years,
    datasets: datasets,
  };

  return newChartData;
}

export default chartObjectBuilder;
