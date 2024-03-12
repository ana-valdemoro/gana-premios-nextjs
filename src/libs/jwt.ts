import jwt from 'jsonwebtoken';
import {
  JWT_PRIVATE_KEY,
  JWT_ACSESS_TOKEN,
  JWT_PUBLIC_KEY,
} from '../constants/accessToken';

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

// AGILIA PROJEC
// export const authorize = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (user, error, info) => {
//     if (error) {
//       return res.status(401).send(error);
//     }
//     if (!user) {
//       return res.status(401).send(info);
//     }
//     req.user = user;
//     req.userType = info;
//     return next();
//   })(req, res);
// };

export const verify = (token: string): string | jwt.JwtPayload | Error => {
  try {
    // Decode the token using a secret key-phrase
    return jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: [JWT_ACSESS_TOKEN.ALGORITHM as jwt.Algorithm],
    });
  } catch (error) {
    // TODO: create custom error
    // throw new AccessTokenInvalidError({ errorDescription: error.message });
    throw new Error('JWT verification fail');
  }
};
