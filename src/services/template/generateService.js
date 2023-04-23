import fs from 'fs';

import { toTitleCase } from '@/utils';
// import moment from 'moment-timezone';

export default (model, properties) => {
    const service = `import { notFoundError, validationError } from '../utils/errorHandler.js';
import ${model} from '../models/${model}.js';

class ${toTitleCase(model)}Service {
    constructor() {
        this.model = ${model};
    }

    async create(data) {
        try {
            // const keys = Object.keys(data);
            // const values = Object.values(data);

            for (const key in ${JSON.stringify(properties, null, 4)}) {
                if (!data[key]) {
                    validationError(\`Missing \${key} field\`);
                }
            }

            return await this.model.create(data);
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            if (!id) {
                validationError('Missing id field');
            }

            const result = await this.model.findById(id);
            if (!result) {
                notFoundError('No record found');
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            throw error;
        }
    }

    async updateById(id, data) {
        try {
            if (!id) {
                validationError('Missing id field');
            }

            for (const key in ${JSON.stringify(properties, null, 4)}) {
                if (!data[key]) {
                    validationError(\`Missing \${key} field\`);
                }
            }

            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!result) {
                notFoundError('No record found');
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            if (!id) {
                validationError('Missing id field');
            }

            const result = await this.model.findByIdAndDelete(id);
            if (!result) {
                notFoundError('No record found');
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default ${toTitleCase(model)}Service;
    `;

    if (!fs.existsSync('/tmp/result/src/services')) {
        fs.mkdirSync('/tmp/result/src/services');
    }

    fs.writeFile(
        `/tmp/result/src/services/${model.toLowerCase()}Service.js`,
        service,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('The file was saved!');
        },
    );
};
