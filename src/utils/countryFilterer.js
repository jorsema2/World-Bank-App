function countryFilterer(fragment, props){
    const newArray = props.allCountries.filter(el => el.name.includes(fragment));
    props.setSelectedCountries(newArray);
} 

export default countryFilterer;