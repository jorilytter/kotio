# Kotio servers

Servers run on Node.js. I have used v6.10.3 on my development computer and v6.9.1 on my original Raspberry Pi B.

Kotio consists of multiple servers, one for each type of protocol. Currently three servers have been implemented.
* Tellstick [README](tellstick/README.md)
* Ruuvitag [README](ruuvitag/README.md)
* Philips Hue [README](hue/README.md)

## Node.js on original Raspberry Pi or Raspberry Pi Zero

*Steven de Salas* has a nice git repository that contains scripts to install Node.js on older RPi's https://github.com/sdesalas/node-pi-zero.

Both tellstick and ruuvitag node libraries require node-gyp so make sure you have it installed: `npm install -g node-gyp`.
