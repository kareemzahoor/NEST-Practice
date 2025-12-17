import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TodosModule } from './todos/todos.module';
import { User } from './users/user.entity';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '6543'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Todo],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true, // only for development
    }),
    AuthModule,
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
