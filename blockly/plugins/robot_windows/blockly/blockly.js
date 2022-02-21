import RobotWindow from 'https://cyberbotics.com/wwi/R2022b/RobotWindow.js';

var RobotName = null;

window.loadRobot =  function() {
  window.robotWindow.send('robotName:' + RobotName + '/' + challengeNumber);
}
// A message coming from the robot has been received.
function receive(message, robot) {
  if (message.startsWith('init:')) {
    totalDistance = parseFloat(message.substr(5));
    console.log(totalDistance)
    document.getElementById("remainingDistanceProgressBar").max = totalDistance-0.2;
  }
  else if (message.startsWith('distance:')) {
    let distanceValue = totalDistance - parseFloat(message.substr(9));
    document.getElementById('remainingDistanceProgressBar').value = distanceValue;
  }
  else if (message.startsWith('success')){
    log("Success: " + RobotName + " reached the target of the " + challengeName + " challenge !");
  }
  else if (message.startsWith('failure'))
    log("Failure: " + RobotName + " did not reach the target of the " + challengeName + " challenge.");
}

// Initialize the RobotWindow class in order to communicate with the robot.
window.onload = function() {
  window.robotWindow = new RobotWindow();
  window.robotWindow.setTitle('mobile robotics challenges');
  window.robotWindow.receive = receive;
};
