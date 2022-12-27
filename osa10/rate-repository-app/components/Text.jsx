import { StyleSheet, Text as NativeText } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  primary: {
    color: theme.colors.textPrimary,
  },
  secondary: {
    color: theme.colors.textSecondary,
  },
  error: {
    color: theme.colors.textError,
  },
  white: {
    color: 'white',
  },
});

function Text({ style, type, ...props }) {
  const textStyle = [
    style,
    styles.primary,
    type === 'white' && styles.white,
    type === 'secondary' && styles.secondary,
    type === 'error' && styles.error,
  ];

  return <NativeText style={textStyle} {...props} />;
}

export default Text;
