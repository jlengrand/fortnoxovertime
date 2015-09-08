function saveChromeStorage(key, value){
  var pair = new Object();
  pair[key] = value;

  chrome.storage.sync.set(pair, function() {
    console.log('Setting ' + key  + ' saved with value ' + value);
  });
}

function alterChromeStorage(key, value){
    chrome.storage.sync.get(key, function (result) {
            current = result[key];
            // Checking for possible problems
            if(isNaN(current)){
              current = 0;
            }
            saveChromeStorage(key, current + value);
      });
}

function writeOvertime(result){

        var overtime = result["overtime"];

        // Checking for possible problems
        if(isNaN(overtime)){
          overtime = "Could not retrieve value.";
        }

        var overtimeElement = document.getElementById("overtimeValue");
        overtimeElement.innerHTML = overtime;
}

function showOvertime(){
      chrome.storage.sync.get("overtime", writeOvertime);
}

/**
 * This method is called when the user wants to change its overtime value.
 */
function alterOvertime(){
    var hours = document.getElementById("alterHours").value;
    var hoursInt = parseInt(hours);
    if(isNaN(hoursInt)){
        alert("Your input could not be parsed correctly. No change performed");
        return;
    }

    // trying to get the first digit
    var first_digit = hours.charAt(0);
    if(first_digit === "+" || first_digit === "-"){
        alterChromeStorage("overtime", hoursInt);
    }
    else{
        // We probably just have a plain number
        saveChromeStorage("overtime", hoursInt);
    }

    sleep(200, showOvertime);
}

function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}

function setDevMode(){
    var state = document.getElementById("devMode").checked;
    saveChromeStorage("devMode", state);
}

function setCheckBoxState(){
    chrome.storage.sync.get("devMode", function(result){
        state = result["devMode"];
        document.getElementById("devMode").checked = state;
    });
}

document.addEventListener('DOMContentLoaded', function () {

    //adding event to the button
    button = document.getElementById("submitButton");
    button.onclick = alterOvertime;

    // adding event to the checkbox
    box = document.getElementById("devMode");
    box.onclick = setDevMode;

    // checking the checkbox if needed
    setCheckBoxState();

    showOvertime();

});

// Will update whenever a change to the storage is made
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//         for (key in changes) {
//           var storageChange = changes[key];
//           console.log('Storage key "%s" in namespace "%s" changed. ' +
//                       'Old value was "%s", new value is "%s".',
//                       key,
//                       namespace,
//                       storageChange.oldValue,
//                       storageChange.newValue);
//         }

// });