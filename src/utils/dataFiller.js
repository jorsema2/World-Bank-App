function dataFiller(fetchedObject) {
    console.log(fetchedObject);
  const dataValues = fetchedObject.map((el) => {
    const value = el.value;
    return value;
  });
  const labels = fetchedObject.map((el) => {
    const label = el.date;
    return label;
  });
  const data = {
    labels: labels,
    datasets: {
      label: fetchedObject[0].indicator.value,
      data: dataValues
    }
  }
  return data;
}

export default dataFiller;


 //  data: {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3]