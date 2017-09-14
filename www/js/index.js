var groups = ['WebDev 1', 'WebDev 2'];

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    onGetGroups: function(groups) {
        groups.forEach(function(group) {
            $('#jsChoosePromotion').append('<option value="id">' + group + '</option>');
        });
    }

};

app.initialize();
app.onGetGroups(groups);