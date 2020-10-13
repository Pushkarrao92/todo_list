import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService extends TypeOrmCrudService<TaskEntity> {
  constructor(@InjectRepository(TaskEntity) repo) {
    super(repo);
  }
}
