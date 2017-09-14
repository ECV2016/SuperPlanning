var notifications = {
	send: function(events){
		var i = 1;
		events.forEach(function(event){
			event.id = i;
			event.title = event.name;
			event.text = event.startDate+" "+event.status;
			i++;
		});
		cordova.plugins.notification.local.schedule(events);
	}
};