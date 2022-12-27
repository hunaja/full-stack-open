import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String) {
    createReview(review: { ownerName: $ownerName, rating: $rating, repositoryName: $repositoryName, text: $text }) {
      repository {
        id
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
