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

import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: UserEntity,
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
@ApiTags('Users')
@Controller('v1/users')
export class UsersController implements CrudController<UserEntity> {
    constructor(public service: UsersService) { }

    get base(): CrudController<UserEntity> {
        return this;
    }

    @Override('updateOneBase')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multerDiskStorageConfig('users', 'avatar'),
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
