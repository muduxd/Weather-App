const request = require("request-promise");
require("dotenv").config();

const geocode = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEOCODE_KEY}&limit=1`;

  try {
    const data = await request({ url, json: true });

    const latitude = data.features[0].center[1];
    const longitude = data.features[0].center[0];
    const location = data.features[0].place_name;

    return { latitude, longitude, location };
  } catch (error) {
    return { error: "Error" };
  }
};

module.exports = geocode;
