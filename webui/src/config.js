const API_URL = 'http://localhost:3101'

export const api = {
  ruuvitags: `${API_URL}/ruuvitag`,
  tellstickSensors: `${API_URL}/tellstick/sensors`,
  tellstickSwitches: `${API_URL}/tellstick/switches`,
  turnOnSwitch: `${API_URL}/tellstick/on`,
  turnOffSwitch: `${API_URL}/tellstick/off`
}
