import Constants from 'expo-constants';
import {
  Pressable, StyleSheet, View, ScrollView,
} from 'react-native';
import { Link } from 'react-router-native';

import { useApolloClient } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.heading,
  },
  link: {
    fontSize: theme.fontSizes.heading,
    marginRight: 10,
  },
});

function AppBar() {
  const { me } = useMe();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handlePress = () => {
    // todo
  };

  const handleSignout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handlePress()}>
        <ScrollView horizontal>
          <Link to="/"><Text type="white" style={styles.link}>Repositories</Text></Link>

          {me ? (
            <>
              <Link to="/createReview"><Text type="white" style={styles.link}>New Review</Text></Link>
              <Link to="/myReviews"><Text type="white" style={styles.link}>My Reviews</Text></Link>
              <Pressable onPress={() => handleSignout()}>
                <Text type="white" style={styles.link}>
                  Sign Out (
                  {me.username}
                  )
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Link to="/signin"><Text type="white" style={styles.link}>Sign In</Text></Link>
              <Link to="/signup"><Text type="white" style={styles.link}>Sign Up</Text></Link>
            </>
          )}
        </ScrollView>
      </Pressable>
    </View>
  );
}

export default AppBar;
