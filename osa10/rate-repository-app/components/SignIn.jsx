import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import signInSchema from '../schemas/signInSchema';
import theme from '../theme';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
  submitButtonText: {
    fontSize: 17,
    alignSelf: 'center',
  },
  bigText: {
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 10,
  },
});

export function SignInContainer({ onSubmit }) {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={signInSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Text type="primary" style={styles.bigText}>Log In</Text>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.submitButton}><Text type="white" style={styles.submitButtonText}>Submit</Text></Pressable>
        </View>
      )}
    </Formik>
  );
}

function SignIn() {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={handleSubmit} />;
}

export default SignIn;
