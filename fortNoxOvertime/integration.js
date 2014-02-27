var overtimeGrabber = {

    getOvertime: function(){
        var current = localStorage["overtime"];

        // Checking for possible problems
        if(isNaN(current)){
          current = -1;
        }
        return current;
    },


    showOvertime: function(){
        alert(this.getOvertime());
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