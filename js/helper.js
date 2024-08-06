const ColorPikerPopup = document.getElementById("colorPikerPopup");
const getRadius = document.getElementById("penRadius");

/** open Color Piker
 * */
let isOpen = false;

function openColorPiker() {
   ColorPikerPopup.style.display = "block";
   isOpen = true;
}

/** close Color Piker
 * */
function closeColorPiker() {
   ColorPikerPopup.style.display = "none";
   isOpen = false;
}

function getPenSizing() {
   const NUMERIC_REGEXP = /[-]{0,1}[\d]*[,]?[\d]*[.]{0,1}[\d]+/g;
   const element = document.getElementById("penSizing");
   const nV = element.options[element.selectedIndex].text;
   if (nV)
      try {
         const numbers = nV.match(NUMERIC_REGEXP);
         const penData = GetValueFromLocalStorage("penData");
         console.log(penData["radius"] = numbers.join());
         localStorage.setItem("penData", JSON.stringify(penData));
      } catch (e) {
         console.log(e);
      }
}

function JsonParser(json) {
   return JSON.parse(json);
}

function ToStringFiy(json) {
   return JSON.stringify(json);
}

function GetValueFromLocalStorage(key) {
   const data = localStorage.getItem(key);
      return JsonParser(data);
}

function SetValueFromLocalStorage(key, value) {
   if (typeof value === "object") {
      setter(ToStringFiy(value));
      console.log("obj");
   } else {
      setter(value);
   }

   function setter() {
      localStorage.setItem(key.toString(), value);
   }
}