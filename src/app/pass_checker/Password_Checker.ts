export enum PasswordErrors {
  SHORT = "Password is to short",
  NO_LOWERCASE = "Upper case letter is required",
  NO_UPPERCASE = "Lower case letter is required",
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class Password_Checker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_LOWERCASE);
    }
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_UPPERCASE);
    }
    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    };
  }
}
