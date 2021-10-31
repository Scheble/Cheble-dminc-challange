const mockResponse = jest.fn();
const getCityTemperature = require("../../../services/weather/getCityTemperature");

jest.mock("axios", () => ({
    ...jest.requireActual("axios"),
    get: mockResponse,
}));

describe("Test getCityTemperature", () => {
    test.each([
        [1, 1],
        [0, 1],
        [1, 0],
        [0, 0],
        [-1, 0],
        [0, -1],
        [-1, -1],
    ])("Should return the temperature", async (lat, lon) => {
        mockResponse.mockReturnValue(
            Promise.resolve({
                data: {
                    current: {
                        temp: 15,
                    },
                },
            })
        );
        const temp = await getCityTemperature(lat, lon);
        expect(temp).toEqual(15);
    });

    test("Should return null if the response object is not as expected", async () => {
        mockResponse.mockReturnValue(
            Promise.resolve({
                some: {
                    prop: {
                        not: {
                            expected: true,
                        },
                    },
                },
            })
        );
        const temp = await getCityTemperature(1, 1);
        expect(temp).toBeNull();
    });

    test.each([
        [1, null],
        [null, 1],
        [null, null],
        [1, undefined],
        [undefined, 1],
        [undefined, undefined],
        ["1", ""],
        ["", "1"],
        ["", ""],
    ])("Should return null if lat or lon are not numbers", async (lat, lon) => {
        mockResponse.mockReturnValue(() => {
            throw new Error("Should not been call.");
        });
        const temp = await getCityTemperature(lat, lon);
        expect(temp).toBeNull();
    });
});
