import {
  View, StyleSheet, Image, Pressable,
} from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import RepositoryItemFooterItem from './RepositoryItemFooterItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentImage: {
    width: 100,
    height: 100,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 25,
    alignSelf: 'flex-start',
    fontSize: theme.fontSizes.secondary,
  },
  name: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.body,
    marginBottom: 2,
  },
  description: {
    marginBottom: 2,
    fontSize: theme.fontSizes.body,
  },
  contentText: {
    padding: 5,
    flexShrink: 1,
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
  linkText: {
    alignSelf: 'center',
  },
});

function RepositoryItem({ item, withLink = false }) {
  const onLinkPress = () => {
    Linking.openURL(item.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.contentImage} />

        <View style={styles.contentText}>
          <Text type="primary" style={styles.name}>{item.fullName}</Text>
          <Text type="secondary" style={styles.description}>{item.description}</Text>
          <Text type="white" style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RepositoryItemFooterItem number={item.stargazersCount} description="stars" />
        <RepositoryItemFooterItem number={item.forksCount} description="forks" />
        <RepositoryItemFooterItem number={item.reviewCount} description="reviews" />
        <RepositoryItemFooterItem number={item.ratingAverage} description="ratings" />
      </View>

      {withLink && (
        <Pressable onPress={() => onLinkPress()}>
          <View style={styles.linkButton}>
            <Text type="white" style={styles.linkText}>Open in GitHub</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

export default RepositoryItem;
