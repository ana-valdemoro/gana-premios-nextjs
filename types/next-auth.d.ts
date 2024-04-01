import 'next-auth';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { User as UserModel } from '@/models/User';

declare module 'next-auth' {
    export interface User extends UserModel {
        id: number;
    }
}