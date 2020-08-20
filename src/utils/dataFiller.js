function dataFiller(fetchedObject) {
  const countryName = fetchedObject[0].country.value;
  const dataValues = fetchedObject.map((el) => {
    const value = el.value;
    return value;
  });
  const labels = fetchedObject.map((el) => {
    const label = el.date;
    return label;
  });
  const chartData = {
    labels: labels.reverse(),
    datasets: [{
      label: fetchedObject[0].indicator.value,
      data: dataValues.reverse(),
      backgroundColor: [
        'rgba(0, 99, 132, 0.2)'
      ],
      borderColor: [
      ],
      borderWidth: 2
    }]
  }
  const data = [countryName, chartData];
  return data;
}

export default dataFiller;