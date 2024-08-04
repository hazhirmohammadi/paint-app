let canvas = document.getElementById("boom");
// let check = document.getElementById("check");
const Eraser = document.getElementById("eraser");
const Pen = document.getElementById("pen");


/**
 * Define Canvas Element For
 */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.height = "100%";
canvas.style.width = "100%";
let c = canvas.getContext("2d");


let isMouseDown = false;
addEventListener('mousedown', () => {
   isMouseDown = true;
   console.log('Mouse down');
});

addEventListener('mousemove', (event) => {
      if (isMouseDown) {
         setTimeout(() => {
            c.beginPath();
            c.arc(event.x, event.y, ci.radius, ci.startAngel, ci.endAngle, ci.counterClockWise);
            c.strokeStyle = "#000";
            c.stroke();

         }, 100);
      }
});

addEventListener('mouseup', () => {
   isMouseDown = false;
   console.log('Mouse up');
});

let ci = {
   x: 300,
   y: 300,
   radius: 50,
   startAngel: 0,
   endAngle: Math.PI * 2,
   counterClockWise: false
};