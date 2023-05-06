import * as document from 'document';

export const setHeartRateView = (heartRate) => {
  const heartRateElement = document.getElementById('heart-rate'); 
  const heartRateText = `${heartRate}`;

  heartRateElement.text= heartRateText; 
}

export const setAccelerometerView = (x, y, z) => {
  const accelerometerElementX = document.getElementById('accelerometer-x');
  const accelerometerElementY = document.getElementById('accelerometer-y');
  const accelerometerElementZ = document.getElementById('accelerometer-z');

  const accelerometerTextX = `${x}`;
  const accelerometerTextY = `${y}`;
  const accelerometerTextZ = `${z}`;

  accelerometerElementX.text = accelerometerTextX;
  accelerometerElementY.text = accelerometerTextY;
  accelerometerElementZ.text = accelerometerTextZ;
}

export const setBarometerView = (pressure) => {
  const barometerElement = document.getElementById('barometer');
  const barometerText = `${pressure}`;

  barometerElement.text = barometerText;
}

export const setBodyPresenceView = (present) => {
  const bodyPresenceElement = document.getElementById('body-presence');
  const bodyPresenceText = `${present}`;

  bodyPresenceElement.text = bodyPresenceText;
}

export const setGyroscopeView = (x, y, z) => {
  const gyroscopeElementX = document.getElementById('gyroscope-x');
  const gyroscopeElementY = document.getElementById('gyroscope-y');
  const gyroscopeElementZ = document.getElementById('gyroscope-z');

  const gyroscopeTextX = `${x}`;
  const gyroscopeTextY = `${y}`;
  const gyroscopeTextZ = `${z}`;

  gyroscopeElementX.text = gyroscopeTextX;
  gyroscopeElementY.text = gyroscopeTextY;
  gyroscopeElementZ.text = gyroscopeTextZ;
}

export const setOrientationView = (x, y, z, scalar) => {
  const orientationElementX = document.getElementById('orientation-x');
  const orientationElementY = document.getElementById('orientation-y');
  const orientationElementZ = document.getElementById('orientation-z');
  const orientationElementScalar = document.getElementById('orientation-scalar');

  const orientationTextX = `${x}`;
  const orientationTextY = `${y}`;
  const orientationTextZ = `${z}`;
  const orientationTextScalar = `${scalar}`;

  orientationElementX.text = orientationTextX;
  orientationElementY.text = orientationTextY;
  orientationElementZ.text = orientationTextZ;
  orientationElementScalar.text = orientationTextScalar;
}
