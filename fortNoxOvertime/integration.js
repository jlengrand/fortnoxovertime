var overtimeGrabber = {

    getOvertime: function(){
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

      chrome.storage.sync.get("overtime", function(result) {
        var overtime = result["overtime"];

        // Checking for possible problems
        if(isNaN(overtime)){
          overtime = -1;
        }

        var title = document.createTextNode("overtime ");
        document.body.appendChild(title);
        var value = document.createTextNode(overtime);
        document.body.appendChild(value);
      });
    },


    showOvertime: function(overtime){
        var title = document.createTextNode("overtime ");
        document.body.appendChild(title);
        var value = document.createTextNode(overtime);
        document.body.appendChild(value);
    }

}

document.addEventListener('DOMContentLoaded', function () {
  overtimeGrabber.getOvertime();
});