import fs from 'fs';

import { toTitleCase } from '@/utils';

export default (model) => {
    const controller = `
import ${model}Service from '../services/${model}Service.js';

class ${toTitleCase(model)}Controller {
    constructor() {
        this.service = new ${model}Service;
    }

    async create(req, res, next) {
        try {
            const result = await this.service.create(req.body);
            res.status(201).json({
                status: 'OK',
                data: result,
            });
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const result = await this.service.getById(id);
            res.status(200).json({
                status: 'OK',
                data: result,
            });
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await this.service.getAll();
            res.status(200).json({
                status: 'OK',
                data: result,
            });
        } catch (error) {
            next(error)
        }
    }

    async updateById(req, res, next) {
        try {
            const id = req.params.id;
            const result = await this.service.updateById(id, req.body);
            res.status(200).json({
                status: 'OK',
                data: result,
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteById(req, res, next) {
        try {
            const id = req.params.id;
            await this.service.deleteById(id);
            res.status(200).json({
                status: 'OK',
                data: [],
            });
        } catch (error) {
            next(error)
        }
    }
}

export default ${toTitleCase(model)}Controller;
    `;

    if (!fs.existsSync('/tmp/result/src/controllers')) {
        fs.mkdirSync('/tmp/result/src/controllers');
    }

    fs.writeFile(
        `/tmp/result/src/controllers/${model.toLowerCase()}Controller.js`,
        controller,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('The file was saved!');
        },
    );
};
