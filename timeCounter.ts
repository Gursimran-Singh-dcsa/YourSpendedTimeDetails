class timeCounter {

  hours:number;
  minutes:number;
  seconds:number;
  startTime:any = [];
  pauseTime:any = [];
  restartTime:any = [];
  stopTime:any = [];
  previousTotal:any = [];
  timeInterval:any;
  ticking:boolean = true;

  init = () => {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.startTime = [];
    this.setInput("id", "counter", "00:00:00");
  }

  startHandler = () => {
    this.ticking = true;
    clearInterval(this.timeInterval);
    this.init();
    this.startTime.push(this.timeGetter());
    console.log(this.startTime);
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
        console.log('startTime ', tc.startTime, ' pauseTime ', tc.pauseTime, ' restartTime ', tc.restartTime, ' stopTime ', tc.stopTime);
      },1000);
  }

}

var tc = new timeCounter();
const startHandler = () => {
  tc.startHandler();
}
const resumeHandler = () => {
  tc.resumeHandler();
}
const stopHandler = () => {
  tc.stopHandler();
}