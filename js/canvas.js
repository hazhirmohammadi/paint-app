let canvas = document.getElementById("boom");
const eraserCheckbox = document.getElementById("eraser");
const penCheckbox = document.getElementById("penCheckbox");
const boomPaint = document.getElementById("boomPaint");
const brashCheckbox = document.getElementById("brash");
const lineCheckbox = document.getElementById("line");

/** Define Canvas Element For Boom Paint
 * */
canvas.width = boomPaint.offsetWidth;
canvas.height = boomPaint.offsetHeight;
canvas.style.height = "100%";
canvas.style.width = "100%";
let c = canvas.getContext("2d");
/** this variable for save shapes in dom
 * */
let shapes = [];
/** Track the selected shape
 * */
let selectedShape = null;
/***  Pen Eraser checkbox handel
 */
let toolType = "";
let lineToolIsTrue = false;
/*** Handel Pen And Eraser
 */
let isDrawing = false;
/** colorPen variable using is in all tools color
 * */
let colorPen;
/** this variable for pen function
 * lastX ,lastY
 * */
let lastX, lastY;
/** firstClickPosition for save fist click in line fuction
 */
let firstClickPosition = null;
/** this variable using in first click position lines
 * */
let clickMarker = null;
/** colorPenDisplay for display current color pen
 * */
const colorPenDisplay = document.getElementById("colorPenDisplay");

class Tools {
   constructor() {
   }

   brash() {
      const data = GetValueFromLocalStorage("penData");
      const position = GetValueFromLocalStorage("getClient");
      setTimeout(() => {
         c.beginPath();
         c.arc(position.x, position.y, data.radius, data.startAngel, data.endAngle, data.counterClockWise);
         c.strokeStyle = colorPen;
         c.stroke();
         c.fill();
         c.fillStyle = colorPen;
      }, 60);
   }

   eraser() {
      const getPosition = localStorage.getItem("getClient");
      const position = JsonParser(getPosition);
      c.clearRect(position.x, position.y, 100, 100);
   }

   pen() {
      const fontSize = GetValueFromLocalStorage("penData");
      const position = GetValueFromLocalStorage("getClient");
      if (!isDrawing) return;
      const currentX = position.x;
      const currentY = position.y;
      c.lineTo(currentX, currentY);
      c.strokeStyle = colorPen;
      c.lineWidth = fontSize.radius;
      c.stroke();
   }
}

const tools = new Tools();

/** handel check box tools action
 * */
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
   /** Update toolType based on the checked checkbox
    **/
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

/** this event listener use in all action tools in app
 * */
addEventListener('mousedown', () => {
   isDrawing = true;
   if (toolType === "pen") {
      const rect = boomPaint.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      lastX = x;
      lastY = y;
      c.beginPath();
      c.moveTo(lastX, lastY);
   }
});
addEventListener('mousemove', () => {
   //this condition for pen Active or eraser Active
   if (toolType) {
      if (isDrawing) {
         switch (toolType) {
            case "pen":
               if (!lineToolIsTrue)
                  tools.pen();
               break;
            case "brash":
               if (!lineToolIsTrue)
                  tools.brash();
               break;
            default:
               tools.eraser();
         }
      }
   }
});
addEventListener('mouseup', () => {
   isDrawing = false;
});
document.addEventListener("click", () => {
   const color = localStorage.getItem("color");
   colorPen = color;
   colorPenDisplay.style.background = color;
});
addEventListener("click", (evt) => {

   if (!lineToolIsTrue) return removeEventListener;

   if (!firstClickPosition) {
      function SetPositionFirst() {
         const position = GetValueFromLocalStorage("getClient");
         // const position = JsonParser(getPosition);

         const rect = boomPaint.getBoundingClientRect();
         const x = event.clientX - rect.left;
         const y = event.clientY - rect.top;
         firstClickPosition = {fx: position.x, fy: position.y};

         function createDiv() {
            clickMarker = document.createElement('div');
            clickMarker.classList.add('click-marker');
            clickMarker.style.left = `${x}px`;
            clickMarker.style.top = `${y}px`;
            boomPaint.appendChild(clickMarker);
         }

         createDiv();
      }

      SetPositionFirst();
   } else {
      function SetPositionSecond() {
         const getPosition = localStorage.getItem("getClient");
         const position = JsonParser(getPosition);
         const secondClickPosition = {lx: position.x, ly: position.y};
         line(firstClickPosition, secondClickPosition);
      }

      SetPositionSecond();

      firstClickPosition = null;
   }

});

/** line function for drawing lines
 * */
function line(first, second) {
   const {fx, fy} = first;
   const {lx, ly} = second;
   c.beginPath();
   c.moveTo(fx, fy);
   c.lineTo(lx, ly);
   c.lineWidth = 10;
   c.stroke();

   if (clickMarker) {
      clickMarker.remove();
      clickMarker = null;
   }
}

