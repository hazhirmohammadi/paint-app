let canvas = document.getElementById("boom");
const Eraser = document.getElementById("eraser");
const penCheckbox = document.getElementById("penCheckbox");
const boomPaint = document.getElementById("boomPaint");


/***
 Define Canvas Element For Boom Paint
 */
canvas.width = boomPaint.offsetWidth;
canvas.height =boomPaint.offsetHeight ;
canvas.style.height = "100%";
canvas.style.width = "100%";
let c = canvas.getContext("2d");


/***  Pen Eraser checkbox handel
 */
let penStatus = false;

console.log("pen status", penStatus);

penCheckbox.addEventListener("click", () => {
   Eraser.checked = !penCheckbox.checked;
   if (penCheckbox.checked === true) {
      penStatus = true;
      console.log("pen status", penStatus);
   }
});
Eraser.addEventListener("click", () => {
   penCheckbox.checked = !Eraser.checked;
   if (Eraser.checked === true) {
      penStatus = false;
   }
});

/*** Handel Pen And Eraser
 */
let isMouseDown = false;
let colorPen;
addEventListener('mousedown', () => {
   isMouseDown = true;
});
const colorPenDisplay = document.getElementById("colorPenDisplay");
document.addEventListener("click", () => {

   const c = localStorage.getItem("color");
   colorPen = c;
   colorPenDisplay.style.background = c;
});
addEventListener('mousemove', (event) => {
   //this condition for pen Active or eraser Active
   if (penStatus === true) {
      if (isMouseDown) {
         pen()
      }
   } else {
      if (isMouseDown) {
         eraser()
      }
   }
});
addEventListener('mouseup', () => {
   isMouseDown = false;
});


function pen() {
   const penData = localStorage.getItem("penData")
   const getPosition = localStorage.getItem("getClient");
   const data = JsonParser(penData);
   const position = JsonParser(getPosition);

   setTimeout(() => {
      c.beginPath();
      c.arc(position.x, position.y, data.radius, data.startAngel, data.endAngle, data.counterClockWise);
      c.strokeStyle = colorPen;
      c.stroke();
      c.fill()
      c.fillStyle=colorPen

   }, 100);
}
function eraser() {
   const getPosition = localStorage.getItem("getClient");
   const position = JsonParser(getPosition);
   c.clearRect(position.x, position.y, 100, 100);
}
