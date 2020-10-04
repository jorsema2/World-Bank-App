function dataFiller(label, data = [], borderColor) {


    const datasets = {
      label,
      data,
      backgroundColor: ["rgba(255, 255, 255, 0)"],
      borderColor,
      borderWidth: 8,
    };
    return datasets;

}

export default dataFiller;
