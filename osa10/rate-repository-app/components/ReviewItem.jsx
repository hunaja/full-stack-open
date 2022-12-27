import {
  StyleSheet, View, Text as NativeText, Pressable,
} from 'react-native';
import { format as formatDate } from 'date-fns';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 5,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  ratingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.secondary,
  },
  dateText: {
    fontSize: theme.fontSizes.secondary,
  },
  contentContainer: {
    flexShrink: 1,
    padding: 5,
  },
  reviewContent: {
    marginTop: 5,
    fontSize: theme.fontSizes.body,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    flex: 1,
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    margin: 2,
    borderRadius: 5,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    flex: 2,
  },
  deleteButton: {
    margin: 2,
    backgroundColor: theme.colors.error,
    padding: 5,
    borderRadius: 5,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    flex: 2,
  },
  linkText: {
    alignSelf: 'center',
  },
});

function ReviewItem({ item, title, onDelete }) {
  return (
    <View style={styles.container}>

      <View style={styles.bodyContainer}>
        <View style={styles.ratingContainer}>
          <NativeText style={styles.ratingText}>
            {item.rating}
          </NativeText>
        </View>
        <View style={styles.contentContainer}>
          <Text type="primary" style={styles.authorName}>{title}</Text>
          <Text type="secondary" style={styles.dateText}>{formatDate(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
          <Text type="primary" style={styles.reviewContent}>{item.text}</Text>
        </View>
      </View>

      {onDelete && (
        <View style={styles.footerContainer}>
          <Link style={styles.linkButton} to={`/repositories/${item.repository.id}`}>
            <Text type="white" style={styles.linkText}>View repository</Text>
          </Link>

          <Pressable style={styles.deleteButton} onPress={() => onDelete(item)}>
            <Text type="white" style={styles.linkText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default ReviewItem;
