document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  /* Create Calendar */
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };
  var calendarName = "SuperPlanning";

  var createCalOptions = window.plugins.calendar.getCreateCalendarOptions();
  createCalOptions.calendarName = calendarName;
  createCalOptions.calendarColor = "#FF00FF";

  window.plugins.calendar.createCalendar(createCalOptions, success, error);

  var calOptions = window.plugins.calendar.getCalendarOptions(calendarName);

  calOptions.calendarName = 1;
  calOptions.calendarName = calendarName;

  /* Create Events */
  function createEvent (title, eventLocation, notes, startDate, endDate) {
    var myEvent = {
      title: title,
      eventLocation: eventLocation,
      notes: notes,
      startDate: startDate,
      endDate: endDate
    };

    window.plugins.calendar.createEventInteractivelyWithOptions(myEvent.title, myEvent.eventLocation, myEvent.notes, myEvent.startDate, myEvent.endDate, calOptions, success, error);
  }

  createEvent('Mon test ULTIME 5', 'ECV Digital Paris', 'Notes', new Date(2017,9,16,0,0,0,0,0), new Date(2017,9,16,0,0,0,0,0));

  /* Open Calendar */
  window.plugins.calendar.openCalendar();
}