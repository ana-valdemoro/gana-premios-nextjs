import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY, JWT_ACSESS_TOKEN } from '../constants/accessToken';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Payload = {
  id: string;
  type: string;
};

export const generateJWT = (
  payload: Payload,
  options: Partial<jwt.SignOptions>
): string => {
  const jwtOptions: jwt.SignOptions = {
    ...options,
    algorithm: JWT_ACSESS_TOKEN.ALGORITHM as jwt.Algorithm,
  };

  return jwt.sign(payload, JWT_PRIVATE_KEY, jwtOptions);
};
