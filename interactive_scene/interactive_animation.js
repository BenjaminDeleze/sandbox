import WebotsView from 'https://cyberbotics.com/wwi/R2022b/WebotsView.js';

let webotsView = new WebotsView();
document.getElementById('robot-webots-view').appendChild(webotsView);
webotsView.loadScene('ned.x3d');

let showDeviceComponent = true;

const slider = document.createElement('input');
slider.classList.add('motor-slider');
slider.setAttribute('type', 'range');
slider.setAttribute('step', 'any');
slider.setAttribute('min', -Math.PI);
slider.setAttribute('max', Math.PI);
slider.setAttribute('value', 0);

slider.addEventListener('input', () => {
  if (!slider.hasAttribute('initialValue'))
    slider.setAttribute('initialValue', webotsView.getNode('83').rotation.toString());

  let value = parseFloat(slider.value);
  webotsView.updateNode('83', 'rotation', '0 0 1 ' + value);
});

document.getElementById('device-component').appendChild(slider);

if (document.getElementsByClassName('menu-button').length !== 0)
  document.getElementsByClassName('menu-button')[0].onclick = () => toggleDeviceComponent();
if (document.getElementsByClassName('fullscreen-button').length !== 0)
  document.getElementsByClassName('fullscreen-button')[0].onclick = () => toggleRobotComponentFullScreen();
if (document.getElementsByClassName('exit-fullscreen-button').length !== 0) {
  document.getElementsByClassName('exit-fullscreen-button')[0].onclick = () => toggleRobotComponentFullScreen();
  document.getElementsByClassName('exit-fullscreen-button')[0].style.display = 'none';
}
// if (document.getElementsByClassName('reset-button').length !== 0)
//   document.getElementsByClassName('reset-button')[0].onclick = () => resetRobotComponent(robotName);
//
// if (document.getElementsByClassName('robot-component').length !== 0) {
//   document.getElementsByClassName('robot-component')[0].onmouseenter = () => showButtons();
//   document.getElementsByClassName('robot-component')[0].onmouseleave = () => hideButtons(robotName);
// }

// function showButtons() {
//   if (document.getElementsByClassName('reset-button').length !== 0)
//     document.getElementsByClassName('reset-button')[0].style.display = '';
//
//   if (document.getElementsByClassName('fullscreen-button').length !== 0)
//     document.getElementsByClassName('fullscreen-button')[0].style.display = '';
//
//   if (document.getElementsByClassName('menu-button').length !== 0)
//     document.getElementsByClassName('menu-button')[0].style.display = '';
// }
//
// function hideButtons(robot) {
//   if (document.getElementsByClassName('reset-button').length !== 0)
//     document.getElementsByClassName('reset-button')[0].style.display = 'none';
//
//   if (document.getElementsByClassName('fullscreen-button').length !== 0)
//     document.getElementsByClassName('fullscreen-button')[0].style.display = 'none';
//
//   if (document.getElementsByClassName('exit-fullscreen-button').length !== 0)
//     document.getElementsByClassName('exit-fullscreen-button')[0].style.display = 'none';
//
//   if (document.getElementsByClassName('menu-button').length !== 0)
//     document.getElementsByClassName('menu-button')[0].style.display = 'none'

function toggleDeviceComponent() {
  showDeviceComponent = !showDeviceComponent;
  updateRobotComponentDimension();

  let arrow = document.getElementById('arrow');
  if (arrow) {
    if (arrow.className === 'arrow-right')
      arrow.className = 'arrow-left';
    else if (arrow.className === 'arrow-left')
      arrow.className = 'arrow-right';
  }
}

function updateRobotComponentDimension() {
  const deviceMenu = document.getElementById('device-component');
  const robotView = document.getElementById('robot-view');

  if (showDeviceComponent === true) {
    deviceMenu.style.display = '';
    robotView.style.width = '70%';
  } else {
    deviceMenu.style.display = 'none';
    robotView.style.width = '100%';
  }

  webotsView.resize();
}

function toggleRobotComponentFullScreen(robot) {
  if (document.fullscreenElement) {
    document.getElementsByClassName('fullscreen-button')[0].style.display = '';
    document.getElementsByClassName('exit-fullscreen-button')[0].style.display = 'none';

    if (document.exitFullscreen)
      document.exitFullscreen();
  } else {
    document.getElementsByClassName('fullscreen-button')[0].style.display = 'none';
    document.getElementsByClassName('exit-fullscreen-button')[0].style.display = '';

    if (document.getElementById('robot-component').requestFullscreen) {
      document.getElementById('robot-component').requestFullscreen();
      document.addEventListener('fullscreenchange', function() {
        updateRobotComponentDimension();
      });
    }
  }
}
// let button = document.getElementById('reset');
// button.onclick = () => {
//   webotsView.updateNode('83', 'rotation', slider.getAttribute('initialValue'));
// }
