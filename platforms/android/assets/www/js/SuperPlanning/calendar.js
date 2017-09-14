document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };

  var createCalOptions = window.plugins.calendar.getCreateCalendarOptions();
  createCalOptions.calendarName = "Cordova Calendar";
  createCalOptions.calendarColor = "#FF00FF";

  window.plugins.calendar.createCalendar(createCalOptions, success, error);

  window.plugins.calendar.openCalendar();
}