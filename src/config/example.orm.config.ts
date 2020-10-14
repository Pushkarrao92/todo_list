import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const withCache: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'todo_list_development',
  synchronize: true,
  logging: true,
  entities: [join(__dirname, '../app/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../app/migrations/*.seed{.ts,.js}')]
};