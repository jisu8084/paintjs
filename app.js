const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const CANVAS_INITAL_COLOR ="#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = CANVAS_INITAL_COLOR;
ctx.fillStyle = CANVAS_INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handLeColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handLeRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handLeMode(){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL"
    }else{
        filling = true;
        mode.innerText = "PAINT"
    }
}

function handLeCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handLeCM(event){
    event.preventDefault();
}

function handLeSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaingJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handLeCanvasClick);
    canvas.addEventListener("contextmenu", handLeCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handLeColorClick)
);

if(range){
    range.addEventListener("input", handLeRangeChange);
}

if(mode){
    mode.addEventListener("click", handLeMode);
}

if(saveBtn){
    saveBtn.addEventListener("click", handLeSaveClick);
}