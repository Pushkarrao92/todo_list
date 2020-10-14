import { join } from 'path';

/* Root Path for Directories */
export const PUBLIC_ROOT_PATH = join(__dirname, '../public');
export const PUBLIC_UPLOADS_PATH = join(__dirname, '../public/uploads');

export enum PriorityTypes {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
};