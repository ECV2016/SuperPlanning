document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	// prep some variables 
	var startDate = new Date(2015,2,15,18,30,0,0,0); // beware: month 0 = january, 11 = december 
	var endDate = new Date(2015,2,15,19,30,0,0,0);
	var title = "My nice event";
	var eventLocation = "Home";
	var notes = "Some notes about this event.";
	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	var error = function(message) { alert("Error: " + message); };
	
	// create a calendar (iOS only for now) 
	window.plugins.calendar.createCalendar(calendarName,success,error);
	// if you want to create a calendar with a specific color, pass in a JS object like this: 
	var createCalOptions = window.plugins.calendar.getCreateCalendarOptions();
	createCalOptions.calendarName = "My Cal Name";
	createCalOptions.calendarColor = "#FF0000"; // an optional hex color (with the # char), default is null, so the OS picks a color 
	window.plugins.calendar.createCalendar(createCalOptions,success,error);
	 
	// delete a calendar 
	window.plugins.calendar.deleteCalendar(calendarName,success,error);
	 
	// create an event silently (on Android < 4 an interactive dialog is shown) 
	window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
	 
	// create an event silently (on Android < 4 an interactive dialog is shown which doesn't use this options) with options: 
	var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults 
	calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm) 
	calOptions.secondReminderMinutes = 5;
	 
	// Added these options in version 4.2.4: 
	calOptions.recurrence = "monthly"; // supported are: daily, weekly, monthly, yearly 
	calOptions.recurrenceEndDate = new Date(2016,10,1,0,0,0,0,0); // leave null to add events into infinity and beyond 
	calOptions.calendarName = "MyCreatedCalendar"; // iOS only 
	calOptions.calendarId = 1; // Android only, use id obtained from listCalendars() call which is described below. This will be ignored on iOS in favor of calendarName and vice versa. Default: 1. 
	 
	// This is new since 4.2.7: 
	calOptions.recurrenceInterval = 2; // once every 2 months in this case, default: 1 
	 
	// And the URL can be passed since 4.3.2 (will be appended to the notes on Android as there doesn't seem to be a sep field) 
	calOptions.url = "https://www.google.com";
	 
	// on iOS the success handler receives the event ID (since 4.3.6) 
	window.plugins.calendar.createEventWithOptions(title,eventLocation,notes,startDate,endDate,calOptions,success,error);
	 
	// create an event interactively 
	window.plugins.calendar.createEventInteractively(title,eventLocation,notes,startDate,endDate,success,error);
	 
	// create an event interactively with the calOptions object as shown above 
	window.plugins.calendar.createEventInteractivelyWithOptions(title,eventLocation,notes,startDate,endDate,calOptions,success,error);
	 
	// create an event in a named calendar (iOS only, deprecated, use createEventWithOptions instead) 
	window.plugins.calendar.createEventInNamedCalendar(title,eventLocation,notes,startDate,endDate,calendarName,success,error);
	 
	// find events (on iOS this includes a list of attendees (if any)) 
	window.plugins.calendar.findEvent(title,eventLocation,notes,startDate,endDate,success,error);
	 
	// if you need to find events in a specific calendar, use this one. All options are currently ignored when finding events, except for the calendarName. 
	var calOptions = window.plugins.calendar.getCalendarOptions();
	calOptions.calendarName = "MyCreatedCalendar"; // iOS only 
	calOptions.id = "D9B1D85E-1182-458D-B110-4425F17819F1"; // if not found, we try matching against title, etc 
	window.plugins.calendar.findEventWithOptions(title,eventLocation,notes,startDate,endDate,calOptions,success,error);
	 
	// list all events in a date range (only supported on Android for now) 
	window.plugins.calendar.listEventsInRange(startDate,endDate,success,error);
	 
	// list all calendar names - returns this JS Object to the success callback: [{"id":"1", "name":"first"}, ..] 
	window.plugins.calendar.listCalendars(success,error);
	 
	// find all _future_ events in the first calendar with the specified name (iOS only for now, this includes a list of attendees (if any)) 
	window.plugins.calendar.findAllEventsInNamedCalendar(calendarName,success,error);
	 
	// change an event (iOS only for now) 
	var newTitle = "New title!";
	window.plugins.calendar.modifyEvent(title,eventLocation,notes,startDate,endDate,newTitle,eventLocation,notes,startDate,endDate,success,error);
	 
	// or to add a reminder, make it recurring, change the calendar, or the url, use this one: 
	var filterOptions = window.plugins.calendar.getCalendarOptions(); // or {} or null for the defaults 
	filterOptions.calendarName = "Bla"; // iOS only 
	filterOptions.id = "D9B1D85E-1182-458D-B110-4425F17819F1"; // iOS only, get it from createEventWithOptions (if not found, we try matching against title, etc) 
	var newOptions = window.plugins.calendar.getCalendarOptions();
	newOptions.calendaName = "New Bla"; // make sure this calendar exists before moving the event to it 
	// not passing in reminders will wipe them from the event. To wipe the default first reminder (60), set it to null. 
	newOptions.firstReminderMinutes = 120;
	window.plugins.calendar.modifyEventWithOptions(title,eventLocation,notes,startDate,endDate,newTitle,eventLocation,notes,startDate,endDate,filterOptions,newOptions,success,error);
	 
	// delete an event (you can pass nulls for irrelevant parameters, note that on Android `notes` is ignored). The dates are mandatory and represent a date range to delete events in. 
	// note that on iOS there is a bug where the timespan must not be larger than 4 years, see issue 102 for details.. call this method multiple times if need be 
	// since 4.3.0 you can match events starting with a prefix title, so if your event title is 'My app - cool event' then 'My app -' will match. 
	window.plugins.calendar.deleteEvent(newTitle,eventLocation,notes,startDate,endDate,success,error);
	 
	// delete an event, as above, but for a specific calendar (iOS only) 
	window.plugins.calendar.deleteEventFromNamedCalendar(newTitle,eventLocation,notes,startDate,endDate,calendarName,success,error);
	 
	// open the calendar app (added in 4.2.8): 
	// - open it at 'today' 
	window.plugins.calendar.openCalendar();
	// - open at a specific date, here today + 3 days 
	var d = new Date(new Date().getTime() + 3*24*60*60*1000);
	window.plugins.calendar.openCalendar(d, success, error); // callbacks are optional 
}