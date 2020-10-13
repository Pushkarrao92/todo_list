import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity])],
    providers: [TasksService],
    exports: [TasksService],
    controllers: [TasksController],
})
export class TasksModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes(TasksController);
    }
}
