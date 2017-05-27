# Kotio

Home automation application for
* controlling devices via [tellstick duo](http://old.telldus.com/products/tellstick_duo)
* reading sensors via [tellstick duo](http://old.telldus.com/products/tellstick_duo)
* reading sensors via [ruuvitag](https://ruuvitag.com/)

## Status

Currently the server is able to scan for ruuvitag beacons and return their sensor data as JSON.

## Development

### Server

Accessing bluetooth advertising **requires** sudo/root privileges or a [noble workaround](https://github.com/sandeepmistry/noble#running-on-linux)

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
