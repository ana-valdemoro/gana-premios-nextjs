import { userService } from '@/services/userService';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Add email' },
        password: {
          label: 'Passwoes',
          type: 'password',
          placeholder: 'Add password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await userService.getUserByEmail(email);

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!user) return null;

        const hasValidPassword = user.validatePassword(password);

        if (!hasValidPassword) return null;

        console.log('aqui');
        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
