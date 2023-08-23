import { OrientationSensor, OrientationSensorReading } from 'orientation';
import { ORIENTATION } from '../config';
import { setOrientationView } from '../view/sensor';
import { sendMessage } from '../util/message';

export interface OrientationModel {
  timestampISO: string,
  x: number,
  y: number,
  z: number,
  scalar: number,
}

if(ORIENTATION.ENABLED && OrientationSensor) {
  const orientationSensor = new OrientationSensor({
    frequency: ORIENTATION.FREQUENCY,
  });

  orientationSensor.addEventListener('reading', () => {
    if(orientationSensor.quaternion === null) {
      return;
    }

    const orientationModel: OrientationModel = {
      timestampISO: new Date(Date.now()).toISOString(),
      x: orientationSensor.quaternion[0],
      y: orientationSensor.quaternion[1],
      z: orientationSensor.quaternion[2],
      scalar: orientationSensor.quaternion[3],
    }

    sendMessage({
      message_id: ORIENTATION.MESSAGE_ID,
      data: orientationModel,
    });

    setOrientationView(orientationModel); 
  });

  orientationSensor.addEventListener('activate', () => {
    console.log('orientation sensor activated');
  });

  orientationSensor.start();
} else {
  if(!ORIENTATION.ENABLED) {
    console.log('orientation sensor disabled');
  } else {
    console.error('orientation sensor not found');
  }
}
