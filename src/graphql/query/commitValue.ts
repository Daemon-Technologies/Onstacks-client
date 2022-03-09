import { gql } from "@apollo/client";

export const getBtcCommits = gql`
  fragment sumOfBtcCommits on commit_info_aggregate {
    aggregate {
      sum {
        commit_value
      }
    }
  }

  query getBtcCommits($stacks_block_height: Int!) {
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
