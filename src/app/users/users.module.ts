import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
// export class UsersModule { }
export class UsersModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes(UsersController);
    }
}
