import { object, string, type ValidationError } from 'yup';

type createErrorFn = ({
  message,
  path,
}: {
  message: string;
  path: string;
}) => ValidationError;

interface ContextType {
  parent: {
    email: string;
  };
  path: string;
  createError: createErrorFn;
}

const validatePassword = function (
  password: string | undefined,
  context: ContextType
): boolean | ValidationError {
  const errors = [];

  if (password === undefined) {
    return context.createError({
      message: 'Required field in validation schema',
      path: context.path,
    });
  }

  if (password.length < 9) {
    errors.push('Min length 8 characters');
  }

  const lowercase = /^(?=.*[a-z]).{1,}$/;
  if (!lowercase.test(password)) {
    errors.push('It must contain one lowercase character');
  }

  const uppercase = /^(?=.*[A-Z]).{1,}$/;
  if (!uppercase.test(password)) {
    errors.push('It must contain one uppercase character');
  }

  const number = /^(?=.*[0-9]).{1,}$/;
  if (!number.test(password)) {
    errors.push('It must contain one number');
  }

  // eslint-disable-next-line no-useless-escape
  const symbols = /^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{1,}$/;
  if (!symbols.test(password)) {
    errors.push(`It must contain one symbol`);
  }

  return errors.length > 0
    ? context.createError({
        message: `${errors.join(', ')}`,
        path: context.path,
      })
    : true;
};

export const UserObject = object({
  fullname: string().required(),
  email: string().email().required(),
  password: string().test('validate-password', validatePassword),
});
