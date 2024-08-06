let canvas = document.getElementById("boom");
const eraserCheckbox = document.getElementById("eraser");
const penCheckbox = document.getElementById("penCheckbox");
const boomPaint = document.getElementById("boomPaint");
const brashCheckbox = document.getElementById("brash");
const lineCheckbox = document.getElementById("line");
/***
 Define Canvas Element For Boom Paint
 */
canvas.width = boomPaint.offsetWidth;
canvas.height = boomPaint.offsetHeight;
canvas.style.height = "100%";
canvas.style.width = "100%";
let c = canvas.getContext("2d");


/***  Pen Eraser checkbox handel
 */
let toolType = "";
let lineToolIsTrue = false;

function handleCheckboxChange(event) {
   const checkedCheckbox = event.target;

   if (checkedCheckbox !== penCheckbox) {
      penCheckbox.checked = false;
   }
   if (checkedCheckbox !== eraserCheckbox) {
      eraserCheckbox.checked = false;
   }
   if (checkedCheckbox !== brashCheckbox) {
      brashCheckbox.checked = false;
   }
   if (checkedCheckbox !== lineCheckbox) {
      lineCheckbox.checked = false;
   }

   // Update toolType based on the checked checkbox
   if (penCheckbox.checked) {
      lineToolIsTrue = false;
      toolType = "pen";
   } else if (eraserCheckbox.checked) {
      lineToolIsTrue = false;
      toolType = "eraser";
   } else if (brashCheckbox.checked) {
      lineToolIsTrue = false;
      toolType = "brash";
   } else if (lineCheckbox.checked) {
      lineToolIsTrue = true;
      toolType = "line";
   } else {
      lineToolIsTrue = false;
      toolType = "";
   }
}

penCheckbox.addEventListener("change", handleCheckboxChange);
eraserCheckbox.addEventListener("change", handleCheckboxChange);
brashCheckbox.addEventListener("change", handleCheckboxChange);
lineCheckbox.addEventListener("change", handleCheckboxChange);

/*** Handel Pen And Eraser
 */
let isDrawing = false;
let colorPen;
let lastX, lastY;

addEventListener('mousedown', (event) => {
   isDrawing = true;
   if (toolType === "pen") {
      lastX = event.clientX - canvas.offsetLeft;
      lastY = event.clientY - canvas.offsetTop;

      c.beginPath();
      c.moveTo(lastX, lastY);
   }
});

addEventListener('mousemove', (event) => {
   //this condition for pen Active or eraser Active
   if (toolType) {
      if (isDrawing) {
         switch (toolType) {
            case "pen":
               pen();
               break;
            case "brash":
               Brash();
               break;
            default:
               eraser();
         }
      }
   }
});
addEventListener('mouseup', () => {
   isDrawing = false;
});

const colorPenDisplay = document.getElementById("colorPenDisplay");
document.addEventListener("click", () => {
   const c = localStorage.getItem("color");
   colorPen = c;
   colorPenDisplay.style.background = c;
});


let fistClick = false;
let sendData = false;
let dataPosition = {
   fx: 0,
   fy: 0,
   lx: 0,
   ly: 0
};
addEventListener("click", (evt) => {
   if (!lineToolIsTrue) return removeEventListener;
   let firstX = 0;
   let firstY = 0;
   let secondX = 0;
   let secondY = 0;



   function SetPositionFirst() {
      console.log("first");
      const getPosition = localStorage.getItem("getClient");
      const position = JsonParser(getPosition);
      dataPosition.fx= position.x;
      dataPosition.fy = position.y;
      fistClick = true;
   }

   function SetPositionLast() {
      console.log("last");
      const getPosition = localStorage.getItem("getClient");
      const position = JsonParser(getPosition);
      dataPosition.lx = position.x;
      dataPosition.ly = position.y;
      sendData = true;
   }
   SetPositionFirst();

   if (fistClick) {
      SetPositionLast();
      fistClick = false;

   }
   if (sendData) {
      line(dataPosition);
   }else {
      console.log(false);
   }
});

function Brash() {
   const penData = localStorage.getItem("penData");
   const getPosition = localStorage.getItem("getClient");
   const data = JsonParser(penData);
   const position = JsonParser(getPosition);

   setTimeout(() => {
      c.beginPath();
      c.arc(position.x, position.y, data.radius, data.startAngel, data.endAngle, data.counterClockWise);
      c.strokeStyle = colorPen;
      c.stroke();
      c.fill();
      c.fillStyle = colorPen;

   }, 100);
}

function eraser() {
   const getPosition = localStorage.getItem("getClient");
   const position = JsonParser(getPosition);
   c.clearRect(position.x, position.y, 100, 100);
}

function pen() {
   const penData = localStorage.getItem("penData");
   const getPosition = localStorage.getItem("getClient");
   const position = JsonParser(getPosition);
   const sizeLine = JsonParser(penData);
   if (!isDrawing) return;
   const currentX = position.x;
   const currentY = position.y;

   c.lineTo(currentX, currentY);
   c.strokeStyle = colorPen;
   c.lineWidth = sizeLine.radius;
   c.stroke();
   lastX = currentX;
   lastY = currentY;
}

let lineArray = [];

function line(dataPosition) {
   const {fx, fy, lx, ly} = dataPosition;
   console.log(dataPosition);
   c.beginPath();
   c.moveTo(fx, fy);
   c.lineTo(lx, ly);
   c.lineWidth = 10;
   c.stroke();
}
