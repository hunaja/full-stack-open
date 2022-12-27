import * as yup from 'yup';

const signupSchema = yup.object().shape({
  username: yup.string().required().min(1).max(30),
  password: yup.string().required().min(5).max(50),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null])
    .required(),
});

export default signupSchema;
