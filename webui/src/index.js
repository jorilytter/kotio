import Vue from 'vue'
import {ruuvitagApi, tellstickApi, FETCH_INTERVAL} from './config.js'
require('./index.css')

const tagData = {
  template:'<div class="tag">\
    <div class="tag-name">{{tag.name}}</div>\
    <div class="tag-temperature"><i class="fa fa-thermometer-half fa-lg green icon"></i>{{tag.data.temperature}} &deg;C</div>\
    <div class="tag-humidity"><i class="fa fa-tint fa-lg blue icon"></i>{{tag.data.humidity}}%</div>\
    <div class="tag-pressure"><i class="fa fa-tachometer fa-lg green icon"></i>{{tag.data.pressure}} hPa</div>\
    </div>',
  props: ['tag'],
  data: function() {
    return {}
  }
}

const tdSensorData = {
  template:'<div class="sensor">\
    <div class="sensor-name">{{sensor.name}}</div>\
    <div class="sensor-temperature"><i class="fa fa-thermometer-half fa-lg green icon"></i>{{sensor.temperature}} &deg;C</div>\
    <div class="sensor-humidity" v-if="sensor.humidity"><i class="fa fa-tint fa-lg blue icon"></i>{{sensor.humidity}}%</div>\
    </div>',
  props: ['sensor'],
  data: function() {
    return {}
  }
}

const toggleSwitch = (url, deviceIds) => {
  const postHeaders = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}
  const postBody = JSON.stringify(deviceIds)
  return fetch(url, {method: 'POST', mode: 'cors', body: postBody, headers: postHeaders})
    .then(response => response.json())
    .then(data => app.tellstickSwitches = data)
}

const tdSwitchData = {
  template:'<div v-if="device.switchedOn" v-on:click="turnOff(device.id)" class="switch clickable">\
      <div class="switch-status">\
        <i class="fa fa-power-off fa-lg green icon clickable"></i>\
      </div>\
      <div class="switch-name">{{device.name}}</div>\
    </div>\
    <div v-else v-on:click="turnOn(device.id)" class="switch clickable">\
      <div class="switch-status clickable">\
        <i class="fa fa-power-off fa-lg red icon"></i>\
      </div>\
      <div class="switch-name">{{device.name}}</div>\
    </div>',
  props: ['device'],
  data: function() {
    return {}
  },
  methods: {
    turnOn: function(deviceId) {
      toggleSwitch(tellstickApi.urls.turnOnSwitch, [deviceId])
    },
    turnOff: function(deviceId) {
      toggleSwitch(tellstickApi.urls.turnOffSwitch, [deviceId])
    }
  }
}

const app = new Vue({
  el: '#app',
  data: {
    ruuvitags: ruuvitagApi.enabled,
    tellstickSensors: tellstickApi.enabled,
    tellstickSwitches: tellstickApi.enabled,
    hasSensors: ruuvitagApi.enabled,
    hasSwitches: false,
    hasSwitchGroups: false
  },
  components: {
    'ruuvitag': tagData,
    'tdsensor': tdSensorData,
    'tdswitch': tdSwitchData
  }
})

function fetchRuuvitagData() {
  if (ruuvitagApi.enabled) {
    fetch(ruuvitagApi.urls.ruuvitags)
      .then(response => response.json())
      .then(data => app.ruuvitags = data)
  }
}

function fetchTellstickData() {
  if (tellstickApi.enabled) {
    fetch(tellstickApi.urls.tellstickSensors)
      .then(response => response.json())
      .then(data => {
        app.tellstickSensors = data

        if (data.length > 0) {
          app.hasSensors = true
        }
      })

    fetch(tellstickApi.urls.tellstickSwitches)
      .then(response => response.json())
      .then(data => {
        app.tellstickSwitches = data

        if (data.devices.length > 0) {
          app.hasSwitches = true
        }

        if (data.groups.length > 0) {
          app.hasSwitchGroups = true
        }
      })
  }
}

function fetchData() {
  fetchRuuvitagData()
  fetchTellstickData()
}

fetchData()

setInterval(fetchData, FETCH_INTERVAL)
