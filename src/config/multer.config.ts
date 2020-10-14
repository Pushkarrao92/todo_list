import { diskStorage } from 'multer';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as crypto from 'crypto';

import { PUBLIC_UPLOADS_PATH } from './constant';

export function multerDiskStorageConfig(entity: string, property: string) {
    return diskStorage({
        destination: async function (req, file, callback) {
            const recordId = req.params.id;
            let distPath = path.join(
                // __dirname,
                `${PUBLIC_UPLOADS_PATH}/${entity}/${recordId}/${property}`,
            );
            await mkdirp(distPath, function (errors) {
                if (errors) return callback(errors);
                callback(null, distPath);
            });
        },
        filename: async function (req, file, callback) {
            await crypto.pseudoRandomBytes(16, function (errors, raw) {
                if (errors) return callback(errors);
                callback(null, raw.toString('hex') + path.extname(file.originalname));
            });
        }
    });
}
