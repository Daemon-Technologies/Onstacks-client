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
