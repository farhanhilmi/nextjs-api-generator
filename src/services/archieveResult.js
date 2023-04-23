import { zipDirectory } from '@/utils';
import fs from 'fs';

// import {  } from '../utils';

const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            let curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

export default async (serviceName) => {
    let date = new Date();
    let dateString = `${date.getUTCDate()}${
        date.getUTCMonth() + 1
    }${date.getUTCFullYear()}${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCSeconds()}${date.getUTCMilliseconds()}`;

    const fileName = `${serviceName}_${dateString}`;
    const ajaja = await zipDirectory(
        '/tmp/result',
        `/tmp/archieve/${fileName}.zip`,
    );
    console.log('archieved', ajaja);

    // Delele result folder
    const directory = `/tmp/result`;
    deleteFolderRecursive(directory);

    return fileName;
};
