import {api} from './config.js'

const createDiv = data => {
  const element = document.createElement('div')
  element.innerHTML = data
  return element
}

const createDataElements = tagData => {
  const rootElement = document.createElement('div')
  rootElement.appendChild(createDiv(tagData.name))
  rootElement.appendChild(createDiv(`Lämpotila: ${tagData.data.temperature}`))
  rootElement.appendChild(createDiv(`Ilmanpaine: ${tagData.data.pressure}`))
  rootElement.appendChild(createDiv(`Ilmankosteus: ${tagData.data.humidity}`))
  return rootElement
}

const formatRuuvitagsData = data => {
  const dataElements = data.map(tagData => createDataElements(tagData))
  const rootElement = document.createElement('div')
  dataElements.map(element => rootElement.appendChild(element))
  return rootElement
}

fetch(api.ruuvitags)
  .then(response => response.json())
  .then(data => formatRuuvitagsData(data))
  .then(div => document.body.appendChild(div))
