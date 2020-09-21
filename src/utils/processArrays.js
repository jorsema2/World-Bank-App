function arrayProcessor(data) {
  /* 
  This fetched data shows newest year to oldest year, but we want the opposite. 
  So, we create arrays for values per year and for years
  and we reverse both arrays (years' values and years): 
  */

  const valuesArray = data.map((el) => el.value).reverse();
  const yearsArray = data.map((el) => el.date).reverse();
  return [valuesArray, yearsArray];
}

export default arrayProcessor;