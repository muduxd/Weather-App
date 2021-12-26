const request = require("request");
require("dotenv").config();

const geocode = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEOCODE_KEY}&limit=1`;

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) reject("Unable to connect to location service");
      else if (body.features.length === 0) reject("Unable to find location");
      else {
        const data = body.features[0];

        const latitude = data.center[1];
        const longitude = data.center[0];
        const location = data.place_name;

        resolve({ latitude, longitude, location });
      }
    });
  });
};

module.exports = geocode;
