class timeCounter {

  startTime = [];
  pauseTime = [];
  restartTime = [];
  stopTime = [];
  startHandler = () => {
    console.log('start handler invoked');
  }

  resumeHandler = () => {
    console.log('resume handler invoked');
  }

  stopHandler = () => {
    console.log('resume handler invoked');
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