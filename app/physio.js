export const physioState = {
  timestamp: -1,
  heartRate: [],
};

export const resetPhysioState = () => {
  physioState.timestamp = -1;
  physioState.heartRate = [];
};
