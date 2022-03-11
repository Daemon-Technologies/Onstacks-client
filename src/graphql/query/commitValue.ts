import { gql } from "@apollo/client";

export const getBtcCommits = gql`
  fragment sumOfBtcCommits on commit_info_aggregate {
    aggregate {
      sum {
        commit_value
      }
    }
  }

  query getGeneralStats($stacks_block_height: Int!) {
    btcSpentRecent: commit_info_aggregate(
      where: { stacks_block_height: { _gte: $stacks_block_height } }
    ) {
      ...sumOfBtcCommits
    }
    blockFeesRecent: block_info_aggregate(
      where: { stacks_block_height: { _gte: $stacks_block_height } }
    ) {
      aggregate {
        avg {
          tx_reward
        }
      }
    }
    btcSpentAllTime: commit_info_aggregate {
      ...sumOfBtcCommits
    }
    activeMinersCount: block_info_aggregate(
      distinct_on: winner_stx_address
      where: { stacks_block_height: { _gte: $stacks_block_height } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const getBtcCommitsPerBlock = gql`
block_info(order_by: {stacks_block_height: desc}, offset: 0, limit: 100) {
    stacks_block_height
    totalSpent: winner_to_all_commit_aggregate {
      aggregate {
        sum {
          commit_value
        }
      }
    }
  }
`;
