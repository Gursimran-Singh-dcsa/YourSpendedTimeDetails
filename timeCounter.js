var timeCounter = /** @class */ (function () {
    function timeCounter() {
        this.startHandler = function () {
            console.log('start handler invoked');
        };
        this.resumeHandler = function () {
            console.log('resume handler invoked');
        };
        this.stopHandler = function () {
            console.log('resume handler invoked');
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
