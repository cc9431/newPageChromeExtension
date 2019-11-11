require('dotenv').config();

console.log(process.env);

module.exports = {
  openWeatherUrl: process.env.OPEN_WEATHER_URL
};
