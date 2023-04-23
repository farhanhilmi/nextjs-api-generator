import fs from 'fs';

export default () => {
    const express = `import express from 'express';
import cors from 'cors';

import Routes from './routes/index.js';

export default async () => {
    const app = express();
    app.use(express.json());
    app.use(cors({ origin: '*' }));

    app.use(Routes());
    return app;
};
`;

    if (!fs.existsSync('/tmp/result/src')) {
        fs.mkdirSync('/tmp/result/src');
    }

    fs.writeFile('/tmp/result/src/express.js', express, 'utf8', function (err) {
        if (err) {
            console.log('err', err);
        }
        console.log('express app file was saved!');
    });
};
