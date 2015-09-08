function isDevMode(){
  return chrome.storage.sync.get("devMode");
}

function saveChromeStorage(key, value){
  var pair = new Object();
  pair[key] = value;

  chrome.storage.sync.set(pair, function() {
    console.log('Setting ' + key  + ' saved with value ' + value);
  });
}

//Main action
// We want to operate only on the right page, and if localStorage can be used
if (document.title.indexOf("Fortnox") != -1) {

    // nothing done if we have already delivered
    var disabled = document.getElementById('bt_delivery_disabled');
    if (disabled == null){

      document.getElementById("bt_delivery").onclick= function(event) {
          // When clicked on save, we want to trigger the overTime calculation
          saveStatistics();
      };

      //In dev mode, actions should be triggered y pressing on save as well
      chrome.storage.sync.get("devMode", function(result){
              var devMode = result["devMode"];

              // Checking for possible problems
              if(devMode){
                console.log("currently in dev mode");

                document.getElementById("button_save_and_group").onclick= function(event) {
                    // When clicked on save, we want to trigger the overTime calculation
                    saveStatistics();
                };
              }
              else{
                console.log("currently not in dev mode");
              }
      });
    }
}
else{
  alert("Problem processing the current webpage!");
}

////////////////////////////////
/**
 * OverTime calculation related code
 */

var weeklyHours = 40; // Number of hours to be worked per week
var daysPerWeek = 5; // We work 5 days per week
var grayValue = "136"; //the gray value used in the calendar

/*
* The method that is run instead of deliver.
* Contains all the statistics calculation
*/
function saveStatistics(){
    var workingTime = calculateWorkingTime();
    var numberOfDays = getNumberOfDaysWorked();
    var overtime = calculateOvertime(workingTime, numberOfDays);

    // Need to store the information somewhere now. Using localStorage
    saveWorkingTime(workingTime);
    saveWeekOvertime(overtime);
    saveOvertime(overtime);
}

/*
* Calculates the number of days have been worked
* For this, we used the calendar widget located on the right, checking the colors of the days
*/
function getNumberOfDaysWorked(){
  var workedDays = daysPerWeek;

  var week = document.getElementsByClassName("calendarweeknumberselected")[0].parentElement;
  var days = week.getElementsByClassName("calendartransparentborder");
  for (i=0; i< daysPerWeek; i++){
    var col = days[i].children[0].style;
    if (col.color.indexOf(grayValue) > -1){
      workedDays -= 1;
    }
  }

  return workedDays;
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
function calculateOvertime(workingTime, numberOfDays){
    var timePerDay = weeklyHours / daysPerWeek;
    var hoursExpected = timePerDay * numberOfDays;

    var weeklyOvertime = workingTime - hoursExpected;


    return weeklyOvertime;
    // We should also count negative time. . .
    // if(weeklyOvertime > 0){
    //   return weeklyOvertime;
    // }
    // else{
    //   return 0;
    // }
}

function saveOvertime(overtime){

  key = "overtime";
  chrome.storage.sync.get(key, function (result) {
        current = result[key];
        // Checking for possible problems
        if(isNaN(current)){
          current = 0;
        }

        saveChromeStorage(key, current + overtime);
  });

}

/*
* Saves the total time worked for a given week
* The key used is the fortnox code for this week  :
* year + weeknumber + month : 1409-02 for 9th week of 2014 in february
*/
function saveWorkingTime(workingTime){
  var weekKey = getWeekKey();
  //localStorage[weekKey] = workingTime;
  saveChromeStorage(weekKey, workingTime);

}

/*
* Saves the overtime for a given week
* The key used is the fortnox code for this week  :
* year + weeknumber + month : 1409-02 for 9th week of 2014 in february  + over
*/
function saveWeekOvertime(overtime){
  var weekOvertimeKey = getWeekOvertimeKey();
  //localStorage[weekOvertimeKey] = overtime;
  saveChromeStorage(weekOvertimeKey, overtime);
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
  return getWeekKey() + '_overtime';
}
////////////////////////////////
