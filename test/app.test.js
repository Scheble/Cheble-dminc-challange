const { build } = require("../app");

jest.mock("../routes/weather/getCityTemp", () => ({
    ...jest.requireActual("../routes/weather/getCityTemp"),
    getCityTemp: () => Promise.resolve("City weather called!"),
}));

describe("Test app.js", () => {
    test("Should call get city weather endpoint", async () => {
        const app = build();
        const response = await app.inject({
            method: "GET",
            url: "/weather",
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual("City weather called!");
    });
});
