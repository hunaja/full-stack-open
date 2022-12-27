import * as yup from 'yup';

const signInSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default signInSchema;
