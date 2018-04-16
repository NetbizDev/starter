var Utils = {
    random: function (min, max) {
        return Math.floor((Math.random()*max)+min);
    },

    callOnEnterKey: function (element, callBack) {
        element.keypress(function(e) {
            if(e.which == 13) {
                callBack.call(this);
            }
        });
    },
    getRefByName: function (fullName) {
        var arrName = fullName.split(".");
        var lastObjectToLookUnder = window;

        for (var i = 0; i < arrName.length; i++) {
            var currNameSection = arrName[i];
            var currType = typeof(lastObjectToLookUnder[currNameSection]);

            if (currType != "undefined" && currType != undefined) {
                lastObjectToLookUnder = lastObjectToLookUnder[currNameSection];
            }
            else {
                return null;
            }

        }

        return lastObjectToLookUnder;
    }
};

if (!String.prototype.format) {
    String.prototype.format = function() {

        var args = arguments;
        var sprintfRegex = /\{(\d+)\}/g;

        var sprintf = function (match, number) {
            return number in args ? args[number] : match;
        };

        return this.replace(sprintfRegex, sprintf);
    };
}