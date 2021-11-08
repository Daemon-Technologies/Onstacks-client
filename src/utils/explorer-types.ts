interface BaseTransaction {
  tx_id: string;
  nonce: number;
  fee_rate: string;
  sender_address: string;
  sponsored: boolean;
  sponsor_address?: string;
  post_condition_mode: PostConditionMode;
  post_conditions: PostCondition[];
  anchor_mode: TransactionAnchorModeType;
}
type TransactionAnchorModeType = "on_chain_only" | "off_chain_only" | "any";
type TransactionStatus =
  | "success"
  | "abort_by_response"
  | "pending"
  | "abort_by_post_condition";

interface SmartContractTransactionMetadata {
  tx_type: "smart_contract";
  smart_contract: {
    contract_id: string;
    source_code: string;
  };
}
interface ContractCallTransactionMetadata {
  tx_type: "contract_call";
  contract_call: {
    contract_id: string;
    function_name: string;
    function_signature: string;
    function_args?: {
      hex: string;
      repr: string;
      name: string;
      type: string;
    }[];
  };
}

type TokenTransferTransaction = AbstractTransaction &
  TokenTransferTransactionMetadata;
type SmartContractTransaction = AbstractTransaction &
  SmartContractTransactionMetadata;
type ContractCallTransaction = AbstractTransaction &
  ContractCallTransactionMetadata;

type PoisonMicroblockTransaction = AbstractTransaction &
  PoisonMicroblockTransactionMetadata;
type CoinbaseTransaction = AbstractTransaction & CoinbaseTransactionMetadata;
type Transaction =
  | TokenTransferTransaction
  | SmartContractTransaction
  | ContractCallTransaction
  | PoisonMicroblockTransaction
  | CoinbaseTransaction;

interface TokenTransferTransactionMetadata {
  tx_type: "token_transfer";
  token_transfer: {
    recipient_address: string;
    /**
     * Transfer amount as Integer string (64-bit unsigned integer)
     */
    amount: string;
    /**
     * Hex encoded arbitrary message, up to 34 bytes length (should try decoding to an ASCII string)
     */
    memo: string;
  };
}

type AbstractTransaction = BaseTransaction & {
  /**
   * Hash of the blocked this transactions was associated with
   */
  block_hash: string;
  /**
   * Height of the block this transactions was associated with
   */
  block_height: number;
  /**
   * Unix timestamp (in seconds) indicating when this block was mined
   */
  burn_block_time: number;
  /**
   * An ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ) timestamp indicating when this block was mined.
   */
  burn_block_time_iso: string;
  /**
   * Unix timestamp (in seconds) indicating when this parent block was mined
   */
  parent_burn_block_time: number;
  /**
   * An ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ) timestamp indicating when this parent block was mined.
   */
  parent_burn_block_time_iso: string;
  /**
   * Set to `true` if block corresponds to the canonical chain tip
   */
  canonical: boolean;
  /**
   * Index of the transaction, indicating the order. Starts at `0` and increases with each transaction
   */
  tx_index: number;
  tx_status: TransactionStatus;
  /**
   * Result of the transaction. For contract calls, this will show the value returned by the call. For other transaction types, this will return a boolean indicating the success of the transaction.
   */
  tx_result: {
    /**
     * Hex string representing the value fo the transaction result
     */
    hex: string;
    /**
     * Readable string of the transaction result
     */
    repr: string;
  };
  /**
   * Number of transaction events
   */
  event_count: number;
  /**
   * Hash of the previous block.
   */
  parent_block_hash: string;
  /**
   * True if the transaction is included in a microblock that has not been confirmed by an anchor block.
   */
  is_unanchored: boolean;
  /**
   * The microblock hash that this transaction was streamed in. If the transaction was batched in an anchor block (not included within a microblock) then this value will be an empty string.
   */
  microblock_hash: string;
  /**
   * The microblock sequence number that this transaction was streamed in. If the transaction was batched in an anchor block (not included within a microblock) then this value will be 2147483647 (0x7fffffff, the max int32 value), this value preserves logical transaction ordering on (block_height, microblock_sequence, tx_index).
   */
  microblock_sequence: number;
  /**
   * Set to `true` if microblock is anchored in the canonical chain tip, `false` if the transaction was orphaned in a micro-fork.
   */
  microblock_canonical: boolean;
  /**
   * List of transaction events
   */
  events: TransactionEvent[];
};

type TransactionEvent =
  | TransactionEventSmartContractLog
  | TransactionEventStxLock
  | TransactionEventStxAsset
  | TransactionEventFungibleAsset
  | TransactionEventNonFungibleAsset;

interface PoisonMicroblockTransactionMetadata {
  tx_type: "poison_microblock";
  poison_microblock: {
    /**
     * Hex encoded microblock header
     */
    microblock_header_1: string;
    /**
     * Hex encoded microblock header
     */
    microblock_header_2: string;
  };
}
/**
 * Describes representation of a Type 3 Stacks 2.0 transaction: Poison Microblock
 */
interface CoinbaseTransactionMetadata {
  tx_type: "coinbase";
  coinbase_payload: {
    /**
     * Hex encoded 32-byte scratch space for block leader's use
     */
    data: string;
  };
}

type TransactionEventSmartContractLog = {
  event_index: number;
  [k: string]: unknown | undefined;
} & {
  event_type: "smart_contract_log";
  contract_log: {
    contract_id: string;
    topic: string;
    value: {
      hex: string;
      repr: string;
    };
  };
  [k: string]: unknown | undefined;
};
/**
 * Only present in `smart_contract` and `contract_call` tx types.
 */
type TransactionEventStxLock = {
  event_index: number;
  [k: string]: unknown | undefined;
} & {
  event_type: "stx_lock";
  stx_lock_event: {
    locked_amount: string;
    unlock_height: number;
    locked_address: string;
  };
  [k: string]: unknown | undefined;
};
/**
 * Only present in `smart_contract` and `contract_call` tx types.
 */
type TransactionEventStxAsset = {
  event_index: number;
  [k: string]: unknown | undefined;
} & {
  event_type: "stx_asset";
  asset: TransactionEventAsset;
  [k: string]: unknown | undefined;
};
interface TransactionEventAsset {
  asset_event_type?: TransactionEventAssetType;
  asset_id?: string;
  sender?: string;
  recipient?: string;
  amount?: string;
  value?: string;
}
type TransactionEventAssetType = "transfer" | "mint" | "burn";
type TransactionEventFungibleAsset = {
  event_index: number;
  [k: string]: unknown | undefined;
} & {
  event_type: "fungible_token_asset";
  asset: {
    asset_event_type: string;
    asset_id: string;
    sender: string;
    recipient: string;
    amount: string;
  };
  [k: string]: unknown | undefined;
};
type TransactionEventNonFungibleAsset = {
  event_index: number;
  [k: string]: unknown | undefined;
} & {
  event_type: "non_fungible_token_asset";
  asset: {
    asset_event_type: string;
    asset_id: string;
    sender: string;
    recipient: string;
    value: {
      hex: string;
      repr: string;
    };
  };
  [k: string]: unknown | undefined;
};

/**
 * GET request that returns account transactions
 */
interface AddressTransactionsListResponse {
  limit: number;
  offset: number;
  total: number;
  results: Transaction[];
}

type PostConditionMode = "allow" | "deny";
/**
 * Post-conditionscan limit the damage done to a user's assets
 */
type PostCondition =
  | PostConditionStx
  | PostConditionFungible
  | PostConditionNonFungible;
type PostConditionStx = {
  principal: PostConditionPrincipal;
  [k: string]: unknown | undefined;
} & {
  condition_code: PostConditionFungibleConditionCode;
  amount: string;
  type: "stx";
  [k: string]: unknown | undefined;
};
type PostConditionPrincipal =
  | {
      /**
       * String literal of type `PostConditionPrincipalType`
       */
      type_id: "principal_origin";
    }
  | {
      /**
       * String literal of type `PostConditionPrincipalType`
       */
      type_id: "principal_standard";
      address: string;
    }
  | {
      /**
       * String literal of type `PostConditionPrincipalType`
       */
      type_id: "principal_contract";
      address: string;
      contract_name: string;
    };
/**
 * A fungible condition code encodes a statement being made for either STX or a fungible token, with respect to the originating account.
 */
type PostConditionFungibleConditionCode =
  | "sent_equal_to"
  | "sent_greater_than"
  | "sent_greater_than_or_equal_to"
  | "sent_less_than"
  | "sent_less_than_or_equal_to";
type PostConditionFungible = {
  principal: PostConditionPrincipal;
  [k: string]: unknown | undefined;
} & {
  condition_code: PostConditionFungibleConditionCode;
  type: "fungible";
  amount: string;
  asset: {
    asset_name: string;
    contract_address: string;
    contract_name: string;
  };
  [k: string]: unknown | undefined;
};
type PostConditionNonFungible = {
  principal: PostConditionPrincipal;
  [k: string]: unknown | undefined;
} & {
  condition_code: PostConditionNonFungibleConditionCode;
  type: "non_fungible";
  asset_value: {
    hex: string;
    repr: string;
  };
  asset: {
    asset_name: string;
    contract_address: string;
    contract_name: string;
  };
  [k: string]: unknown | undefined;
};
/**
 * A non-fungible condition code encodes a statement being made about a non-fungible token, with respect to whether or not the particular non-fungible token is owned by the account.
 */
type PostConditionNonFungibleConditionCode = "sent" | "not_sent";

export default Transaction;
