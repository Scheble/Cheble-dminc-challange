const fastify = require("fastify");
const weatherRoutes = require("./routes/weather");

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(weatherRoutes, { prefix: "/weather" });
    return app;
};

module.exports = { build };
