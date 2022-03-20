import { gql } from "@apollo/client";

export const BlockInfo = gql`
  query GetBlockInfo($stacks_block_height: Int!) {
    block_info(where: { stacks_block_height: { _eq: $stacks_block_height } }) {
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
  }
`;

export const getBlocksList = gql`
  query getBlocksList($limit: Int!, $offset: Int!) {
    block_info(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      winnerAddress: winner_stx_address
      stacksBlockHeight: stacks_block_height
      timestamp
      totalSpent: winner_to_all_commit_aggregate {
        aggregate {
          sum {
            commit_value
          }
        }
      }
    }
  }
`;

export const getRecentBlockCommits = gql`
  query getRecentBlockCommitsAndRewards {
    blocks: block_info(
      limit: 100
      offset: 0
      order_by: { stacks_block_height: desc }
    ) {
      stacksBlockHeight: stacks_block_height
      block_reward
      winner_stx_address
      commits: winner_to_all_commit {
        address: stx_address
        value: commit_value
      }
    }
  }
`;

export const minerList = gql`
  query getMinersList {
    miner_rewards(limit: 100, offset: 0) {
      total_reward
      stx_address: winner_stx_address
      total_won
    }
    miner_info(limit: 100, offset: 0) {
      stx_address
      total_commits
      total_participations
    }
  }
`;
