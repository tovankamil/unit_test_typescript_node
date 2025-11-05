const v4 = require("uuid").v4;

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}
export function toLowerCaseWithId(arg: string) {
  return arg.toUpperCase() + v4();
}
type LoggerServiceCallBack = (arg: string) => void;
// stub double test
export function calculateComplexity(stringinfo: stringInfo) {
  return Object.keys(stringinfo.extraInfo).length * stringinfo.length;
}
// fakes double test
export function toUpperCaseWithCb(
  args: string,
  callback: LoggerServiceCallBack
) {
  if (!args) {
    callback("invalid argument");
    return;
  }
  callback(`called function with ${args}`);
  return args.toUpperCase();
}
