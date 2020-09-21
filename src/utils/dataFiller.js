function dataFiller(newCountryName, newDataValues, newColor) {
  try {
    const datasets = {
      label: newCountryName,
      data: newDataValues,
      backgroundColor: ["rgba(255, 255, 255, 0)"],
      borderColor: newColor,
      borderWidth: 8,
    };
    return datasets;
  } catch (err) {
    return [];
  }
}

export default dataFiller;
