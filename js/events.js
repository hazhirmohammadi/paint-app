/** open Color Piker
 * */
let isOpen = false;
const ColorPikerPopup = document.getElementById("colorPikerPopup");
const getRadius = document.getElementById("penRadius");

function openColorPiker() {
   ColorPikerPopup.style.display = "block";
   isOpen = true;
}

function closeColorPiker() {
   ColorPikerPopup.style.display = "none";
   isOpen = false;
}

getRadius.addEventListener("change",()=>{
   console.log(7);
})