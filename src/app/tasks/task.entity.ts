import { CrudValidationGroups } from '@nestjsx/crud';
import { Entity, Column, AfterLoad } from 'typeorm';
import { IsOptional, IsNotEmpty } from 'class-validator';

import { BaseAppEntity } from '../_shared/entities';
import { PriorityTypes } from '../../config';

const { CREATE } = CrudValidationGroups;

@Entity('tasks')
export class TaskEntity extends BaseAppEntity {

  /* Virtual/Extra Properties Decleration */
  public attachmentUrl: string;
  /* Virtual/Extra Properties Decleration End */

  /* Entity Properties Decleration */
  @IsNotEmpty({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @IsNotEmpty({ always: true })
  @Column({ type: 'text', nullable: false })
  description: string;

  @IsNotEmpty({ always: true })
  @Column({ type: 'enum', enum: PriorityTypes, default: PriorityTypes.LOW })
  priority: PriorityTypes;

  @IsNotEmpty({ always: true })
  @Column({ type: 'integer' })
  position: number;

  @IsOptional({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment: string;

  @IsNotEmpty({ always: true })
  @Column({ type: 'date', nullable: true })
  dueDate: string;
  /* Entity Properties Decleration End */

  /* Public Instance Methods */
  /* Public Instance Methods End*/

  /* Callbacks */
  @AfterLoad()
  afterLoadCallback() {
    this.attachmentUrl = this.getAbsoluteMediaUrl('attachment');
  }
  /* Callbacks End */

  /* Relations */
  /* Relations End */

  /* Private Methods */
  /* Private Methods End */

}
