import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    primary: '#0366d6',
    secondary: '#586069',
    textSecondary: '#586069',
    error: '#d73a4a',
    textError: '#d73a4a',
    heading: '#24292e',
    background: '#e1e4e8',
  },
  fontSizes: {
    heading: 25,
    subheading: 22,
    body: 17,
    secondary: 15,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
};

export default theme;
