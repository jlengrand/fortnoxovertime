//<input type="button" class="button" id="button_save_and_group" disabled="disabled" onclick="SaveWeekRows(true);" value="Save" /> => save button

function getHours(){
    var hours = document.getElementById("info_hour_sum").innerHTML;
    //alert("Counting Hours! " + hours);
    
    // Need to play around with Google Spreadsheet now.
    
    //Giving original behaviour back
    SaveWeekRows(true);
}

document.getElementById("button_save_and_group").onclick = getHours;
