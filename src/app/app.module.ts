import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { PUBLIC_ROOT_PATH, withCache } from '../config';

import { UsersModule } from './users';
import { TasksModule } from './tasks';

@Module({
    imports: [
        TypeOrmModule.forRoot(withCache),
        MulterModule.registerAsync({
            useFactory: async () => ({
                dest: PUBLIC_ROOT_PATH,
            }),
        }),
        UsersModule,
        TasksModule
    ],
    providers: [
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: MorganInterceptor('combined', {
        //         immediate: true,
        //     }),
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
    ],
    exports: [MulterModule],
})
export class AppModule { }
