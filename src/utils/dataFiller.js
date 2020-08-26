function dataFiller(fetchedObject) {
  try{
    const countryName = fetchedObject[0].country.value;
    /* 
    This fetched data shows newest year to oldest year, but we want the opposite. 
    So, we reverse both arrays (years' values and years): 
    */
    const dataValues = fetchedObject.map((el) =>  el.value).reverse();
    const labels = fetchedObject.map((el) => el.date).reverse();
    const chartData = {
      labels: labels,
      datasets: [{
        label: fetchedObject[0].indicator.value,
        data: dataValues,
        backgroundColor: [
          'rgba(0, 99, 132, 0.2)'
        ],
        borderColor: [
        ],
        borderWidth: 2
      }]
    }
    return [countryName, chartData];
  }catch(err){
    return []
  }
 
}

export default dataFiller;