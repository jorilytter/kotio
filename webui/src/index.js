import Vue from 'vue'
import {api} from './config.js'

const app = new Vue({
  el: '#app',
  data: {
    ruuvitags: 'No ruuvitags found'
  }
})

fetch(api.ruuvitags)
  .then(response => response.json())
  .then(data => app.ruuvitags = data)
