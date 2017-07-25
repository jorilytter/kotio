import Vue from 'vue'
import {api} from './config.js'
import css from './index.css'

const tagData = {
  template:'<div class="tag">\
    <div class="tag-name">{{tag.name}}</div>\
    <div class="tag-temperature"><i class="fa fa-thermometer-half fa-lg yellow icon"></i>{{tag.data.temperature}} &deg;C</div>\
    <div class="tag-humidity"><i class="fa fa-tint fa-lg blue icon"></i>{{tag.data.humidity}}%</div>\
    <div class="tag-pressure"><i class="fa fa-tachometer fa-lg green icon"></i>{{tag.data.pressure}} hPa</div>\
    </div>',
  props: ['tag'],
  data: function() {
    return {}
  }
}

const tdSensorData = {
  template:'<div class="tag">\
    <div class="tag-name">{{sensor.name}}</div>\
    <div class="tag-temperature"><i class="fa fa-thermometer-half fa-lg yellow icon"></i>{{sensor.temperature}} &deg;C</div>\
    <div class="tag-humidity" v-if="sensor.humidity"><i class="fa fa-tint fa-lg blue icon"></i>{{sensor.humidity}}%</div>\
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
  template:'<div class="tag">\
    <div class="tag-name">{{device.name}}</div>\
    <div class="tag-temperature">{{device.id}}</div>\
    <div class="tag-humidity">\
      <i v-if="device.switchedOn" v-on:click="turnOff(device.id)" class="fa fa-power-off fa-lg yellow icon clickable"></i>\
      <i v-else v-on:click="turnOn(device.id)" class="fa fa-power-off fa-lg red icon clickable"></i>\
    </div>\
    </div>',
  props: ['device'],
  data: function() {
    return {}
  },
  methods: {
    turnOn: function(deviceId) {
      toggleSwitch(api.turnOnSwitch, [deviceId])
    },
    turnOff: function(deviceId) {
      toggleSwitch(api.turnOffSwitch, [deviceId])
    }
  }
}

const app = new Vue({
  el: '#app',
  data: {
    ruuvitags: 'waiting for data',
    tellstickSensors: 'waiting for data',
    tellstickSwitches: 'waiting for data'
  },
  components: {
    'ruuvitag': tagData,
    'tdsensor': tdSensorData,
    'tdswitch': tdSwitchData
  }
})

fetch(api.ruuvitags)
  .then(response => response.json())
  .then(data => app.ruuvitags = data)

fetch(api.tellstickSensors)
  .then(response => response.json())
  .then(data => app.tellstickSensors = data)

fetch(api.tellstickSwitches)
  .then(response => response.json())
  .then(data => app.tellstickSwitches = data)
