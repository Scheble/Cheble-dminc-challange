const getLatAndLonFromCity = require("../../../services/weather/getCityLatAndLon");
const getCityTemperature = require("../../../services/weather/getCityTemperature");
const { getCityTemp } = require("../../../routes/weather/getCityTemp");

jest.mock("../../../services/weather/getCityLatAndLon", () => jest.fn());
jest.mock("../../../services/weather/getCityTemperature", () => jest.fn());

describe("Test getCityTemp", () => {
    test("Should return the temp object without calling getLatAndLonFromCity", async () => {
        getLatAndLonFromCity.mockImplementation(() => {
            throw new Error("Should not be called.");
        });
        getCityTemperature.mockImplementation(() => 5);

        const response = await getCityTemp({
            query: {
                lat: "1",
                lon: "1",
                city: "",
                moreThan: 1,
                lessThan: 4,
            },
        });

        expect(response).not.toBeNull();
        expect(response.temp).toEqual(5);
        expect(response.moreThan).toBeTruthy();
        expect(response.lessThan).toBeFalsy();
        expect(getCityTemperature).toHaveBeenCalledTimes(1);
    });

    test("Should return the temp object calling getLatAndLonFromCity", async () => {
        getLatAndLonFromCity.mockImplementation(() => ({
            lat: 10,
            lon: 10,
        }));
        getCityTemperature.mockImplementation(() => 5);

        const response = await getCityTemp({
            query: {
                lat: 1,
                lon: 1,
                city: "test city",
                moreThan: 1,
                lessThan: 4,
            },
        });

        expect(response).not.toBeNull();
        expect(response.temp).toEqual(5);
        expect(response.moreThan).toBeTruthy();
        expect(response.lessThan).toBeFalsy();
        expect(getLatAndLonFromCity).toHaveBeenCalledTimes(1);
    });

    test.each([
        { lat: "test", lon: "test", city: "" },
        { lat: "test", lon: "test", city: null },
        { lat: "test", lon: "test", city: undefined },
        { lat: 1, lon: "test", city: "" },
        { lat: 1, lon: "test", city: null },
        { lat: 1, lon: "test", city: undefined },
        { lat: "test", lon: "1", city: "" },
        { lat: "test", lon: "1", city: null },
        { lat: "test", lon: "1", city: undefined },
        { lat: null, lon: "1", city: "" },
        { lat: undefined, lon: "1", city: "" },
        { lat: "1", lon: null, city: "" },
        { lat: "1", lon: undefined, city: "" },
    ])("Should return message City not found.", async (query) => {
        getLatAndLonFromCity.mockImplementation(() => {
            throw new Error("Should not be called.");
        });
        getCityTemperature.mockImplementation(() => {
            throw new Error("Should not be called.");
        });

        const mockStatus = jest.fn();

        const response = await getCityTemp({ query }, { status: mockStatus });

        expect(response).not.toBeNull();
        expect(response).toEqual("City not found.");
        expect(mockStatus).toHaveBeenCalledWith(404);
    });

    test("Should return response with status code 500", async () => {
        const errorMsg = "Cached error";
        getLatAndLonFromCity.mockImplementation(() => {
            throw new Error(errorMsg);
        });

        const mockStatus = jest.fn();

        const response = await getCityTemp(
            {
                query: {
                    city: "Test",
                },
            },
            { status: mockStatus }
        );

        expect(response).not.toBeNull();
        expect(response).toEqual(errorMsg);
        expect(mockStatus).toHaveBeenCalledWith(500);
    });
});
