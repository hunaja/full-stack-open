import { useQuery } from '@apollo/client';
import { GET_ME_USER } from '../graphql/queries';

const useMe = (variables) => {
  const {
    data, loading, fetchMore, ...result
  } = useQuery(GET_ME_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const pageInfo = data?.me.reviews.pageInfo;
    const nextPage = !loading && pageInfo?.hasNextPage;
    if (!nextPage) return;

    fetchMore({
      variables: {
        reviewsAfter: pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    me: data?.me, loading, fetchMoreReviews: handleFetchMore, ...result,
  };
};

export default useMe;
