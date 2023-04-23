import fs from 'fs';

export default () => {
    const indexFile = `import expressApp from './express.js';
import morgan from 'morgan';
import config from './config/index.js';

// Do not remove this line
import dbConnection from './models/connection.js';

const startServer = async () => {
    const app = await expressApp();

    app.use(
        morgan(':method :url :status :res[content-length] - :response-time ms'),
    );
    
    morgan.token('param', function (req, res, param) {
        return req.params[param];
    });

    app.use((req, res, next) => {
        const error = new Error("API endpoint doesn't exist!");
        error.status = 404;
        next(error);
    });

    // error handler middleware
    app.use((error, req, res, _) => {
        const message = !error.status ? 'Internal Server Error' : error.message;
        console.log(error);
        res.status(error.status || 500).json({
            success: false,
            data: [],
            message,
        });
    });

    app.listen(config.app.port, () => {
        console.log(\`listening to port \${config.app.port}\`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
        .on('close', () => {
            channel.close();
        });
};

startServer();
`;

    if (!fs.existsSync('/tmp/result/src')) {
        fs.mkdirSync('/tmp/result/src');
    }

    fs.writeFile(`/tmp/result/src/index.js`, indexFile, 'utf8', function (err) {
        if (err) {
            console.log('err', err);
        }
        console.log('index.js file was saved!');
    });
};
