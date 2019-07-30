class timeCounter {

  hours:number;
  minutes:number;
  seconds:number;
  startTime:any = [];
  pauseTime:any = [];
  restartTime:any = [];
  stopTime:any = [];
  timeInterval:any;
  ticking:boolean = true;

  init = () => {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.startTime.push(this.timeGetter());
    this.restartTime = this.startTime;
    this.pauseTime.push(this.timeGetter());
    this.setInput("id", "counter", "00:00:00");
  }

  startHandler = () => {
    this.ticking = true;
    clearInterval(this.timeInterval);
    this.init();
    this.countTime();
  }

  resumeHandler = () => {
    this.ticking = !this.ticking;
    if(this.ticking) {
      document.getElementById("resume").innerHTML = "Pause";
      this.restartTime.push(this.timeGetter());
      this.countTime();
    } else {
      clearInterval(this.timeInterval);
      document.getElementById("resume").innerHTML = "Resume";
      this.pauseTime.push(this.timeGetter());
    }
  }

  stopHandler = () => {
    clearInterval(this.timeInterval);
    this.init();
  }

  getTimeString = () => {
    return ((this.hours < 10 ? '0' : '') + this.hours + (this.minutes < 10 ? ':0' : ':') + this.minutes + (this.seconds < 10 ? ':0' : ':') + this.seconds);
  }

  setInput = (Property:string, PropertyValue:string, value:string) => {
    switch(Property) {
      case 'id': 
        (<HTMLInputElement>document.getElementById(PropertyValue)).value = value;
        break;
    }
  }
  timeGetter = () => {
    var date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    return this.getTimeString();
  }

  countTime = () => {
    this.timeInterval = setInterval(
      function() {
         tc.getOutput()
      },1000);
  }

  getOutput = () => {
    var currentTime = this.timeGetter();
    var totalDiff = this.getDiff( this.startTime[0], currentTime);
    var totalTime = '00:00:00';
    for(var i=0;i<this.restartTime.length;i++) {
      totalTime = this.add( totalTime, this.getDiff(this.pauseTime[i], this.restartTime[i]));
    }
    if(this.pauseTime.length > this.restartTime.length) {
      totalTime = this.add(totalTime, this.getDiff(this.pauseTime[this.pauseTime.length], currentTime));
    }
    totalDiff = this.getDiff(totalTime, totalDiff);
    this.setInput("id", "counter", totalDiff);
  }

  getDiff = (timeString1, timeString2) => {
    const [h1, m1, s1] = this.timeBreaker(timeString1);
    const [h2, m2, s2] = this.timeBreaker(timeString2);
    if(this.validateTime(h1, m1, s1, h2, m2, s2)) {
      var totalStartSec:number = (h1 * 3600) + (m1 * 60) + s1;
      var totalEndSec:number = (h2 * 3600) + (m2 * 60) + s2;
      var timeDiffInSec:number = totalEndSec - totalStartSec;
      var hourDiff:number = Math.floor(timeDiffInSec / 3600);
      var minDiff:number = timeDiffInSec % 3600;
      minDiff = Math.floor(minDiff / 60);
      var secDiff:number = (timeDiffInSec % 60);
      this.hours = hourDiff;
      this.minutes = minDiff;
      this.seconds =  secDiff;
      return this.getTimeString();
    } else {
      clearInterval(this.timeInterval);
      return '00:00:00';
    }
  }

  add = (timeString1, timeString2) => {
    const [h1, m1, s1] = this.timeBreaker(timeString1);
    const [h2, m2, s2] = this.timeBreaker(timeString2);
    var totalStartSec:number = (h1 * 3600) + (m1 * 60) + s1;
    var totalEndSec:number = (h2 * 3600) + (m2 * 60) + s2;
    var totalTimeInSec:number = totalEndSec + totalStartSec;
    var totalHour:number = Math.floor(totalTimeInSec / 3600);
    var totalMin:number = totalTimeInSec % 3600;
    totalMin = Math.floor(totalMin / 60);
    var totalSec:number = (totalTimeInSec % 60);
    this.hours = totalHour;
    this.minutes = totalMin;
    this.seconds =  totalSec;
    return this.getTimeString();
  }

  timeBreaker(time:string)
  {
    return ([parseInt(time.slice(0,2)), parseInt(time.slice(3,5)), parseInt((time.slice(6,8) == "") ? "0" : time.slice(6,8))])
  }

  validateTime(startHour:number, startMin:number, startSec:number, endHour:number, endMin:number, endSec:number): boolean {
    var timeIsValid = true;
    if ((startHour > endHour) || (startHour == endHour && startMin > endMin) || (startHour == endHour && startMin == endMin && startSec > endSec)) {
      timeIsValid = false;
      return timeIsValid;
    }
    return timeIsValid;
  }

}

var tc = new timeCounter();
tc.init();
const startHandler = () => {
  tc.startHandler();
}
const resumeHandler = () => {
  tc.resumeHandler();
}
const stopHandler = () => {
  tc.stopHandler();
}