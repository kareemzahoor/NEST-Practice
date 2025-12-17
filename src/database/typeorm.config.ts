import 'dotenv/config';

import { Todo } from "src/todos/entities/todo.entity";
import { DataSource } from "typeorm";
import { User } from "src/users/user.entity";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '6543'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true, // only for development
  entities: [User, Todo],
  logging: true,
});