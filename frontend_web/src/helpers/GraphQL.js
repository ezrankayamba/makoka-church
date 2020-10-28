import { gql } from "apollo-boost";

export const GET_ENTRIES = gql`
  query getEntries(
    $pageNo: Int
    $pageSize: Int
    $entity: Int
    $entryType: Int
    $dateFrom: Date
    $dateTo: Date
  ) {
    entries(
      pageNo: $pageNo
      pageSize: $pageSize
      entity: $entity
      entryType: $entryType
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) {
      id
      amount
      entryType
      createdAt
      updatedAt
      entity {
        id
        name
      }
    }
  }
`;

export const GET_ENTITIES = gql`
  query getEntities {
    entities {
      id
      name
    }
  }
`;

export const CREATE_ENTRY = gql`
  mutation createEntry($entity: ID!, $amount: Float!, $entryType: Int!, $createdAt: DateTime!) {
    createEntry(input: { entity: $entity, amount: $amount, entryType: $entryType, createdAt: $createdAt }) {
      result {
        id
      }
    }
  }
`;
export const CREATE_ENTITY = gql`
  mutation createEntity($name: String!) {
    createEntity(input: { name: $name }) {
      result {
        id
      }
    }
  }
`;
