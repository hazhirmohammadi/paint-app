const ColorPikerPopup = document.getElementById("colorPikerPopup");
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

/** getPenSizing for set and get font size tools
 * */
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

/** JsonParser is a function for parse jsons
 * */
function JsonParser(json) {
    return JSON.parse(json);
}

/** ToStringFiy function is using in setting in localStorage
 * */
function ToStringFiy(json) {
    return JSON.stringify(json);
}

/** Getting values in LocalStorage
 * */
function GetValueFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return JsonParser(data);
}

/** Setting value in LocalStorage
 * */
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

function createState(initialState) {
    let state = initialState;
    return {
        getState: () => state,
        setState: (newState) => {
            state = newState;
        }
    };
}

function setterStore(store, key, value) {
    const currentState = store.getState();
    store.setState({
        ...currentState,
        [key]: value
    });
}

function getterStore(store, key) {
    const currentState = store.getState();
    return currentState[key];
}

function useState(setterName, getterName) {
    return {
        [setterName]: (store, key, value) => {
            setterStore(store, key, value);
            return true
        },
        [getterName]: (store, keys) => {
            if (Array.isArray(keys)) {
                return keys.map(key => getterStore(store, key));
            } else {
                return getterStore(store, keys);
            }
        }
    };
}
