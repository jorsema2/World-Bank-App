const allColors = [
  "rgba(255, 0, 0, 0.8)",
  "rgba(0, 255, 0, 0.8)",
  "rgba(0, 0, 255, 0.8)",
];

function chooseColor(country, selected) {
  const colorPosition = selected.indexOf(country);
  const chosenColor = allColors[colorPosition];
  return chosenColor;
}

export default chooseColor;