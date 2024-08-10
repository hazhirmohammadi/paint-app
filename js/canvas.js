let canvas = document.getElementById("boom");
const eraserCheckbox = document.getElementById("eraser");
const penCheckbox = document.getElementById("penCheckbox");
const boomPaint = document.getElementById("boomPaint");
const brashCheckbox = document.getElementById("brash");
const lineCheckbox = document.getElementById("line");
const toolBar = document.getElementsByClassName("toolbar");
/** Define Canvas Element For Boom Paint
 * */
canvas.width = boomPaint.offsetWidth;
canvas.height = boomPaint.offsetHeight;
canvas.style.height = "100%";
canvas.style.width = "100%";
let c = canvas.getContext("2d");

const Store = createState({
   /** isDrawing for control mouse down & up & move*/
   isDrawing: false,
   /** toolType control event checkbox*/
   toolType: "pen",

   currentColor: null,
   /** lineToolIsTrue for line function*/
   lineToolIsTrue: false
});
const myState = useState("set", "get");

/** colorPen variable using is in all tools color
 * */
let colorPen;
/** this variable for pen function
 * lastX ,lastY
 * */
let lastX, lastY;
/** firstClickPosition for save fist click in line function
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
      const {isDrawing} = Store.getState(Store, "isDrawing");
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
      setTools(false, "pen");
   } else if (eraserCheckbox.checked) {
      setTools(false, "eraser");
   } else if (brashCheckbox.checked) {
      setTools(false, "brash");
   } else if (lineCheckbox.checked) {
      myState.set(Store, "lineToolIsTrue", true);
      myState.set(Store, "toolType", "line");
   } else {
      myState.set(Store, "lineToolIsTrue", false);
      myState.set(Store, "toolType", "");
   }

   function setTools(lineStatus, toolType) {
      myState.set(Store, "lineToolIsTrue", lineStatus);
      myState.set(Store, "toolType", toolType);
   }
}

penCheckbox.addEventListener("change", handleCheckboxChange);
eraserCheckbox.addEventListener("change", handleCheckboxChange);
brashCheckbox.addEventListener("change", handleCheckboxChange);
lineCheckbox.addEventListener("change", handleCheckboxChange);

/** this event listener use in all action tools in app
 * */
function handleMouseDown(event) {
   myState.set(Store, "isDrawing", true);
   const status = getterStore(Store, "toolType");

   if (status === "pen") {
      const rect = boomPaint.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      lastX = x;
      lastY = y;
      c.beginPath();
      c.moveTo(lastX, lastY);
      console.log(lastX, lastY);
   }
}

function handleMouseMove() {
   const staus = myState.get(Store, ["lineToolIsTrue", "toolType", "isDrawing"]);
   if (staus[1] && staus[2]) {
      if (!staus[0]) {
         switch (staus[1]) {
            case "pen":
               tools.pen();
               break;
            case "brash":
               tools.brash();
               break;
            default:
               tools.eraser();
         }
      }
   }
}

function handleMouseUp() {
   Store.setState({
      ...Store.getState(),
      isDrawing: false
   });
}

addEventListener('mousedown', handleMouseDown);
addEventListener('mousemove', handleMouseMove);
addEventListener('mouseup', handleMouseUp);

document.addEventListener("click", () => {
   const color = localStorage.getItem("color");
   colorPen = color;
   colorPenDisplay.style.background = color;
});

/** this event using in line function for setting first X & Y second X & Y
 * */
addEventListener("click", (evt) => {
   const lineToolIsTrue = myState.get(Store, "lineToolIsTrue");
   if (!lineToolIsTrue) return removeEventListener;
   if (!firstClickPosition) {
      function SetPositionFirst() {
         const position = GetValueFromLocalStorage("getClient");
         const rect = boomPaint.getBoundingClientRect();
         const x = event.clientX - rect.left;
         const y = event.clientY - rect.top;
         firstClickPosition = {fx: position.x, fy: position.y};

         /** create marker
          * */
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
         debugger;
         const getPosition = localStorage.getItem("getClient");
         const color = localStorage.getItem("color");
         const position = JsonParser(getPosition);
         const secondClickPosition = {lx: position.x, ly: position.y};
         line(firstClickPosition, secondClickPosition, color);
      }

      SetPositionSecond();

      firstClickPosition = null;
   }

});

/** line function for drawing lines
 * */
function line(first, second, color) {
   const {fx, fy} = first;
   const {lx, ly} = second;
   c.beginPath();
   c.moveTo(fx, fy);
   c.strokeStyle = color;
   c.lineTo(lx, ly);
   c.lineWidth = 10;
   c.stroke();

   if (clickMarker) {
      clickMarker.remove();
      clickMarker = null;
   }
}

