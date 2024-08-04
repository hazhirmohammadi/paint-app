const colorPicker = document.getElementById('colorPickerCanvas');
const colorDisplay = document.getElementById('colorDisplay');
let localColor = localStorage.getItem("color");


const ctx = colorPicker.getContext('2d');
/*** Create gradient for color picker
 */
const gradient = ctx.createLinearGradient(0, 0, colorPicker.width, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.33, 'green');
gradient.addColorStop(0.66, 'blue');
gradient.addColorStop(1, 'purple');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, colorPicker.width, colorPicker.height);

colorPicker.addEventListener('click', (event) => {
   const pixelData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
   const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
   const currentColor = colorDisplay.style.backgroundColor = color;
   if (localColor !== currentColor) {
      console.log("change color");
      localStorage.setItem("color", colorDisplay.style.backgroundColor = color);
   } else console.log("this color in defined");
});
