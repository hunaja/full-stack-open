const { gql } = require('@apollo/client');

export const GET_REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
        cursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $reviewsFirst: Int, $reviewsAfter: String) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
      reviews(first: $reviewsFirst, after: $reviewsAfter) {
        totalCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
      }
    }
  }
`;

export const GET_ME_USER = gql`
  query($includeReviews: Boolean = false, $reviewsFirst: Int, $reviewsAfter: String) {
    me {
      id
      username
      reviews(first: $reviewsFirst, after: $reviewsAfter) @include(if: $includeReviews) {
        totalCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
              id
            }
          }
        }
      }
    }
  }
`;
