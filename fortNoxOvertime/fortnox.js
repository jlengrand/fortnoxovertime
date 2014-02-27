

////////////////////////////////
/**
 * OverTime calculation related code
 */
////////////////////////////////

/*
* Checks whether our browser supports LocalStorage
*/
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

//Main action
// We want to operate only on the right page, and if localStorage can be used
if (document.title.indexOf("Fortnox") != -1 && supports_html5_storage()) {
    //Creating Elements
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Appending to DOMo
    document.body.appendChild(btn);

    document.getElementById("button_save_and_group").onclick= function(event) {
        alert("caca");
    // Compensate for IE<9's non-standard event model
    //
        if (event===undefined) event= window.event;
        var target= 'target' in event? event.target : event.srcElement;

        alert('clicked on '+target.tagName);
    };
}