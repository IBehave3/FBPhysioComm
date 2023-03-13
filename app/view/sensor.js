import * as document from 'document';

export const setHeartRateView = (heartRate) => {
  const heartRateElement = document.getElementById('heartRate'); 
  const heartRateText = `Heart Rate: ${heartRate}`;
  heartRateElement.text= heartRateText; 
}

export const setAccelerometerView = (x, y, z) => {
  const accelerometerElement = document.getElementById('accelerometer');
  const accelerometerText =  `Accelerometer: x: ${x}, y: ${y}, z: ${z}`;
  accelerometerElement.text = accelerometerText;
}

export const setBarometerView = (pressure) => {
  const barometerElement = document.getElementById('barometer');
  const barometerText = `Pressure: ${pressure}`
  barometerElement.text = barometerText;
}

export const setBodyPresenceView = (present) => {
  const bodyPresenceElement = document.getElementById('bodyPresence');
  const bodyPresenceText = `Body Presence: ${present}`;
  bodyPresenceElement.text = bodyPresenceText;
}

export const setGyroscopeView = (x, y, z) => {
  const gyroscopeElement = document.getElementById('gyroscope');
  const gyroscopeText = `Gyroscope: x: ${x}, y: ${y}, z: ${z}`;
  gyroscopeElement.text = gyroscopeText;
}

export const setOrientationView = (x, y, z, scalar) => {
  const orientationElement = document.getElementById('orientation');
  const orientationText = `Orientation: x: ${x}, y: ${y}, z: ${z}, s: ${scalar}`;
  orientationElement.text = orientationText;
}
