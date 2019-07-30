var timeCounter = /** @class */ (function () {
    function timeCounter() {
        var _this = this;
        this.startTime = [];
        this.pauseTime = [];
        this.restartTime = [];
        this.stopTime = [];
        this.previousTotal = [];
        this.ticking = true;
        this.init = function () {
            _this.hours = 0;
            _this.minutes = 0;
            _this.seconds = 0;
            _this.startTime = [];
            _this.setInput("id", "counter", "00:00:00");
        };
        this.startHandler = function () {
            _this.ticking = true;
            clearInterval(_this.timeInterval);
            _this.init();
            _this.startTime.push(_this.timeGetter());
            console.log(_this.startTime);
            _this.countTime();
        };
        this.resumeHandler = function () {
            _this.ticking = !_this.ticking;
            if (_this.ticking) {
                document.getElementById("resume").innerHTML = "Pause";
                _this.restartTime.push(_this.timeGetter());
                _this.countTime();
            }
            else {
                clearInterval(_this.timeInterval);
                document.getElementById("resume").innerHTML = "Resume";
                _this.pauseTime.push(_this.timeGetter());
            }
        };
        this.stopHandler = function () {
            clearInterval(_this.timeInterval);
            _this.init();
        };
        this.getTimeString = function () {
            return ((_this.hours < 10 ? '0' : '') + _this.hours + (_this.minutes < 10 ? ':0' : ':') + _this.minutes + (_this.seconds < 10 ? ':0' : ':') + _this.seconds);
        };
        this.setInput = function (Property, PropertyValue, value) {
            switch (Property) {
                case 'id':
                    document.getElementById(PropertyValue).value = value;
                    break;
            }
        };
        this.timeGetter = function () {
            var date = new Date();
            _this.hours = date.getHours();
            _this.minutes = date.getMinutes();
            _this.seconds = date.getSeconds();
            return _this.getTimeString();
        };
        this.countTime = function () {
            _this.timeInterval = setInterval(function () {
                console.log('startTime ', tc.startTime, ' pauseTime ', tc.pauseTime, ' restartTime ', tc.restartTime, ' stopTime ', tc.stopTime);
            }, 1000);
        };
    }
    return timeCounter;
}());
var tc = new timeCounter();
var startHandler = function () {
    tc.startHandler();
};
var resumeHandler = function () {
    tc.resumeHandler();
};
var stopHandler = function () {
    tc.stopHandler();
};
