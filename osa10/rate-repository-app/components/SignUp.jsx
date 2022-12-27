import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import signUpSchema from '../schemas/signUpSchema';
import theme from '../theme';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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

export function SignUpContainer({ onSubmit }) {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={signUpSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Text type="primary" style={styles.bigText}>Sign Up</Text>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry />
          <FormikTextInput name="confirmPassword" placeholder="Confirm Password" secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.submitButton}><Text type="white" style={styles.submitButtonText}>Submit</Text></Pressable>
        </View>
      )}
    </Formik>
  );
}

function SignUp() {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data: signUpData } = await signUp({ username, password });
      console.log(signUpData);

      const { data: signInData } = await signIn({ username, password });
      console.log(signInData);

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={handleSubmit} />;
}

export default SignUp;
