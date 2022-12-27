import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

function SingleRepository() {
  const { id } = useParams();
  const { repository, fetchMoreReviews } = useRepository({
    id,
    reviewsFirst: 10,
  });

  if (!repository) return <Text type="error">This repository was not found.</Text>;

  const onEndReach = () => {
    fetchMoreReviews();
  };

  const reviews = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem item={item} title={item.user.username} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<RepositoryItem item={repository} withLink />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

export default SingleRepository;
