import {
    Controller,
    Body,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override, ParsedRequest } from '@nestjsx/crud';

import { PUBLIC_ROOT_PATH, multerDiskStorageConfig } from '../../config';

import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@Crud({
    model: {
        type: TaskEntity,
    },
    params: {
        id: {
            field: 'id',
            type: 'string',
            primary: true,
        },
    },
    query: {
        join: {
            authentication: {
                exclude: ['createdAt', 'updatedAt'],
                eager: true,
            }
        }
    }
})
@ApiTags('Tasks')
@Controller('v1/tasks')
export class TasksController implements CrudController<TaskEntity> {
    constructor(public service: TasksService) { }

    get base(): CrudController<TaskEntity> {
        return this;
    }

    @Override('updateOneBase')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multerDiskStorageConfig('tasks', 'attachment'),
        }),
    )
    async customUpdateOneBase(
        @ParsedRequest() req,
        @Body() dto,
        @UploadedFile() file: any,
    ) {
        if (file) {
            dto.avatar = file.path.replace(PUBLIC_ROOT_PATH, '');
        }
        return await this.base.updateOneBase(req, dto);
    }

}
