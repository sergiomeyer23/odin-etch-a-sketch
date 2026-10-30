const container = document.querySelector("#container");
const sizeLabel = document.querySelector("#size-label");
const newGridButton = document.querySelector("#new-grid");
const clearButton = document.querySelector("#clear");
const modeButtons = document.querySelectorAll(".mode");

const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;

let gridSize = DEFAULT_SIZE;
let mode = "black";

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function paint(square) {
  if (mode === "rainbow") {
    square.style.backgroundColor = randomColor();
    square.dataset.darkness = 0;
  } else if (mode === "darken") {
    // every pass over a square adds 10% black, up to fully black
    const darkness = Math.min(Number(square.dataset.darkness || 0) + 1, 10);
    square.dataset.darkness = darkness;
    const shade = Math.round(255 * (1 - darkness / 10));
    square.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
  } else {
    square.style.backgroundColor = "#222222";
    square.dataset.darkness = 10;
  }
}

function createGrid(size) {
  container.innerHTML = "";
  gridSize = size;
  sizeLabel.textContent = `Grid: ${size} x ${size}`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${100 / size}%`;
    square.addEventListener("mouseover", () => paint(square));
    container.appendChild(square);
  }
}

function askForSize() {
  const answer = prompt(`How many squares per side? (1 to ${MAX_SIZE})`);

  if (answer === null) {
    return;
  }

  const size = Number(answer);

  if (!Number.isInteger(size) || size < 1 || size > MAX_SIZE) {
    alert(`Please enter a whole number between 1 and ${MAX_SIZE}.`);
    return;
  }

  createGrid(size);
}

function setMode(newMode) {
  mode = newMode;
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.id === newMode);
  });
}

newGridButton.addEventListener("click", askForSize);
clearButton.addEventListener("click", () => createGrid(gridSize));
modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.id));
});

createGrid(DEFAULT_SIZE);
