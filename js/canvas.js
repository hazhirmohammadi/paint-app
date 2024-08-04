let canvas = document.getElementById("boom");
const Eraser = document.getElementById("eraser");
const Pen = document.getElementById("pen");


/***
 Define Canvas Element For Boom Paint
 */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.height = "100%";
canvas.style.width = "100%";
let c = canvas.getContext("2d");


/***  Pen Eraser checkbox handel
 */
let penStatus = false;

console.log("pen status", penStatus);

Pen.addEventListener("click", () => {
   Eraser.checked = !Pen.checked;
   if (Pen.checked === true) {
      penStatus = true;
      console.log("pen status", penStatus);
   }
});
Eraser.addEventListener("click", () => {
   Pen.checked = !Eraser.checked;
   if (Eraser.checked === true) {
      penStatus = false;
      console.log("pen status", penStatus);
   }
});

/*** Handel Pen And Eraser
 */
let isMouseDown = false;
let colorPen;
addEventListener('mousedown', () => {
   isMouseDown = true;
   // console.log('Mouse down');
});

document.addEventListener("click", () => {
   const c = localStorage.getItem("color");
   console.log(c);
   colorPen = c;
});
addEventListener('mousemove', (event) => {
   //this condition for pen Active or eraser Active
   if (penStatus === true) {
      if (isMouseDown) {
         setTimeout(() => {
            c.beginPath();
            c.arc(event.x, event.y, ci.radius, ci.startAngel, ci.endAngle, ci.counterClockWise);
            c.strokeStyle = colorPen;
            c.stroke();

         }, 100);
      }
   } else {
      if (isMouseDown) {
         c.clearRect(event.x, event.y, 100, 100);
      }
   }
});
addEventListener('mouseup', () => {
   isMouseDown = false;
   // console.log('Mouse up');
});


const ci = {
   x: 300,
   y: 300,
   radius: 50,
   startAngel: 0,
   endAngle: Math.PI * 2,
   counterClockWise: false
};