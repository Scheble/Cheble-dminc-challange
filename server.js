const { build } = require("./app");

// Run the server!
const start = async () => {
    const server = build({ logger: true });
    try {
        await server.listen(3000);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
