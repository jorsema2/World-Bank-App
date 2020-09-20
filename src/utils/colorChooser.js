const allColors = [
  "rgba(255, 0, 0, 0.8)",
  "rgba(0, 255, 0, 0.8)",
  "rgba(0, 0, 255, 0.8)",
];

function chooseColor(country) {
  const colorPosition = selected.indexOf(country);
  return chosenColor = allColors[colorPosition];
}

export default chooseColor;