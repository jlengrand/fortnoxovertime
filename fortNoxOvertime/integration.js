function writeOvertime(result){

        var overtime = result["overtime"];

        // Checking for possible problems
        if(isNaN(overtime)){
          overtime = "Could not retrieve";
        }

        var overtimeElement = document.getElementById("overtimeValue");
        alert(overtimeElement.innerHTML);
        overtimeElement.innerHTML = overtime;
}

function showOvertime(){
    alert("showOvertime");
      chrome.storage.sync.get("overtime", writeOvertime);
}

document.addEventListener('DOMContentLoaded', function () {
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