var notifications = {

	send: function(){
		var date = new Date();
		cordova.plugins.notification.local.schedule({
		    id: 1,
		    title: "Message Title",
		    message: "Message Text"
		});
	}
};