import fs from 'fs';

export default () => {
    const env = `PORT=8001
DB_URI=your_db_uri
HOST=localhost
`;

    if (!fs.existsSync('/tmp/result')) {
        fs.mkdirSync('/tmp/result');
    }

    fs.writeFile(`/tmp/result/.env`, env, 'utf8', function (err) {
        if (err) {
            console.log('err', err);
        }
        console.log('ENV file was saved!');
    });
};
