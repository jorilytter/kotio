import Vue from 'vue'
import {api} from './config.js'

const tagData = {
  template: "<div><span>{{tag.name}}</span><span>{{tag.data.temperature}}</span><span>{{tag.data.humidity}}</span><span>{{tag.data.pressure}}</span></div>",
  props: ['tag'],
  data: function() {
    return {}
  }
}


const app = new Vue({
  el: '#app',
  data: {
    ruuvitags: 'waiting for data'
  },
  components: {
    'ruuvitag': tagData
  }
})

fetch(api.ruuvitags)
  .then(response => response.json())
  .then(data => app.ruuvitags = data)

function data() {
  return fetch(api.ruuvitags)
    .then(response => response.json())
}
