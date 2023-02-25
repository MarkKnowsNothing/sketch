const DEFAULT_RANGE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "paint";

let currentRange = DEFAULT_RANGE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const container = document.querySelector("#container");

const range = document.querySelector("#range");
const rangeValue = document.querySelector("#range-value");

const newGrid = document.querySelector("#create-grid");
const clearGrid = document.querySelector("#clear-grid");

const rainbow = document.querySelector("#rainbow");
const paint = document.querySelector("#paint");
const color = document.querySelector("#color");
const erase = document.querySelector("#erase");


function setCurrentRange(newRange) {
    currentRange = newRange;
    rangeValue.innerHTML = `${newRange} x ${newRange}`;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}


container.classList = "hide";
rainbow.classList = "hide";
paint.classList = "hide";
color.classList = "hide";
erase.classList = "hide";
clearGrid.classList = "hide";


color.oninput = (e) => setCurrentColor(e.target.value);
range.oninput = (e) => setCurrentRange(e.target.value);


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    if (currentMode === "rainbow") {
        function getRandomNumber() {
            return Math.floor(Math.random() * 256);
        }

        const randomR = getRandomNumber();
        const randomG = getRandomNumber();
        const randomB = getRandomNumber();

        e.target.style.backgroundColor = `rgb(${randomR},${randomG}, ${randomB})`;
    } else if (currentMode === "paint") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "erase") {
        e.target.style.backgroundColor = '#FFF';
    };
};


function createGrid() {
    container.innerHTML = "";

    for (let i = 1; i <= (currentRange * currentRange); i++) {
        const div = document.createElement("div");

        container.style.gridTemplateColumns = `repeat(${currentRange}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${currentRange}, 1fr)`;
    
        div.addEventListener("mouseover", changeColor);
        div.addEventListener("mousedown", changeColor);
        
        container.appendChild(div);
    };
};


newGrid.addEventListener("click", () => {
    container.classList = "show";
    rainbow.classList = "show";
    paint.classList = "show";
    color.classList = "show";
    erase.classList = "show";
    clearGrid.classList = "show";

    createGrid();
});


rainbow.addEventListener("click", () => {
    setCurrentMode("rainbow");
});

paint.addEventListener("click", () => {
    setCurrentMode("paint");
})

erase.addEventListener("click", () => {
    setCurrentMode("erase");
});

clearGrid.addEventListener("click", () => {
    createGrid();
    setCurrentMode("paint");
});