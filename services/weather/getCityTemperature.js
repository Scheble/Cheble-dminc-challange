const axios = require("axios");
const { appiId, weatherAPI } = require("../../config.json");

const getCityTemperature = async (lat, lon) => {
    if (typeof lat === "number" && typeof lon === "number") {
        const weatherResponse = await axios.get(
            `${weatherAPI}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&units=metric&appid=${appiId}`
        );
        return weatherResponse.data?.current?.temp || null;
    }
    return null;
};

module.exports = getCityTemperature;
