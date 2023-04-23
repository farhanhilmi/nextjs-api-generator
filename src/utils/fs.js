import fs from 'fs';

export const writeToFile = (data, path) => {
    const writePackage = fs.createWriteStream(path, { flags: 'w' });
    writePackage.write(JSON.stringify(data, null, 4));
    writePackage.end();
};
