const mockResponse = jest.fn();
const getCityLatAndLon = require("../../../services/weather/getCityLatAndLon");

jest.mock("axios", () => ({
    ...jest.requireActual("axios"),
    get: mockResponse,
}));

describe("Test getCityLatAndLon", () => {
    test("Should return lat = 10 and lon = 20", async () => {
        mockResponse.mockReturnValue(
            Promise.resolve({
                data: [{ lat: 10, lon: 20 }],
            })
        );
        const coordinates = await getCityLatAndLon("city name");
        expect(coordinates).not.toBeNull();
        expect(coordinates.lat).toEqual(10);
        expect(coordinates.lon).toEqual(20);
    });

    test.each([[], { someProm: true }])(
        "Should return null if response has no data",
        async (apiResponseData) => {
            mockResponse.mockReturnValue(
                Promise.resolve({
                    data: apiResponseData,
                })
            );
            const coordinates = await getCityLatAndLon("city name");
            expect(coordinates).toBeNull();
        }
    );

    test.each(["", null, undefined])(
        "Should return null if no city name is provided",
        async (cityName) => {
            const coordinates = await getCityLatAndLon(cityName);
            expect(coordinates).toBeNull();
        }
    );
});
