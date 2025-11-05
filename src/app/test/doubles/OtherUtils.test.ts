import {
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../doubles/OtherUtils";

describe("OtherUtils test suite", () => {
  let cbArgs = [];
  let timesCalled = 0;

  describe.skip("Tracking callbacks", () => {
    const mockCallback = jest.fn();
    afterEach(() => {
      mockCallback.mockClear();
    });
    it("ToUpperCase - calls callback for invalid argument", () => {
      const actual = toUpperCaseWithCb("", mockCallback);
      expect(actual).toBeUndefined();
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith("invalid argument");
    });
    it("ToUpperCase - calls callback for valid argument", () => {
      const actual = toUpperCaseWithCb("abc", mockCallback);
      expect(actual).toBe("ABC");
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith("called function with abc");
    });
  });

  // fakes double test
  xit("ToUpperCase -  for invalid argument", () => {
    const mockCallback = jest.fn();
    const actual = toUpperCaseWithCb("", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith("invalid argument");
    expect(actual).toBeUndefined();
  });

  xit("ToUpperCase - calls callback for valid argument", () => {
    const mockCallback = jest.fn();
    const actual = toUpperCaseWithCb("abc", mockCallback);
    console.log(actual);
    expect(actual).toBe("ABC");
  });

  //   Stub double test
  xit("Calculate complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someinfo",
        field2: "someinfo2",
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
