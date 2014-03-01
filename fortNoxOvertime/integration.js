var overtimeGrabber = {

    getOvertime: function(){
    chrome.storage.onChanged.addListener(function(changes, namespace) {
            for (key in changes) {
              var storageChange = changes[key];
              console.log('Storage key "%s" in namespace "%s" changed. ' +
                          'Old value was "%s", new value is "%s".',
                          key,
                          namespace,
                          storageChange.oldValue,
                          storageChange.newValue);
            }
    });


        var current = localStorage["overtime"];

        // Checking for possible problems
        if(isNaN(current)){
          current = -1;
        }
        return current;
    },


    showOvertime: function(){
        //alert(this.getOvertime());
        var title = document.createTextNode("overtime");
        document.body.appendChild(title);
        var value = document.createTextNode(this.getOvertime());
        document.body.appendChild(value);
    }

}


// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  overtimeGrabber.showOvertime();
});