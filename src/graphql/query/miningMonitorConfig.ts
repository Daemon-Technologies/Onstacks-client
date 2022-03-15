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
