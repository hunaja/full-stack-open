import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import reviewSchema from '../schemas/reviewSchema';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
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

export function ReviewFormContainer({ onSubmit }) {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={reviewSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Text type="primary" style={styles.bigText}>Create Review</Text>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review" />
          <Pressable onPress={handleSubmit} style={styles.submitButton}><Text type="white" style={styles.submitButtonText}>Lähetä</Text></Pressable>
        </View>
      )}
    </Formik>
  );
}

function ReviewForm() {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { rating, ...otherValues } = values;

    try {
      const { data } = await createReview({ rating: Number(rating), ...otherValues });
      navigate(`/repositories/${data.createReview.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={handleSubmit} />;
}

export default ReviewForm;
