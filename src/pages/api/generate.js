import { bucket } from '@/config/firebase';
import archieveResult from '@/services/archieveResult';
import generateCrud from '@/services/generateCrud';
import fs from 'fs';

const validationError = (message) => {
    var err = new Error(message);
    err.status = 400;
    throw err;
};

const archiveDir = '/tmp/archieve';

const removeArchieve = () => {
    try {
        if (!fs.existsSync('/tmp/archieve')) {
            console.log('CREATING DIR archieve');
            fs.mkdirSync('/tmp/archieve');
        }

        fs.readdir(archiveDir, function (err, files) {
            if (err) {
                throw new Error(err);
            } else {
                if (!files.length) {
                    // directory appears to be empty
                    console.log('No files to delete');
                }
            }
            files.forEach(function (file) {
                fs.stat(`${archiveDir}/${file}`, function (err, stats) {
                    if (err) {
                        return console.error(err);
                    }
                    fs.unlink(`${archiveDir}/${file}`, function (err) {
                        if (err) return console.log(err);
                        console.log(`${file} deleted successfully`);
                    });
                });
            });
        });
    } catch (error) {
        console.log('error from remove:', error);
        // next(error);
    }
};
removeArchieve();

const getAllFirebaseArchieve = async () => {
    const data = await bucket.getFiles();
    const files = data[0];
    // new date subtract by 1 minute
    // const oneMinteAge = new Date() - 1000 * 60;
    const oneDayAgo = new Date() - 1000 * 60 * 60 * 23.5;
    const outOfDateFiles = files.filter((file) => {
        const createdDate = new Date(file.metadata.timeCreated);
        // console.log('createdDate', createdDate);
        // check if file date older than 3 hours
        if (createdDate < new Date(oneDayAgo)) {
            console.log(
                "file's date is older than 23.5 hours",
                file.metadata.name,
            );
            file.delete();
        }
        return createdDate < new Date(oneDayAgo);
    });
    return outOfDateFiles;
};

const removeArchieveStorage = () => {
    try {
        getAllFirebaseArchieve();
    } catch (error) {
        console.log('error from removeArchieveStorage:', error);
        // next(error);
    }
};

// in case of server restart, delete all files older than 23 hours 50 minutes
removeArchieveStorage();

// set interval to delete result folder every 5 days
setInterval(function () {
    removeArchieveStorage();
}, 1000 * 60 * 60 * 24 * 5); // every 5 days

const uploadToFirebase = async (path, expires) => {
    const file = await bucket.upload(path);
    const publicUrl = await file[0].getSignedUrl({
        action: 'read',
        expires,
    });
    return publicUrl[0];
};

export default async function index(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }

    try {
        const { serviceName, databaseType, properties, description } = req.body;
        console.log('req.body', req.body);
        if (!serviceName || !databaseType || !properties || !description) {
            validationError(
                'Missing fields. Required fields: serviceName, databaseType, properties, description',
            );
        }

        if (!['mongodb', 'mysql'].includes(databaseType)) {
            validationError('databaseType must be either mongodb or mysql');
        }

        if (typeof properties !== 'object') {
            validationError('properties must be an object');
        }

        await generateCrud(serviceName, databaseType, properties, description);
        const archiveFile = await archieveResult(serviceName);
        const expiredAt = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 23.5,
        );
        const publicUrl = await uploadToFirebase(
            `${archiveDir}/${archiveFile}.zip`,
            expiredAt,
        );
        removeArchieve();
        res.status(200).json({
            status: 'OK',
            data: {
                serviceName,
                databaseType,
                properties,
                description,
                archieve: {
                    name: archiveFile,
                    file: publicUrl,
                },
                expiredAt,
                createdAt: new Date(),
            },
        });
    } catch (error) {
        console.log('ERRROR', error);
        // next(error);
        const message = !error.status ? 'Internal Server Error' : error.message;
        res.status(error.status || 500).json({
            success: false,
            data: [],
            message,
        });
    }
}
