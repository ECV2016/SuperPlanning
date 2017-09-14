cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-calendar.Calendar",
        "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
        "pluginId": "cordova-plugin-calendar",
        "clobbers": [
            "Calendar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-calendar": "4.6.0"
};
// BOTTOM OF METADATA
});