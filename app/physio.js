import * as config from './config';
import * as document from 'document';

export const physioState = {}

export const resetPhysioState = () => {
  physioState.timestamp = '';
  if(config.HEART_RATE.ENABLED) { physioState.heartRate = []; }
  if(config.ACCELEROMETER.ENABLED) { physioState.accelerometer = []; }
  if(config.BAROMETER.ENABLED) { physioState.barometer = []; }
  if(config.BODY_PRESENCE.ENABLED) { physioState.bodyPresence = []; }
  if(config.GYROSCOPE.ENABLED) { physioState.gyroscope = []; }
  if(config.ORIENTATION.ENABLED) { physioState.orientation = []; }
};

resetPhysioState();
