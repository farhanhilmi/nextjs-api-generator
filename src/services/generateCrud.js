import fs from 'fs';
import nodePackage from './template/nodePackage';
import { writeToFile } from '@/utils/fs';
import generateModel from './template/generateModel';
import generateService from './template/generateService';
import generateController from './template/generateController';
import generateRoute from './template/generateRoute';
import generateIndexRoute from './template/generateIndexRoute';
import generateExpress from './template/generateExpress';
import generateConfig from './template/generateConfig';
import generateEnv from './template/generateEnv';
import generateIndex from './template/generateIndex';
import generateErrorHandler from './template/generateErrorHandler';
import generateConnection from './template/generateConnection';

export default async (serviceName, databaseType, properties, description) => {
    try {
        const dependencies = {
            cors: '^2.8.5',
            dotenv: '^16.0.3',
            express: '^4.18.2',
            jsonwebtoken: '^9.0.0',
            morgan: '^1.10.0',
        };
        const devDependencies = {
            nodemon: '^2.0.22',
        };

        if (databaseType === 'mongodb') {
            dependencies['mongoose'] = '^6.9.1';
        }

        const dataPackage = nodePackage(
            serviceName,
            description,
            dependencies,
            devDependencies,
        );

        if (!fs.existsSync('/tmp/result')) {
            fs.mkdirSync('/tmp/result');
        }

        // generate api package
        writeToFile(dataPackage, `/tmp/result/package.json`);

        if (!fs.existsSync('/tmp/result/src')) {
            fs.mkdirSync('/tmp/result/src');
        }

        // copyFile(
        //     join(__dirname, '../template/sample/src'),
        //     join(__dirname, `../template/result/src`),
        // );

        // Generate Models
        for (const collection in properties) {
            generateModel(collection, properties[collection]);

            // GENERATE SERVICE
            generateService(collection, properties[collection]);

            // GENERATE CONTROLLER
            generateController(collection);

            // GENRATE ROUTES
            generateRoute(collection);
        }

        // GENERATE INDEX ROUTE
        generateIndexRoute(Object.keys(properties));

        // GENERATE EXPRESS APP
        generateExpress();

        // GENERATE CONFIG
        generateConfig();

        // GENERATE ENV
        generateEnv();

        // GENERATE INDEX
        generateIndex();

        // GENERATE ERROR HANDLER
        generateErrorHandler();

        // GENERATE DB CONNECTION
        if (databaseType === 'mongodb') {
            generateConnection();
        }
    } catch (error) {
        console.log('error in generatedCrud', error);
        throw error;
    }
};
