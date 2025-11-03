import {
  Password_Checker,
  PasswordErrors,
} from "../../pass_checker/Password_Checker";

describe("Password checker test", () => {
  let sut: Password_Checker;
  beforeEach(() => {
    sut = new Password_Checker();
  });
  it("Password with less than 8 char is invalid", () => {
    const actual = sut.checkPassword("12323");

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });
  it("Password with more than 8 char is valid", () => {
    const actual = sut.checkPassword("122345678aB");

    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });
  it("Password with no upper case is invalid", () => {
    const actual = sut.checkPassword("121dasdfasdfa");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPERCASE);
  });
  it("Password with no lower case is invalid", () => {
    const actual = sut.checkPassword("123ASADFAA");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWERCASE);
  });
  it("Password with  lower and upper case is valid", () => {
    const actual = sut.checkPassword("121312AddfaA");
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWERCASE);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
  });
});
