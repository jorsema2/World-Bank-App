function dataFiller(newCountryName, newDataValues, newColor) {
  try{
    const datasets = {
      label: newCountryName,
      data: newDataValues,
      backgroundColor:[
        newColor
      ],
      borderColor: [
      ],
      borderWidth: 2
    }
    return datasets;
  }catch(err){
    return []
  } 
}

export default dataFiller;