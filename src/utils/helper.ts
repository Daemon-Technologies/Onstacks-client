export const randomColorGenerator = () => {
  const colorPalette: string[] = [
    "#FFA043",
    "#5546ff",
    "#00A5FF",
    "#20C9AC",
    "#FF4560",
    "#FA699D",
  ];
  for (let index = 0; index < 50; index++) {
    colorPalette.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colorPalette;
};

var pow = Math.pow,
  floor = Math.floor,
  abs = Math.abs,
  log = Math.log;
var abbrev = "KMB"; // could be an array of strings: [' m', ' Mo', ' Md']

export const round = (n: number, precision: number) => {
  var prec = Math.pow(10, precision);
  return Math.round(n * prec) / prec;
};

export const format = (n: number) => {
  var base = floor(log(abs(n)) / log(1000));
  var suffix = abbrev[Math.min(2, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? round(n / pow(1000, base), 2) + suffix : "" + n;
};
