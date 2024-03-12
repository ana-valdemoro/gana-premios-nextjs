import { User } from '../../../models/User';

describe('User Model', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password =
      '$2a$10$Z15tSAzw6gOUGk75P55Utem3sM5K6M8uDWIZSNaoUe.LIk5Gbpaai';
  });

  describe('validatePassword', () => {
    it('should return true for correct password', () => {
      const result = user.validatePassword('A1234567a?');
      expect(result).toBe(true);
    });

    it('should return false for incorrect password', () => {
      const result = user.validatePassword('incorrectPassword');
      expect(result).toBe(false);
    });
  });
});
