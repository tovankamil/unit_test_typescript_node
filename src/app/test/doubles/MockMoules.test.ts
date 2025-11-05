jest.mock("../../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../../app/doubles/OtherUtils"),
  calculateComplexity: () => {
    return 12;
  },
}));

jest.mock("uuid", () => {
  return {
    v4: () => "123",
  };
});
import * as OtherUtils from "../../../app/doubles/OtherUtils";

describe("Module tests", () => {
  test("calculate complexity", () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(12);
  });

  test("Keep other functions", () => {
    const result = OtherUtils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  test("String with id", () => {
    const result = OtherUtils.toLowerCaseWithId("ABC");
    console.log(result);
  });
});
