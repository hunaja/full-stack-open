import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const {
    data, fetchMore, loading, ...result
  } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const pageInfo = data?.repository.reviews.pageInfo;
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
    repository: data?.repository, fetchMoreReviews: handleFetchMore, loading, ...result,
  };
};

export default useRepository;
