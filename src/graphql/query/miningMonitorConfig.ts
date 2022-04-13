import { gql } from "@apollo/client";

export const minerConfig = gql`
  query GetMinerConfig {
    config {
      value
      comment
      name
    }
  }
`;

export const getHeights = gql`
  query heights {
    block_info(order_by: { stacks_block_height: desc }, limit: 1, offset: 0) {
      stacks_block_height
      btc_block_height
    }
  }
`;

export const minerInfo = gql`
  query getMinerRecentBlocks($minerStxAddress: String!) {
    miner_rewards(where: { winner_stx_address: { _eq: $minerStxAddress } }) {
      total_reward
      winner_stx_address
      total_won
    }
    miner_info(where: { stx_address: { _eq: $minerStxAddress } }) {
      stx_address
      total_commits
      total_participations
    }
  }
`;

export const minerInformations = gql`
  query minerData {
    block_info(order_by: { stacks_block_height: desc }, limit: 50, offset: 0) {
      tx_reward
      timestamp
      stacks_block_height
      winner_stx_address
      winner_btc_address
      btc_block_height
      block_reward
      winner_to_all_commit {
        commit_value
        stx_address
        is_winner
        commit_info_to_commit_gas {
          commit_btc_gas_fee
          commit_btc_tx_id
        }
      }
    }
  }
`;
