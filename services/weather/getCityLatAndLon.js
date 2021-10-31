const axios = require("axios");
const { appiId, weatherAPI } = require("../../config.json");

const getCityLatAndLon = async (city) => {
    if (city) {
        const latLonResponse = await axios.get(
            `${weatherAPI}/geo/1.0/direct?q=${city}&limit=1&appid=${appiId}`
        );
        if (latLonResponse.data?.length) {
            return {
                lat: latLonResponse.data[0].lat,
                lon: latLonResponse.data[0].lon,
            };
        }
    }
    return null;
};

module.exports = getCityLatAndLon;
