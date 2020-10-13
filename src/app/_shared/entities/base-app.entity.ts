import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import datetime = require('node-datetime');

import { SERVER_HOST_URL } from '../../../config';

export class BaseAppEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({ nullable: true, type: 'timestamp' })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true, type: 'timestamp' })
    updatedAt?: Date;

    /* Class Shared Methods */
    protected getAbsoluteMediaUrl(propertyName: string) {
        if ((this[propertyName] !== undefined) && (this[propertyName] !== null))
            return `${SERVER_HOST_URL}${this[propertyName]}`;
        else
            return null;
    }

    protected convertDateForDB(propertyName: string) {
        if (this[propertyName]) {
            const newDate = datetime.create(this[propertyName]);
            this[propertyName] = newDate.format('Y/m/d');
        }
    }

    protected convertDateForResponse(propertyName: string) {
        if (this[propertyName]) {
            const newDate = datetime.create(this[propertyName]);
            this[propertyName] = newDate.format('m/d/Y');
        }
    }
    /* Class Shared Methods End */

}
