import { Barometer } from 'barometer';
import { BAROMETER } from '../config';
import { physioState } from '../physio';
import { newMilliClock, updateMilliClock, getTimeMilliClock } from './milliClock';
import { setBarometerView } from '../view/sensor'

if (BAROMETER.ENABLED && Barometer) {
  const barometerSensorConfig = {
    frequency: Barometer.FREQUENCY,
    sample: Barometer.SAMPLE,
  };
  const barometer = new Barometer(barometerSensorConfig);
  const milliClock = newMilliClock(barometer);

  barometer.addEventListener('reading', () => {
    updateMilliClock(milliClock);

    const tsBarometer = {
      timestamp: getTimeMilliClock(milliClock),
      pressure: barometer.pressure,
    };

    physioState.barometer.push(tsBarometer);    
    setBarometerView(tsBarometer.pressure);
  });

  barometer.addEventListener('activate', () => {
    console.log('barometer sensor activated');
    setBarometerView(-1);
  });
  
  barometer.start();
} else {
  if(!BAROMETER.ENABLED) {
    console.log('barometer sensor disabled')
  } else {
    console.error('barometer sensor not found');
  }
}
