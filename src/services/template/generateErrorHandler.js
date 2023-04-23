import fs from 'fs';

export default () => {
    const handler = `export const validationError = (message) => {
    var err = new Error(message);
    err.status = 400;
    throw err;
};

export const notFoundError = (message) => {
    var err = new Error(message);
    err.status = 404;
    throw err;
};
`;

    if (!fs.existsSync('/tmp/result/src/utils')) {
        fs.mkdirSync('/tmp/result/src/utils');
    }

    fs.writeFile(
        `/tmp/result/src/utils/errorHandler.js`,
        handler,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('errorHandler file was saved!');
        },
    );
};
