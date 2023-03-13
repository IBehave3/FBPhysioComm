export const newMilliClock = (sensor) => {
  return {
    lastHeartRateTS:  -1,
    finalTimeStamp: -1,
    sensor: sensor,
  }
}

export const updateMilliClock = (milliClock) => {
  if(milliClock.lastHeartRateTS != -1) {
    milliClock.finalTimeStamp += milliClock.sensor.timestamp - milliClock.lastHeartRateTS;
  } else {
    milliClock.finalTimeStamp = Date.now();
  }

  milliClock.lastHeartRateTS = milliClock.sensor.timestamp;
}

export const getTimeMilliClock = (milliClock) => {
  return milliClock.finalTimeStamp;
}
