import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  footerItem: {
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
  },
  footerItemNumber: {
    fontWeight: 'bold',
  },
  fontItemDescription: {
    fontSize: theme.fontSizes.secondary,
  },
});

function RepositoryItemFooterItem({ number, description }) {
  return (
    <View style={styles.footerItem}>
      <Text type="primary" style={styles.footerItemNumber}>{number}</Text>
      <Text type="secondary" style={styles.footerItemDescription}>{description}</Text>
    </View>
  );
}

export default RepositoryItemFooterItem;
