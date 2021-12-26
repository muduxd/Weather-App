const request = require("request");
require("dotenv").config();

const forecast = async ({ latitude, longitude } = {}) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_KEY}&query=${latitude},${longitude}`;

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) reject("Unable to connect to weather service");
      else if (body.error) reject("Unable to find location");
      else {
        const data = body.current;
        resolve(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain.`);
      }
    });
  });
};

module.exports = forecast;
