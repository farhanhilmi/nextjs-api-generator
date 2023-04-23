import fs from 'fs';

export default (model) => {
    const routes = `
import { Router } from 'express';
import ${model.toLowerCase()}Controller from '../controllers/${model}Controller.js';

const ${model.toLowerCase()}Routes = () => {
    const router = Router();

    const controller = new ${model}Controller();

    router.post('/', controller.create.bind(controller));
    router.get('/:id', controller.getById.bind(controller));
    router.get('/', controller.getAll.bind(controller));
    router.put('/:id', controller.updateById.bind(controller));
    router.delete('/:id', controller.deleteById.bind(controller));
    return router;
};

export default ${model.toLowerCase()}Routes;
    `;

    if (!fs.existsSync('/tmp/result/src/routes')) {
        fs.mkdirSync('/tmp/result/src/routes');
    }

    fs.writeFile(
        `/tmp/result/src/routes/${model.toLowerCase()}Routes.js`,
        routes,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('The file was saved!');
        },
    );
};
