import { gql } from "@apollo/client";

export const BlockInfo = gql`
  query GetBlockInfo($stacks_block_height: Int!) {
    block_info(where: {stacks_block_height: {_eq: $stacks_block_height}}) {
    btc_block_height
    block_reward
    commit_value
    stacks_block_height
    timestamp
    winner_stx_address
    blockCommits: winner_to_all_commit {
      is_winner
      commit_value
      stx_address
      commit_btc_tx_id
    }
  }
`;

export const getBlocksList = gql`
  query getBlocksList($limit: Int!, $offset: Int!) {
    block_info(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      winner_stx_address
      stacks_block_height
      commit_value
      timestamp
    }
  }
`;
