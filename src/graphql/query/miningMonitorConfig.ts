import { gql } from "@apollo/client";

export const minerConfig = gql`
  query GetMinerConfig {
    config {
      value
      comment
      name
    }
    blockHeights: block_info(
      order_by: { stacks_block_height: desc }
      limit: 1
      offset: 0
    ) {
      stacks_block_height
      btc_block_height
    }
  }
`;
