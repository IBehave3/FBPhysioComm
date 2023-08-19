import { BodyPresenseSensor } from 'body-presence';
import { BODY_PRESENCE } from '../config';
import { physioState } from '../physio';
import { newMilliClock, updateMilliClock, getTimeMilliClock } from './milliClock';
import { setBodyPresenceView } from '../view/sensor';

if (BODY_PRESENCE.ENABLED && BodyPresenseSensor) {
  const bodyPresence = new BodyPresenseSensor();
  const milliClock = newMilliClock(bodyPresence);

  bodyPresence.addEventListener('reading', () => {
    updateMilliClock(milliClock);

    const tsBodyPresence = {
      timestamp: new Date(Date.now()).toISOString(),
      heartRate: bodyPresence.present,
    };

    physioState.bodyPresence.push(tsBodyPresence);
    setBodyPresenceView(bodyPresence.present);
  });

  bodyPresence.addEventListener('activate', () => {
    console.log('body presence sensor activated');
    setBodyPresenceView(false);
  });
} else {
  if(!BODY_PRESENCE.ENABLED) {
    console.log('body presence sensor disabled');
  } else {
    console.error('body presence sensor not found');
  }
}
