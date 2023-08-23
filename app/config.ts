type SensorConfigModel = {
  ENABLED: boolean,
  FREQUENCY: number,
  MESSAGE_ID: string,
}

export const HEART_RATE: SensorConfigModel = {
  ENABLED: true,
  FREQUENCY: 50,
  MESSAGE_ID: 'heart_rate',
};

export const ACCELEROMETER: SensorConfigModel = {
  ENABLED: true,
  FREQUENCY: 50,
  MESSAGE_ID: 'accelerometer',
};

export const BAROMETER: SensorConfigModel = {
  ENABLED: true,
  FREQUENCY: 50,
  MESSAGE_ID: 'barometer',
};

export const GYROSCOPE: SensorConfigModel = {
  ENABLED: true,
  FREQUENCY: 50,
  MESSAGE_ID: 'gyroscope',
};

export const ORIENTATION: SensorConfigModel = {
  ENABLED: true,
  FREQUENCY: 50,
  MESSAGE_ID: 'orientation',
};
