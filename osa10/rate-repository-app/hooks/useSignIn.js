import { useApolloClient, useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const mutationResult = await mutate({ variables: { username, password } });

    const { accessToken } = mutationResult.data.authenticate;
    if (!accessToken) throw new Error('Server did not provide an access token.');

    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();

    return mutationResult;
  };

  return [signIn, result];
};

export default useSignIn;
