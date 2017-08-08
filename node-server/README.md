# Kotio server

Server runs on Node.js. I have used v6.10.3 on my development computer and v6.9.1 on my original Raspberry Pi B.

## Tellstick

Tellstick requires the tellstick dev library.

See documentation and installation instructions on [telldus wiki](https://developer.telldus.com/)

### Debian based systems after apt sources configuration

  `sudo apt-get install libtelldus-core-dev`

### Configuring tellstick sensors

For some reason tellstick sensor device returns a bunch of faulty sensor readings (atleast mine does) and therefore the known valid sensors must be configured within file `tellstick/config.js`. See [My blog post](http://blog.polarcoder.net/2016/02/diy-home-automation-v2.html) for additional info.

Basically the configuration contains the id's of the known valid sensors and names of your choosing for those sensors.

## Bluetooth

Accessing bluetooth advertising **requires** sudo/root privileges or a [noble workaround](https://github.com/sandeepmistry/noble#running-on-linux)

Bluetooth requires some utilities https://github.com/sandeepmistry/noble#linux. You can omit `bluez` if you are using Raspberry Pi and you need to install bluez manually (next section).

`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`

### Raspberry Pi and Bluetooth

*I'm not quite sure if this is neccessary on latest raspbian but if the above section's instructions don't work try this one.*

Raspberry Pi and bluetooth low energy is a bit harder operation, see http://www.elinux.org/RPi_Bluetooth_LE if you are running RPi with wheezy or https://learn.adafruit.com/install-bluez-on-the-raspberry-pi/installation if you are running RPi with jessie.

## Node.js on original Raspberry Pi or Raspberry Pi Zero

*Steven de Salas* has a nice git repository that contains scripts to install Node.js on older RPi's https://github.com/sdesalas/node-pi-zero.

Both tellstick and ruuvitag node libraries require node-gyp so make sure you have it installed: `npm install -g node-gyp`.

## Install dependencies

  ```
  cd node-server
  npm install
  ```

## Start the server

  Sudo rights are required unless you used the noble workaround (I didn't)

  `sudo node index.js`

  or

  `sudo ./node_modules/nodemon/bin/nodemon.js index.js`

## Test server by fetching ruuvitag data

Go to URL http://localhost:3101/ruuvitag

## Identifying ruuvitags

To identify and name your ruuvitags I have added a utility that can scan beacons. I suggest that you idenitify your beacons one at a time.

* Start with going to server directory `cd node-server`.

1) start tag #1 and run `sudo node utils/ruuvitag-identifier.js`
2) watch your console and take note of the tag's id
3) add the _id_ and a _name_ that you want to give to the ruuvitag to file's `ruuvitag/config.js` variable `tags`
4) repeat steps 1-3 for all your ruuvitags

## REST API

Kotio server REST API works over http with JSON messages

### Fetching ruuvitag data

URL: `http://localhost:3101/ruuvitag`

Response format:

```javascript
[
  {
    "name": "Defined ruuvitage name or ruuvitag's id",
    "data": {
      "temperature": 27,
      "pressure": 1009,
      "humidity": 43
    }
  }
]
```

* temperature is in celsius without decimals
* pressure is hPa
* humidity is relative humidity percentage

Response is a array containing all found ruuvitags.

### Fetching tellstick sensor data

URL: `http://localhost:3101/tellstick/sensors`

Response format:

```javascript
[
  {
    "id": 124,
    "name": "Defined tellstick sensor name",
    "temperature": "26.8",
    "humidity": "42"
  }
]
```

* id is the identifier of the given sensor
* name is the configured name of the sensor
* temperature is in celsius with decimals but returned as string
* humidity is relative humidity percentage returned as string

Response is a array containing all configured sensors.

### Fetching tellstick outlet switches and switch groups

URL: `http://localhost:3101/tellstick/switches`

Response format:

```javascript
{
  "devices": [
    {
      "name": "Defined tellstick switch name",
      "id": 123,
      "switchedOn": true
    },
    {
      "name": "Other defined tellstick switch name",
      "id": 128,
      "switchedOn": false
    },
  ],
  "groups": [
    {
      "name": "Defined tellstick switch group name",
      "id": 140,
      "switchedOn": false
    },
  ]
}
```

Request response contains all individual outlet switches and switch groups separated. The format for both is the same.
* name is the defined name of the outlet switch per tellstick configuration
* id is the unique id of the outlet switch or switch group
* switchedOn indicates whether the switch outlet or group is turned on or not

### Turning tellstick outlet switch or switch group on

URL: `http://localhost:3101/tellstick/on`

Method: POST

Request body:

```javascript
[123,128]
```
Response format:

```javascript
{
  "devices": [
    {
      "name": "Defined tellstick switch name",
      "id": 123,
      "switchedOn": true
    },
    {
      "name": "Other defined tellstick switch name",
      "id": 128,
      "switchedOn": true
    },
  ],
  "groups": [
    {
      "name": "Defined tellstick switch group name",
      "id": 140,
      "switchedOn": false
    },
  ]
}
```

The request takes array of outlet switch id's or group id's as it's body and returns the same response as does the listing of switches.

The off request is similar but with different URL.

### Turning tellstick outlet switch or switch group off

URL: `http://localhost:3101/tellstick/off`

Method: POST

Request body:

```javascript
[123]
```
Response format:

```javascript
{
  "devices": [
    {
      "name": "Defined tellstick switch name",
      "id": 123,
      "switchedOn": false
    },
    {
      "name": "Other defined tellstick switch name",
      "id": 128,
      "switchedOn": true
    },
  ],
  "groups": [
    {
      "name": "Defined tellstick switch group name",
      "id": 140,
      "switchedOn": false
    },
  ]
}
```

The request takes array of outlet switch id's or group id's as it's body and returns the same response as does the listing of switches.

The on request is similar but with different URL.
