import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
});

function FormikTextInput({ name, ...props }) {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(val) => helpers.setValue(val)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text type="error" style={styles.errorText}>{meta.error}</Text>}
    </>
  );
}

export default FormikTextInput;
