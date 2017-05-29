# Kotio

Home automation application for
* controlling switches via [tellstick duo](http://old.telldus.com/products/tellstick_duo)
* reading sensors via [tellstick duo](http://old.telldus.com/products/tellstick_duo)
* reading sensors via [ruuvitag](https://ruuvitag.com/)

## Status

Currently the server is able to scan for ruuvitag beacons and return their sensor data as JSON.

Some initial testing has been done with tellstick to scan for switches and turn on and off switches, and to read tellstcik compatible sensors.

## Development

### Server

Server runs on node.js. I have used v6.10.3 on my development computer and v6.9.1 on my original Raspberry Pi B.

#### Tellstick

Tellstick requires the tellstick dev library

  `sudo apt-get install libtelldus-core-dev`

#### Bluetooth

Accessing bluetooth advertising **requires** sudo/root privileges or a [noble workaround](https://github.com/sandeepmistry/noble#running-on-linux)

Bluetooth requires some utilities https://github.com/sandeepmistry/noble#linux. You can omit `bluez` if you are using Raspberry Pi and you need to install bluez manually (next section).

`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`

##### Raspberry Pi and Bluetooth

Raspberry Pi and bluetooth low energy is a bit harder operation, see http://www.elinux.org/RPi_Bluetooth_LE if you are running RPi with wheezy or https://learn.adafruit.com/install-bluez-on-the-raspberry-pi/installation if you are running RPi with jessie.

#### Node.js on original Raspberry Pi or Raspberry Pi Zero

Steven de Salas has a nice git repository that contains scripts to install node.js on older RPi's https://github.com/sdesalas/node-pi-zero.

Both tellstick and ruuvitag node libraries require node-gyp so make sure you have it installed: `npm install -g node-gyp`.

#### Install dependencies

  ```
  cd node-server
  npm install
  ```

#### Start the server

  `sudo node index.js`

  or

  `sudo ./node_modules/nodemon/bin/nodemon.js index.js`

#### Fetch ruuvitag data

Go to URL http://localhost:3101/

## Identifying ruuvitags

To identify and name your ruuvitags I have added a utility that can scan beacons. I suggest that you idenitify your beacons one at a time.

* Start with going to server directory `cd node-server`.

1) start tag #1 and run `sudo node utils/ruuvitag-identifier.js`
2) watch your console and take note of the tag's id
3) add the _id_ and a _name_ that you want to give to the ruuvitag to file's `ruuvitag/config.js` variable `tags`
4) repeat steps 1-3 for all your ruuvitags
