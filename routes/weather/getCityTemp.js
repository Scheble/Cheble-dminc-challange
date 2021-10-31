const getLatAndLonFromCity = require("../../services/weather/getCityLatAndLon");
const getCityTemperature = require("../../services/weather/getCityTemperature");

const getCityTempOptions = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    temp: { type: "number" },
                    moreThan: { type: "boolean" },
                    lessThan: { type: "boolean" },
                },
            },
            404: {
                type: "string",
            },
        },
    },
};

const getCityTemp = async (request, reply) => {
    try {
        let lat = parseFloat(request.query.lat) || null;
        let lon = parseFloat(request.query.lon) || null;
        if (request.query.city) {
            const cityCoordinates = await getLatAndLonFromCity(
                request.query.city
            );
            if (cityCoordinates) {
                lat = cityCoordinates.lat;
                lon = cityCoordinates.lon;
            }
        }

        if (typeof lat === "number" && typeof lon === "number") {
            const temp = await getCityTemperature(lat, lon);
            if (temp != null) {
                return {
                    temp,
                    moreThan: temp > request.query.moreThan,
                    lessThan: temp < request.query.lessThan,
                };
            }
        }

        reply.status(404);
        return "City not found.";
    } catch (e) {
        // Should manage the error.
        reply.status(500);
        return e.message;
    }
};

module.exports = { getCityTempOptions, getCityTemp };
