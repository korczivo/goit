const safeDivide = require("./safeDivide.js");

describe("safeDivide", () => {
    // hooks
    beforeAll(() => {
        console.log("before all tests in suite");
    });

    afterAll(() => {
        console.log("after all test is suite");
    });

    beforeEach(() => {
        console.log("before each test");
    });

    afterEach(() => {
        console.log("after each test");
    });

    test("10/2 to be 5", () => {
        expect(safeDivide(10, 2)).toBe(5);
    });

    test("10/0 to be 0", () => {
        expect(safeDivide(10, 0)).toBe(0);
    });

    test("'a' / 2 to throw error", () => {
        expect(() => safeDivide("a", 10)).toThrow("NOT_A_NUMBER");
        // expect(safeDivide("a", 10)).toThrow("NOT_A_NUMBER"); // doesnt work
    });
});