var weeklyHours = 40;

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function saveStatistics(){

    var workingTime = calculateWorkingTime();
    var overtime = calculateOvertime(workingTime);
    
    console.log("Overtime this week : " + overtime);

    // Need to store the information somewhere now. Using localStorage
    saveWorkingTime(workingTime);
    
    
    var current = localStorage["OverTime"];
    localStorage["OverTime"] = current + overtime;
    
    //Giving original behaviour back
    SaveWeekRows(true);
}

function calculateWorkingTime(){
    var hours = parseInt(document.getElementById("info_hour_sum").innerHTML);
    return hours;
}

function calculateOvertime(workingTime){
    var weeklyOvertime = workingTime - weeklyHours;
    
    if(weeklyOvertime > 0){
      return weeklyOvertime;
    }
    else{
      return 0;
    }
}

function saveWorkingTime(workingTime){
  //Saves the total time worked for a given week 
  // The key used is the fortnox code for this week  :
  // year + weeknumber + month : 1409-02 for 9th week of 2014 in february
  
  var weekKey = document.getElementById("time_week").value;
  localStorage[weekKey] = workingTime;
}

//Happens no matter what 
var ok = supports_html5_storage();
if(ok){
    console.log("Local Storage allowed!");
}
else{
  alert("Your browser does not support LocalStorage!");
}

document.getElementById("button_save_and_group").onclick = saveStatistics;
