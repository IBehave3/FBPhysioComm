import { HeartRateSensor, HeartRateSensorReading } from 'heart-rate';
import { HEART_RATE } from '../config'
import { setHeartRateView } from '../view/sensor';
import { sendMessage } from '../util/message';

export interface HeartRateModel {
  timestampISO: string,
  heartRate: number,
}

if (HEART_RATE.ENABLED && HeartRateSensor) {
  const hearRateSensor = new HeartRateSensor({
    frequency: HEART_RATE.FREQUENCY,
  });

  hearRateSensor.addEventListener('reading', () => {
    if(hearRateSensor.heartRate == null) {
      return;
    }

    const heartRateModel: HeartRateModel = {
      timestampISO: new Date(Date.now()).toISOString(),
      heartRate: hearRateSensor.heartRate,
    }

    sendMessage({
      messageId: HEART_RATE.MESSAGE_ID,
      data: heartRateModel,
    });

    setHeartRateView(heartRateModel); 
  });

  hearRateSensor.addEventListener('activate', () => {
    console.log('heart rate sensor activated');
  });

  hearRateSensor.start();
} else {
  if(!HEART_RATE.ENABLED) {
    console.log('heart rate sensor disabled');
  } else {
    console.error('heart rate sensor not found');
  }
}

