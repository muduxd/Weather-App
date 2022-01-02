const request = require("request-promise");
require("dotenv").config();

const forecast = async ({ latitude, longitude } = {}) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_KEY}&query=${latitude},${longitude}`;

  try {
    const { current: data } = await request({ url, json: true });

    return `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain.`;
  } catch (error) {
    return { error: "Error" };
  }
};

module.exports = forecast;
