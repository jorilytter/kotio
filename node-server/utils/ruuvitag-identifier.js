const scanner = require('eddystone-beacon-scanner')
const SCANTIME = 10000

scanner.on('found', print)

function print(tag) {
  console.log('tag details:', tag)
}

scanner.startScanning()

setTimeout(() => {
  scanner.stopScanning()
}, SCANTIME)
