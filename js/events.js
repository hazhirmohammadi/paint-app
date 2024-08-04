/** open Color Piker
 * */
let isOpen = false;
const ColorPikerPopup = document.getElementById("colorPikerPopup");
function openColorPiker() {
   ColorPikerPopup.style.display = "block";
   isOpen = true;
}
function closeColorPiker() {
   ColorPikerPopup.style.display = "none";
   isOpen = false;
}
