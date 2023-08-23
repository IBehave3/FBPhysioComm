import { Barometer, BarometerReading } from 'barometer';
import { BAROMETER } from '../config';
import { setBarometerView } from '../view/sensor'
import { sendMessage } from '../util/message';


export interface BarometerModel {
  timestampISO: string,
  pressure: number,
}

if (BAROMETER.ENABLED && Barometer) {
  const barometer = new Barometer({
    frequency: BAROMETER.FREQUENCY,
  });

  barometer.addEventListener('reading', () => {
    if(barometer.pressure == null) {
      return;
    }

    const barometerModel: BarometerModel = {
      timestampISO: new Date(Date.now()).toISOString(),
      pressure: barometer.pressure,
    }

    sendMessage({
      message_id: BAROMETER.MESSAGE_ID,
      data: barometerModel,
    });

    setBarometerView(barometerModel); 
  });

  barometer.addEventListener('activate', () => {
    console.log('barometer sensor activated');
  });
  
  barometer.start();
} else {
  if(!BAROMETER.ENABLED) {
    console.log('barometer sensor disabled')
  } else {
    console.error('barometer sensor not found');
  }
}
