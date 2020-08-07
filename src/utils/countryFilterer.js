function countryFilterer(fragment, props){
    // Both fragment and el.name are lower-cased to avoid case sensitive filtering
    const newArray = props.allCountries.filter(el => el.name.toLowerCase().includes(fragment));
    props.setChosenCountries(newArray);
} 

export default countryFilterer;