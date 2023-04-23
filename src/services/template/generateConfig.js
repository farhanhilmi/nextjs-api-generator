import fs from 'fs';

export default () => {
    const config = `
import dotenv from 'dotenv';

dotenv.config();

const { DB_URI, PORT, HOST } = process.env;

const config = {
    app: {
        port: PORT,
        host: HOST,
    },
    db: {
        uri: DB_URI,
    },
};

export default config;
    `;

    if (!fs.existsSync('/tmp/result/src/config')) {
        fs.mkdirSync('/tmp/result/src/config');
    }

    fs.writeFile(
        '/tmp/result/src/config/index.js',
        config,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('Config file was saved!');
        },
    );
};
