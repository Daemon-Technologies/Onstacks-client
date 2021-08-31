export const randomColorGenerator = () => {
  const colorPalette: string[] = [
    "#FFA043",
    "#5546ff",
    "#00A5FF",
    "#FF4560",
    "#20C9AC",
    "#FA699D",
    "#5A6432",
    "#FA6432",
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
