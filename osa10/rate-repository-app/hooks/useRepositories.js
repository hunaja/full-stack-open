import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const {
    data, loading, fetchMore, ...result
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const pageInfo = data?.repositories.pageInfo;
    const nextPage = !loading && pageInfo?.hasNextPage;
    if (!nextPage) {
      console.log("Can't fetch more.");
      return;
    }

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result,
  };
};

export default useRepositories;
