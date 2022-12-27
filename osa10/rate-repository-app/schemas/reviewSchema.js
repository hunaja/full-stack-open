import * as yup from 'yup';

const reviewSchema = yup.object().shape({
  ownerName: yup.string().required(),
  repositoryName: yup.string().required(),
  rating: yup.number().required().min(0).max(100),
  text: yup.string(),
});

export default reviewSchema;
