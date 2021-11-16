import Transaction from "./explorer-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const TransactionType = {
  SMART_CONTRACT: "smart_contract" as Transaction["tx_type"],
  CONTRACT_CALL: "contract_call" as Transaction["tx_type"],
  TOKEN_TRANSFER: "token_transfer" as Transaction["tx_type"],
  COINBASE: "coinbase" as Transaction["tx_type"],
  POISON_MICROBLOCK: "poison_microblock" as Transaction["tx_type"],
} as const;

export const txTypeNamesMap = {
  [TransactionType.SMART_CONTRACT]: "Contract deploy",
  [TransactionType.CONTRACT_CALL]: "Function call",
  [TransactionType.TOKEN_TRANSFER]: "Token transfer",
  [TransactionType.COINBASE]: "Coinbase",
  [TransactionType.POISON_MICROBLOCK]: "Poison-microblock",
} as const;

export function getTxTypeName(type: Transaction["tx_type"]) {
  return txTypeNamesMap[type];
}

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const truncateMiddle = (input: string, offset = 5): string => {
  if (!input) return "";
  // hashes
  if (input.startsWith("0x")) {
    return shortenHex(input, offset);
  }
  // for contracts
  if (input.includes(".")) {
    const parts = input.split(".");
    const start = parts[0]?.substr(0, offset);
    const end = parts[0]?.substr(parts[0].length - offset, parts[0].length);
    return `${start}…${end}.${parts[1]}`;
  } else {
    // everything else
    const start = input?.substr(0, offset);
    const end = input?.substr(input.length - offset, input.length);
    return `${start}…${end}`;
  }
};

export const microToStacks = (
  amountInMicroStacks: string | number,
  localString = true
): number | string => {
  const value = Number(Number(amountInMicroStacks) / Math.pow(10, 6));
  if (localString) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  }
  return value;
};

/**
 * stacksToMicro
 *
 * @param {String || Number} amountInStacks - the amount of stacks to convert
 */
export const stacksToMicro = (amountInStacks: string | number) =>
  amountInStacks ? Math.floor(Number(amountInStacks) * 1000000) : 0;

export const getContractName = (fullyRealizedName: string): string =>
  fullyRealizedName?.split(".")[1];

export const getFunctionName = (tx: any) => {
  return tx.contract_call.function_name;
};
export const getFungibleAssetName = (fullyRealizedName: string): string =>
  getContractName(fullyRealizedName)?.split("::")[1];

export const getAssetNameParts = (fullyRealizedName: string) => {
  const address = fullyRealizedName.split(".")[0];
  const contract = getContractName(fullyRealizedName).split("::")[0];
  const asset = getFungibleAssetName(fullyRealizedName);

  return {
    address,
    contract,
    asset,
  };
};

export const getTxTitle = (transaction: Transaction) => {
  switch (transaction.tx_type) {
    case "smart_contract":
      return getContractName(transaction?.smart_contract?.contract_id);
    case "contract_call":
      return `${getFunctionName(transaction)} ➔ ${getContractName(
        transaction.contract_call.contract_id
      )}`;
    case "token_transfer":
      return `${microToStacks(transaction.token_transfer.amount)} STX`;
    case "coinbase":
      return `Block #${(transaction as Transaction).block_height} coinbase`;
    default:
      return truncateMiddle(transaction.tx_id, 10);
  }
};

export const toRelativeTime = (ts: number): string => dayjs().to(ts);

export const getRelativeTimestamp = (tx: any) => {
  const date =
    typeof (tx as any).burn_block_time !== "undefined" &&
    (tx as any).burn_block_time !== -1
      ? toRelativeTime((tx as any).burn_block_time * 1000)
      : (tx as any).burn_block_time === -1
      ? toRelativeTime((tx as any).parent_burn_block_time * 1000)
      : (tx as any).receipt_time
      ? toRelativeTime((tx as any).receipt_time * 1000)
      : "Pending...";

  return date;
};
