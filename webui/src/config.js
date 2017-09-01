const RUUVITAG_API_URL = 'http://localhost:3102'
const TELLSTICK_API_URL = 'http://localhost:3101'

export const ruuvitagApi = {
  enabled: true,
  urls: {
    ruuvitags: `${RUUVITAG_API_URL}/ruuvitag`
  }
}

export const tellstickApi = {
  enabled: true,
  urls: {
    tellstickSensors: `${TELLSTICK_API_URL}/tellstick/sensors`,
    tellstickSwitches: `${TELLSTICK_API_URL}/tellstick/switches`,
    turnOnSwitch: `${TELLSTICK_API_URL}/tellstick/on`,
    turnOffSwitch: `${TELLSTICK_API_URL}/tellstick/off`
  }
}
