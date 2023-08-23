import document from 'document';
import { HeartRateModel } from '../sensor/heartRate';
import { OrientationModel } from '../sensor/orientation';
import { GyroscopeModel } from '../sensor/gyroscope';
import { BarometerModel } from '../sensor/barometer';
import { AccelerometerModel } from '../sensor/accelerometer';

export const setHeartRateView = (heartRateSensorReading: HeartRateModel) => {
  const heartRateElement = document.getElementById('heart-rate'); 

  if(heartRateElement === null) {
    console.error('hearRate element was null');
    return;
  }

  const heartRateText = `${heartRateSensorReading.heartRate}`;

  heartRateElement.text= heartRateText; 
}

export const setAccelerometerView = (accelerometerReading: AccelerometerModel) => {
  const accelerometerElementX = document.getElementById('accelerometer-x');
  const accelerometerElementY = document.getElementById('accelerometer-y');
  const accelerometerElementZ = document.getElementById('accelerometer-z');

  if(accelerometerElementX === null || accelerometerElementY === null || accelerometerElementZ === null) {
    console.error('one or more accelerometer elements were null');
    return;
  }

  const accelerometerTextX = `${accelerometerReading.x}`;
  const accelerometerTextY = `${accelerometerReading.y}`;
  const accelerometerTextZ = `${accelerometerReading.z}`;

  accelerometerElementX.text = accelerometerTextX;
  accelerometerElementY.text = accelerometerTextY;
  accelerometerElementZ.text = accelerometerTextZ;
}

export const setBarometerView = (barometerReading: BarometerModel) => {
  const barometerElement = document.getElementById('barometer');

  if(barometerElement === null) {
    console.error('barometer element was null');
    return;
  }

  const barometerText = `${barometerReading.pressure}`;

  barometerElement.text = barometerText;
}

export const setGyroscopeView = (gyroscopeModel: GyroscopeModel) => {
  const gyroscopeElementX = document.getElementById('gyroscope-x');
  const gyroscopeElementY = document.getElementById('gyroscope-y');
  const gyroscopeElementZ = document.getElementById('gyroscope-z');

  if(gyroscopeElementX === null || gyroscopeElementY === null || gyroscopeElementZ === null) {
    console.error('one or more gyroscope elements were null');
    return;
  }

  const gyroscopeTextX = `${gyroscopeModel.x}`;
  const gyroscopeTextY = `${gyroscopeModel.y}`;
  const gyroscopeTextZ = `${gyroscopeModel.z}`;

  gyroscopeElementX.text = gyroscopeTextX;
  gyroscopeElementY.text = gyroscopeTextY;
  gyroscopeElementZ.text = gyroscopeTextZ;
}

export const setOrientationView = (orientationModel: OrientationModel) => {
  const orientationElementX = document.getElementById('orientation-x');
  const orientationElementY = document.getElementById('orientation-y');
  const orientationElementZ = document.getElementById('orientation-z');
  const orientationElementScalar = document.getElementById('orientation-scalar');

  if(orientationElementX === null || orientationElementY === null || orientationElementZ === null || orientationElementScalar === null) {
    console.error('one or more orientation elements were null');
    return;
  }

  const orientationTextX = `${orientationModel.x}`;
  const orientationTextY = `${orientationModel.y}`;
  const orientationTextZ = `${orientationModel.z}`;
  const orientationTextScalar = `${orientationModel.scalar}`;

  orientationElementX.text = orientationTextX;
  orientationElementY.text = orientationTextY;
  orientationElementZ.text = orientationTextZ;
  orientationElementScalar.text = orientationTextScalar;
}
