import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';

// define database connection
export const AppDatSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port:
    process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  logging: false,
});

export const connectDB = async (): Promise<boolean> => {
  try {
    await AppDatSource.initialize();
    return true;
  } catch (error) {
    console.error('Database error', error);
    return false;
  }
};
