export const getOverviewData = `getOverviewData`;
export const getSatsCommittedPerBlock = `getSatsCommittedPerBlock`;
export const getSatsCommittedAdressPerBlock = (address: string) =>
  `getSatsCommittedPerBlock?stx_address=${address}`;
export const getAddressBlocksHistory = (address: string) =>
  `getMinerMiningHistory?stx_address=${address}`;
export const getTopBurnFeePerBlock = `getTopBurnFeePerBlock`;
export const getRewardDistribution = `getRewardDistribution?latest_blocks=100`;
export const getBlocks = `getBlocks`;
export const getMinerSatsCommittedPerBlock = `getMinerSatsCommittedPerBlock`;
export const getBlockNumber = (block: string) =>
  `getBlockInfoByNumber?block_number=${block}`;
export const getMinersInfo = `getMinersInfo`;
export const getBlocksForSpecificAddress = (address: string) =>
  `getMinerInfoPerBlock?stx_address=${address}`;
export const getTokenPrice = `getTokenPrice`;
export const getBriefMinerInfo = (address: string) =>
  `getBriefMinerInfo?stx_address=${address}`;
export const getMiningInfo = `getMiningInfo?latest_blocks=100`;
