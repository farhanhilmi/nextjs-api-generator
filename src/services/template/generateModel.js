import fs from 'fs';

import { toTitleCase } from '@/utils';
// import moment from 'moment-timezone';

export default (collectionName, properties) => {
    const dataSchema = `
import mongoose from 'mongoose';

const ${collectionName}Schema = new mongoose.Schema(
    ${JSON.stringify(properties, null, 4)},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        collection: '${collectionName}',
    },
);

export default mongoose.model('${toTitleCase(
        collectionName,
    )}', ${collectionName}Schema);
    `;

    if (!fs.existsSync('/tmp/result/src/models')) {
        fs.mkdirSync('/tmp/result/src/models');
    }

    fs.writeFile(
        `/tmp/result/src/models/${collectionName.toLowerCase()}.js`,
        dataSchema,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('The file was saved!');
        },
    );
};
