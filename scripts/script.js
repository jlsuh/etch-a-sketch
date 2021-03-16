/* Future directions:
   - Curriculum specified without implementing objects & classes. Might implement it in the future.
*/

/* Color generators */
String.prototype.convertToRGB = function(){
  var aRgbHex = this.match(/.{1,2}/g);
  var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16)
  ];
  return `rgb(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]})`;
}

function getRandomColor() {
  const HEX_CODE_LENGTH = 6;
  let letters = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < HEX_CODE_LENGTH; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

/* Coloring */
function colorIt() {
  if (rainbowButton.classList.contains("active") && gradientButton.classList.contains("active")) {
    gradientColoring(this, opaqueColoring(this, getRandomColor()));
  } else if (rainbowButton.classList.contains("active")) {
    opaqueColoring(this, getRandomColor());
  } else if (gradientButton.classList.contains("active")) {
    gradientColoring(this, colorPallette.value);
  } else {
    opaqueColoring(this, colorPallette.value);
  }
}

function opaqueColoring(aCell, aColor) {
  aCell.style.backgroundColor = aColor;
  aCell.style.opacity = 1;
}

function gradientColoring(aCell, aColor) {
  if (aCell.style.backgroundColor === colorPallette.value.substring(1).convertToRGB()) {
    const currentOpacity = window.getComputedStyle(aCell).getPropertyValue("opacity");
    if (currentOpacity < 1) {
      aCell.style.opacity = Number(aCell.style.opacity) + 0.1;
    }
  } else {
    aCell.style.opacity = 0.1;
    aCell.style.backgroundColor = aColor;
  }
}

/* Grid & Cells */
function initiateGrid(rows, columns) {
  setDimentions(rows, columns);
  for (let i = 0; i < (rows * columns); i++) {
    let aCell = document.createElement("div");
    aCell.style.opacity = 1;
    aCell.style.backgroundColor = "#8e9977";
    container.appendChild(aCell).className = "grid-item";
  }
}

function removeGrid() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function updateGrid() {
  setDimentions(0, 0);
  removeGrid();
  initiateGrid(getRangeSliderValue(), getRangeSliderValue());
  cells = getUpdatedCells();
  addCellsEventListeners(colorIt);
}

function setDimentions(rows, columns) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-columns", columns);
}

function getUpdatedCells() {
  return Array.from(document.getElementsByClassName("grid-item"));
}

function removeCurrentStyle() {
  cells.forEach(aCell => aCell.removeAttribute("style"));
}

function addCellsEventListeners(theCallback) {
  cells.forEach(aCell => aCell.addEventListener("mouseover", theCallback));
}

/* Dimensioning slider */
function getRangeSliderValue() {
  return rangeSlider.value;
}

function updateInputValue() {
  pixelsSquared.textContent = `${getRangeSliderValue()} pixels squared`;
}

/* Buttons */
function ableOrDisable() {
  if (activateOnClick(this)) {
    this.classList.add("active");
    this.classList.remove("off");
  } else {
    this.classList.remove("active");
    this.classList.add("off");
  }
}

function activateOnClick(element) {
  return element.classList.contains("off");
}

/* Animations */
function shakeAnimation() {
  body.classList.toggle("shake-animation");
}

/* Main */
const container = document.getElementById("container");
const body = document.querySelector("body");
const pixelsSquared = document.createElement("p");
const rangeSlider = document.getElementById("range");
const sliderContainer = document.querySelector("div.slide-container");
const eraseButton = document.getElementById("erase-button");
const colorPallette = document.querySelector("input");
const gradientButton = document.querySelector(".gradient");
let rainbowButton = document.querySelector(".rainbow");

initiateGrid(getRangeSliderValue(), getRangeSliderValue());

let cells = getUpdatedCells();
addCellsEventListeners(colorIt);

updateInputValue();

sliderContainer.appendChild(pixelsSquared);

rangeSlider.addEventListener("input", updateInputValue);
rangeSlider.addEventListener("input", updateGrid);

eraseButton.addEventListener("mouseover", shakeAnimation);
eraseButton.addEventListener("mouseleave", shakeAnimation);
eraseButton.addEventListener("mouseover", removeCurrentStyle);

rainbowButton.addEventListener("click", ableOrDisable);
gradientButton.addEventListener("click", ableOrDisable);