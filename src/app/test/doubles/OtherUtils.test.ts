import {
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../doubles/OtherUtils";

describe("OtherUtils test suite", () => {
  // fakes double test
  it("ToUpperCase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("", () => {});

    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    console.log(actual);
    expect(actual).toBe("ABC");
  });

  //   Stub double test
  it("Calculate complexity", () => {
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
