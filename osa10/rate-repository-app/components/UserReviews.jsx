import { FlatList, Alert } from 'react-native';
import { useParams } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';
import useMe from '../hooks/useMe';
import ReviewItem from './ReviewItem';

function UserReviews() {
  const { id } = useParams();
  const [deleteReview] = useDeleteReview();
  const { me, fetchMoreReviews, refetch } = useMe({
    id,
    includeReviews: true,
    reviewsFirst: 10,
  });

  const onEndReach = () => {
    fetchMoreReviews();
  };

  const onDelete = (item) => {
    Alert.alert(
      `Delete ${item.repository.fullName}`,
      'Are you sure that you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              const { data } = await deleteReview(item.id);
              if (!data?.deleteReview) throw new Error(data);
              refetch();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
    );
  };

  const reviews = me?.reviews
    ? me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem item={item} title={item.repository.fullName} onDelete={onDelete} />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

export default UserReviews;
