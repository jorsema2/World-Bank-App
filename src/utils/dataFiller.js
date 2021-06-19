function dataFiller(label, data = [], color) {
  const datasets = {
    label,
    fill: false,
    data,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 5,
    pointRadius: 1,
    pointHoverRadius: 8,
  };
  return datasets;
}

export default dataFiller;
