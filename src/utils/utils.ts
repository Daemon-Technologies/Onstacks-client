import Transaction from "./explorer-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import pluralize from "pluralize";

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

export const addressArea = (tx: Transaction) => {
  if (tx.tx_type === "token_transfer") {
    return `${truncateMiddle(tx.sender_address)} to
        ${truncateMiddle(tx.token_transfer.recipient_address)}`;
  }
  if (tx.tx_type === "contract_call") {
    return `By ${truncateMiddle(tx.sender_address)}`;
  }
  if (tx.tx_type === "smart_contract") {
    return `By ${truncateMiddle(tx.sender_address)}`;
  }
  if (tx.tx_type === "coinbase") {
    return `Mined by ${truncateMiddle(tx.sender_address)}`;
  }
  return null;
};

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
export const getTicker = (name: string) => {
  if (name.includes("-")) {
    const parts = name.split("-");
    if (parts.length >= 3) {
      return `${parts[0][0]}${parts[1][0]}${parts[2][0]}`;
    } else {
      return `${parts[0][0]}${parts[1][0]}${parts[1][1]}`;
    }
  } else {
    if (name.length >= 3) {
      return `${name[0]}${name[1]}${name[2]}`;
    }
    return name;
  }
};

export const constructPostConditionAssetId = (asset: any) => {
  return `${asset.contract_address}.${asset.contract_name}::${asset.asset_name}`;
};

export const getPrettyCode = (code: any, plural: boolean) => {
  const singular = "transfer";
  const modifier = pluralize(singular, plural ? 2 : 1);
  switch (code) {
    case "not_sent":
      return `prevent ${singular}`;
    case "sent":
      return modifier;
    case "sent_equal_to":
      return `${modifier} exactly`;
    case "sent_greater_than":
      return `${modifier} more than`;
    case "sent_greater_than_or_equal_to":
      return `${modifier} at least`;
    case "sent_less_than":
      return `${modifier} less than`;
    case "sent_less_than_or_equal_to":
      return `${modifier} no more than`;
  }
};

export const getConditionTicker = (condition: any) => {
  switch (condition.type) {
    case "stx":
      return "STX";
    case "fungible":
      return getTicker(condition.asset.asset_name).toUpperCase();
    default:
      return "";
  }
};

function microStxToStx(microStx: any) {
  return Number(Number(microStx) / Math.pow(10, 6));
}

export const getAmount = (condition: any) => {
  if (condition.type === "stx") {
    return microStxToStx(condition.amount);
  }

  if (condition.type === "fungible") {
    return parseFloat(condition.amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  }
  return `1 ${condition.asset_value.repr}`;
};

export const getAddressValue = (condition: any) => {
  switch (condition.principal.type_id) {
    case "principal_standard":
      return condition.principal.address;
    case "principal_origin":
      return "self";
    case "principal_contract":
      return `${condition.principal.address}.${condition.principal.contract_name}`;
  }
};

export const getTxTitle = (transaction: Transaction) => {
  switch (transaction.tx_type) {
    case "smart_contract":
      return getContractName(transaction?.smart_contract?.contract_id);
    case "contract_call":
      return `${getFunctionName(transaction)} ← ${getContractName(
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
// handle if the print is a hex, convert it to string if so
function handleContractLogHex(repr: string) {
  if (repr?.startsWith("0x")) {
    try {
      return Buffer.from(repr.replace("0x", ""), "hex").toString("utf8");
    } catch (e) {
      return repr;
    }
  }
  return repr;
}

export const addSepBetweenStrings = (
  strings: (string | undefined)[],
  sep = "∙"
): string => {
  let str = "";
  strings
    .filter((_s) => _s)
    .forEach((string, index, array) => {
      if (index < array.length - 1) {
        str += (string as string) + ` ${sep} `;
      } else {
        str += string;
      }
    });
  return str;
};

export const getAssetAmounts = (event: any) => {
  switch (event.event_type) {
    case "fungible_token_asset":
      return parseFloat((event as any).asset.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      });
    case "non_fungible_token_asset":
      return parseInt(event.asset.value.repr.replace("u", "")).toLocaleString();
    case "stx_asset":
      return event.asset.amount
        ? `${microToStacks(event.asset.amount)} STX`
        : undefined;
  }
};

export const capitalize = (s: string) => {
  return s?.charAt(0).toUpperCase() + s?.slice(1);
};

export const getAssetEventType = (event: any) => {
  switch (event.event_type) {
    case "smart_contract_log":
      return addSepBetweenStrings([
        `Contract log`,
        capitalize(event.contract_log.topic),
      ]);
    case "stx_lock":
      return "STX lock";
    default:
      return "asset" in event && event.asset && event.asset.asset_event_type
        ? capitalize(event.asset.asset_event_type)
        : undefined;
  }
};

export const getName = (event: any) => {
  const assetId =
    event.event_type === "fungible_token_asset" ||
    event.event_type === "non_fungible_token_asset"
      ? event.asset.asset_id
      : undefined;
  switch (event.event_type) {
    case "stx_lock":
      return `${microToStacks(event.stx_lock_event.locked_amount)} STX`;
    case "smart_contract_log":
      return handleContractLogHex(event.contract_log.value.repr);
    case "stx_asset":
      return event.asset?.value
        ? `${microToStacks(event.asset?.value)} STX`
        : "STX transfer";
    default:
      return assetId ? getAssetNameParts(assetId).asset : undefined;
  }
};
