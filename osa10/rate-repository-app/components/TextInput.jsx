import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  basic: {
    padding: 10,
    fontSize: 17,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    marginBottom: 5,
  },
  error: {
    borderColor: theme.colors.error,
    marginBottom: 0,
  },
});

function TextInput({ style, error, ...props }) {
  const textInputStyle = [style, styles.basic, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
}

export default TextInput;
