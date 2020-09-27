import { gql } from "apollo-boost";
export const USERS_GET_TOKEN = gql`
  mutation getToken($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const USERS_GET_ME = gql`
  query getMe {
    me {
      id
      username
      dateJoined
      firstName
      lastName
      lastLogin
      email
      isStaff
      isSuperuser
    }
  }
`;

export const USERS = gql`
  query getUsers {
    users {
      id
      username
      dateJoined
      firstName
      lastName
      lastLogin
      email
      isStaff
      isSuperuser
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $id: ID
    $username: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    registerUser(
      id: $id
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        id
        username
        dateJoined
        firstName
        lastName
        lastLogin
        email
        isStaff
        isSuperuser
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      dateJoined
      firstName
      lastName
      lastLogin
      email
      isStaff
      isSuperuser
    }
  }
`;
