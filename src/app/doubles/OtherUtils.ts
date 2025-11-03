export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

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
