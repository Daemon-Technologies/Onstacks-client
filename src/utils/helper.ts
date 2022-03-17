export const randomColorGenerator = () => {
  const colorPalette: string[] = [
    "#FFA043",
    "#5546ff",
    "#00A5FF",
    "#FF4560",
    "#1fca32",
    "#FA6432",
    "#20C9AC",
    "#607d8b",
    "#FA699D",
    "#5A6432",
    "#f3ff00",
    "#FA2560",
    "#F0C9AC",
    "#e91e63",
    "#757927",
    "#5e52ab",
    "#F70892",
  ];
  // for (let index = 0; index < 50; index++) {
  //   colorPalette.push(`#${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`);
  // }
  return colorPalette;
};

export const randomColorGeneratorOpacity = () => {
  const colorPalette: string[] = [
    "rgba(255, 160, 67, 0.2)",
    "rgba(85, 70, 255, 0.2)",
    "rgba(0, 165, 255, 0.2)",
    "rgba(255, 69, 96, 0.2)",
    "rgba(31, 202, 50, 0.2)",
    "rgba(250, 100, 50, 0.2)",
    "rgba(32, 201, 172, 0.2)",
    "rgba(96, 125, 139, 0.2)",
    "rgba(250, 105, 157, 0.2)",
    "#5A6432",
    "#f3ff00",
    "#FA2560",
    "#F0C9AC",
    "#e91e63",
    "#757927",
    "#5e52ab",
    "#F70892",
  ];
  // for (let index = 0; index < 50; index++) {
  //   colorPalette.push(`#${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`);
  // }
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

export const getBlockHash = async (blockNumber: any) => {
  try {
    const block = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/extended/v1/block/by_height/${blockNumber}`,
      {
        method: "GET",
      }
    ).then((block) => block.json());
    window.open(
      `https://explorer.stacks.co/block/${block.hash}?chain=mainnet`,
      "_blank"
    );
  } catch (error) {}
};

export const numFormatter = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};
