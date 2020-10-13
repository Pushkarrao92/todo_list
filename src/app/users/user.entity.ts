import { CrudValidationGroups } from '@nestjsx/crud';
import { Entity, Column, AfterLoad, ManyToOne, OneToMany, OneToOne, AfterInsert, getConnection, In, Between } from 'typeorm';
import { IsOptional, IsNotEmpty, IsBoolean, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseAppEntity } from '../_shared/entities';

const { CREATE } = CrudValidationGroups;

@Entity('users')
export class UserEntity extends BaseAppEntity {

  /* Virtual/Extra Properties Decleration */
  public avatarURL: string;
  /* Virtual/Extra Properties Decleration End */

  /* Entity Properties Decleration */
  @IsNotEmpty({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @IsNotEmpty({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @IsOptional({ always: true })
  @IsBoolean({ always: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @IsOptional({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, default: '/system/default/profile/avatar.png' })
  avatar: string;
  /* Entity Properties Decleration End */

  /* Public Instance Methods */
  /* Public Instance Methods End*/

  /* Callbacks */
  @AfterLoad()
  afterLoadCallback() {
    this.avatarURL = this.getAbsoluteMediaUrl('avatar');
  }
  /* Callbacks End */

  /* Relations */
  /* Relations End */

  /* Private Methods */
  /* Private Methods End */

}
