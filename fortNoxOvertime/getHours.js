var weeklyHours = 40; // Number of hours to be worked per week

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

/*
* The method that is run instead of deliver.
* Contains all the statistics calculation
*/
function saveStatistics(){

    var workingTime = calculateWorkingTime();
    var overtime = calculateOvertime(workingTime);

    console.log("Overtime this week : " + overtime);

    // Need to store the information somewhere now. Using localStorage
    saveWorkingTime(workingTime);
    saveWeekOvertime(overtime);
    saveOvertime(overtime);

    //Giving original behaviour back
    SaveWeekRows(true);
}

/*
* Calculate the amount of hours worked this week
*/
function calculateWorkingTime(){
    var hours = parseInt(document.getElementById("info_hour_sum").innerHTML);
    return hours;
}

/*
* Calculates the number of extra hours I worked this week
*/
function calculateOvertime(workingTime){
    var weeklyOvertime = workingTime - weeklyHours;

    if(weeklyOvertime > 0){
      return weeklyOvertime;
    }
    else{
      return 0;
    }
}

function saveOvertime(overtime){
    key = "overtime";
    var current = localStorage[key];

    // Checking for possible problems
    if(isNaN(current)){
      current = 0;
    }

    localStorage[key] = current + overtime;
}

/*
* Saves the total time worked for a given week
* The key used is the fortnox code for this week  :
* year + weeknumber + month : 1409-02 for 9th week of 2014 in february + over
*/
function saveWorkingTime(workingTime){

  var weekKey = getWeekKey();
  localStorage[weekKey] = workingTime;
}

/*
* Saves the overtime for a given week
* The key used is the fortnox code for this week  :
* year + weeknumber + month : 1409-02 for 9th week of 2014 in february
*/
function saveWeekOvertime(overtime){
  var weekOvertimeKey = getWeekOvertimeKey();
  localStorage[weekOvertimeKey] = overtime;
}

/*
* creates a hash key for the weekly working time
*/
function getWeekKey(){
  return document.getElementById("time_week").value;
}

/*
* creates a hash key for the weekly overtime
*/
function getWeekOvertimeKey(){
  return getWeekKey() + "_overtime";
}


/*
Happens no matter what
*/
var ok = supports_html5_storage();
if(ok){
    alert("Local Storage allowed!");
}
else{
  alert("Your browser does not support LocalStorage!");
}

document.getElementById("button_save_and_group").onclick = saveStatistics;
