var timeCounter = /** @class */ (function () {
    function timeCounter() {
        var _this = this;
        this.startTime = [];
        this.pauseTime = [];
        this.restartTime = [];
        this.stopTime = [];
        this.ticking = true;
        this.init = function () {
            _this.hours = 0;
            _this.minutes = 0;
            _this.seconds = 0;
            _this.startTime.push(_this.timeGetter());
            _this.restartTime = _this.startTime;
            _this.pauseTime.push(_this.timeGetter());
            _this.setInput("id", "counter", "00:00:00");
        };
        this.startHandler = function () {
            _this.ticking = true;
            clearInterval(_this.timeInterval);
            _this.init();
            console.log(_this.startTime);
            _this.countTime();
        };
        this.resumeHandler = function () {
            _this.ticking = !_this.ticking;
            if (_this.ticking) {
                document.getElementById("resume").innerHTML = "Pause";
                _this.restartTime.push(_this.timeGetter());
                console.log('restart called', _this.restartTime);
                _this.countTime();
            }
            else {
                clearInterval(_this.timeInterval);
                document.getElementById("resume").innerHTML = "Resume";
                _this.pauseTime.push(_this.timeGetter());
                console.log('pause called', _this.pauseTime);
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
                console.log('i am called');
                tc.getOutput();
                // console.log('startTime ', tc.startTime, ' pauseTime ', tc.pauseTime, ' restartTime ', tc.restartTime, ' stopTime ', tc.stopTime);
            }, 1000);
        };
        this.getOutput = function () {
            var currentTime = _this.timeGetter();
            var totalDiff = _this.getDiff(_this.startTime[0], currentTime);
            var totalTime = '00:00:00';
            // totalTime = this.add(, this.restartTime.forEach((element,index) => {
            // console.log('index is ', index);
            //console.log(tc.pauseTime[index], tc.restartTime[index]);
            // this.getDiff(tc.pauseTime[index], tc.restartTime[index])
            //}));
            for (var i = 0; i < _this.restartTime.length; i++) {
                totalTime = _this.add(totalTime, _this.getDiff(_this.pauseTime[i], _this.restartTime[i]));
            }
            if (_this.pauseTime.length > _this.restartTime.length) {
                totalTime = _this.add(totalTime, _this.getDiff(_this.pauseTime[_this.pauseTime.length], currentTime));
            }
            totalDiff = _this.getDiff(totalTime, totalDiff);
            _this.setInput("id", "counter", totalDiff);
        };
        this.getDiff = function (timeString1, timeString2) {
            var _a = _this.timeBreaker(timeString1), h1 = _a[0], m1 = _a[1], s1 = _a[2];
            var _b = _this.timeBreaker(timeString2), h2 = _b[0], m2 = _b[1], s2 = _b[2];
            if (_this.validateTime(h1, m1, s1, h2, m2, s2)) {
                var totalStartSec = (h1 * 3600) + (m1 * 60) + s1;
                var totalEndSec = (h2 * 3600) + (m2 * 60) + s2;
                var timeDiffInSec = totalEndSec - totalStartSec;
                var hourDiff = Math.floor(timeDiffInSec / 3600);
                var minDiff = timeDiffInSec % 3600;
                minDiff = Math.floor(minDiff / 60);
                var secDiff = (timeDiffInSec % 60);
                _this.hours = hourDiff;
                _this.minutes = minDiff;
                _this.seconds = secDiff;
                return _this.getTimeString();
            }
            else {
                clearInterval(_this.timeInterval);
                console.log('invalid times');
                return '00:00:00';
            }
        };
        this.add = function (timeString1, timeString2) {
            var _a = _this.timeBreaker(timeString1), h1 = _a[0], m1 = _a[1], s1 = _a[2];
            var _b = _this.timeBreaker(timeString2), h2 = _b[0], m2 = _b[1], s2 = _b[2];
            var totalStartSec = (h1 * 3600) + (m1 * 60) + s1;
            var totalEndSec = (h2 * 3600) + (m2 * 60) + s2;
            var totalTimeInSec = totalEndSec + totalStartSec;
            var totalHour = Math.floor(totalTimeInSec / 3600);
            var totalMin = totalTimeInSec % 3600;
            totalMin = Math.floor(totalMin / 60);
            var totalSec = (totalTimeInSec % 60);
            _this.hours = totalHour;
            _this.minutes = totalMin;
            _this.seconds = totalSec;
            return _this.getTimeString();
        };
    }
    timeCounter.prototype.timeBreaker = function (time) {
        return ([parseInt(time.slice(0, 2)), parseInt(time.slice(3, 5)), parseInt((time.slice(6, 8) == "") ? "0" : time.slice(6, 8))]);
    };
    timeCounter.prototype.validateTime = function (startHour, startMin, startSec, endHour, endMin, endSec) {
        var timeIsValid = true;
        if ((startHour > endHour) || (startHour == endHour && startMin > endMin) || (startHour == endHour && startMin == endMin && startSec > endSec)) {
            timeIsValid = false;
            return timeIsValid;
        }
        return timeIsValid;
    };
    return timeCounter;
}());
var tc = new timeCounter();
tc.init();
var startHandler = function () {
    tc.startHandler();
};
var resumeHandler = function () {
    tc.resumeHandler();
};
var stopHandler = function () {
    tc.stopHandler();
};
