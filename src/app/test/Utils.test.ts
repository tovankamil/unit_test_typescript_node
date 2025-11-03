import { getStringInfo, StringUtils, ToUpperCase } from "../Utils";

describe("Utils test suite", () => {
  describe("StringUtils tests", () => {
    let sut: StringUtils;
    beforeEach(() => {
      sut = new StringUtils();
      console.log("setup");
    });

    afterEach(() => {
      console.log("done");
    });

    it("should return corect uppercase", () => {
      const actual = sut.toUpperCase("abc");
      expect(actual).toBe("ABC");
    });

    it("should be invalid argument", () => {
      function expectedError() {
        const actual = sut.toUpperCase("");
      }
      expect(expectedError).toThrow();
      expect(expectedError).toThrow("Invalid argument");
    });

    it("should be invalid argument with arrow function", () => {
      expect(() => {
        const actual = sut.toUpperCase("");
      }).toThrow("Invalid argument");
    });
    it("Should throw error on invalid  argument try catch block", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo  should  throw error for invalid arg");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument");
        done();
      }
    });
  });
  it("Should return uppercase of valid string", () => {
    // arrange
    const sut = ToUpperCase;
    const expected = "ABC";

    //act
    const result = ToUpperCase("abc");

    // assert
    expect(result).toBe("ABC");
  });

  describe("touppercase only examples", () => {
    it.each([
      {
        input: "abc",
        expected: "ABC",
      },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = ToUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe("getStringinfo for arg My-string should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters.length).toBe(9);
    });
    test("return right lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });
    test("return right upper case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });
    test("return right character", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toContain<string>("M");
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i"])
      );
    });

    test("return right  defined extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toBeDefined();
    });
  });
});
