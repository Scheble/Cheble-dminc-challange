const { getCityTempOptions, getCityTemp } = require("./getCityTemp");

const weatherRoutes = (fastify, _, done) => {
    fastify.get("/", getCityTempOptions, getCityTemp);
    done();
};

module.exports = weatherRoutes;
