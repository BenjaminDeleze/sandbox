import WebotsView from 'https://cyberbotics.com/wwi/R2022b/WebotsView.js';

let webotsView = new WebotsView();
document.getElementById('robot-webots-view').appendChild(webotsView);
webotsView.loadScene('ned.x3d');

let showDeviceComponent = true;

let category = document.createElement('div');
category.classList.add('device-category');
category.innerHTML = '<div class="device-title">' + 'Rotational Motor' + '</div>';
document.getElementById('device-component').appendChild(category);

let deviceDiv = document.createElement('div');
deviceDiv.classList.add('device');
// deviceDiv.addEventListener('mouseover', () => highlightX3DElement(robotName, deviceDiv));
deviceDiv.innerHTML = '<div class="device-name">' + 'Base Joint' + '</div>';
category.appendChild(deviceDiv);

const motorDiv = document.createElement('div');
motorDiv.classList.add('motor-component');
deviceDiv.appendChild(motorDiv);

const minLabel = document.createElement('div');
minLabel.classList.add('motor-label');
const maxLabel = document.createElement('div');
maxLabel.classList.add('motor-label');
minLabel.innerHTML = -3.14; // 2 decimals.
maxLabel.innerHTML = 3.14;

const slider = document.createElement('input');
slider.classList.add('motor-slider');
slider.setAttribute('type', 'range');
slider.setAttribute('step', 'any');
slider.setAttribute('min', -Math.PI);
slider.setAttribute('max', Math.PI);
slider.setAttribute('value', 0);
slider.setAttribute('webots-id', 83);
slider.setAttribute('webots-type', 'rotation');
slider.setAttribute('webots-axis', 'z');
motorDiv.appendChild(minLabel);
motorDiv.appendChild(slider);
motorDiv.appendChild(maxLabel);

slider.addEventListener('input', () => sliderMotorCallback(slider, true));

if (document.getElementsByClassName('menu-button').length !== 0)
  document.getElementsByClassName('menu-button')[0].onclick = () => toggleDeviceComponent();
if (document.getElementsByClassName('fullscreen-button').length !== 0)
  document.getElementsByClassName('fullscreen-button')[0].onclick = () => toggleRobotComponentFullScreen();
if (document.getElementsByClassName('exit-fullscreen-button').length !== 0) {
  document.getElementsByClassName('exit-fullscreen-button')[0].onclick = () => toggleRobotComponentFullScreen();
  document.getElementsByClassName('exit-fullscreen-button')[0].style.display = 'none';
}
if (document.getElementsByClassName('reset-button').length !== 0)
  document.getElementsByClassName('reset-button')[0].onclick = () => resetRobotComponent();

if (document.getElementsByClassName('robot-component').length !== 0) {
  document.getElementsByClassName('robot-component')[0].onmouseenter = () => showButtons();
  document.getElementsByClassName('robot-component')[0].onmouseleave = () => hideButtons();
}

function showButtons() {
  if (document.getElementsByClassName('reset-button').length !== 0)
    document.getElementsByClassName('reset-button')[0].style.display = '';

  if (document.getElementsByClassName('fullscreen-button').length !== 0)
    document.getElementsByClassName('fullscreen-button')[0].style.display = '';

  if (document.getElementsByClassName('menu-button').length !== 0)
    document.getElementsByClassName('menu-button')[0].style.display = '';
}

function hideButtons() {
  if (document.getElementsByClassName('reset-button').length !== 0)
    document.getElementsByClassName('reset-button')[0].style.display = 'none';

  if (document.getElementsByClassName('fullscreen-button').length !== 0)
    document.getElementsByClassName('fullscreen-button')[0].style.display = 'none';

  if (document.getElementsByClassName('exit-fullscreen-button').length !== 0)
    document.getElementsByClassName('exit-fullscreen-button')[0].style.display = 'none';

  if (document.getElementsByClassName('menu-button').length !== 0)
    document.getElementsByClassName('menu-button')[0].style.display = 'none';
}

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

function resetRobotComponent(robot) {
  // unhighlightX3DElement(robot);

  // Reset the motor sliders.
  let sliders = document.getElementsByClassName('motor-slider');
  for (let s = 0; s < sliders.length; s++) {
    let slider = sliders[s];
    // if the attribute is not present, it means that the slider was not moved
    if (slider.hasAttribute('initialValue')) {
      slider.value = slider.getAttribute('initialValue');
      sliderMotorCallback(slider);
    }
  }

  webotsView.resetViewpoint();
  //  No need to force a render as it is already done in webotsView.resetViewpoint
}

function sliderMotorCallback(slider, render) {
  //  The first time the slider is moved, save the initial value for reset.
  if (!slider.hasAttribute('initialValue')) {
    let type = slider.getAttribute('webots-type');
    if (type === 'rotation')
      slider.setAttribute('initialValue', webotsView.getNode(slider.getAttribute('webots-id')).rotation.toString());
  }

  let value = parseFloat(slider.value);
  switch (slider.getAttribute('webots-type')) {
    case 'rotation':
      switch (slider.getAttribute('webots-axis')) {
        case 'z':
          webotsView.updateNode(slider.getAttribute('webots-id'), 'rotation', '0 0 1 ' + value, render);
          break;
      }
      break;
  }
}
// let button = document.getElementById('reset');
// button.onclick = () => {
//   webotsView.updateNode('83', 'rotation', slider.getAttribute('initialValue'));
// }
