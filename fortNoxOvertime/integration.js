function writeOvertime(result){

        var overtime = result["overtime"];

        // Checking for possible problems
        if(isNaN(overtime)){
          overtime = "Could not retrieve";
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
    console.log(hours);

    // chrome.storage.sync.get("overtime", function(result, hours){

    //     var overtime = result["overtime"];

    //     var pair = new Object();
    //     pair["overtime"] = overtime + hours;

    //     chrome.storage.sync.set(pair);

    // });

    //document.getElementById("overtimeValue").innerHTML = "plouf";

    showOvertime();
}


document.addEventListener('DOMContentLoaded', function () {

    //adding element to the button
    button = document.getElementById("submitButton");
    button.onclick = alterOvertime;

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