import fs from 'fs';

export default (routes) => {
    const webRoutes = `
import { Router } from 'express';    
${(function () {
    let str = '';
    for (let i = 0; i < routes.length; i++) {
        str += `import ${routes[
            i
        ].toLowerCase()}Routes from '../routes/${routes[
            i
        ].toLowerCase()}Routes.js';\n`;
    }
    return str;
})()}

const Routes = () => {
    const router = Router();
    
    ${(function () {
        let str = '';
        for (let i = 0; i < routes.length; i++) {
            str += `router.use('/${routes[i].toLowerCase()}', ${routes[
                i
            ].toLowerCase()}Routes());\n`;
        }
        return str;
    })()}

    return router
}
export default Routes;
`;
    // `router.use('/${element.toLowerCase()}', ${element.toLowerCase()}Routes());`;

    if (!fs.existsSync('/tmp/result/src/routes')) {
        fs.mkdirSync('/tmp/result/src/routes');
    }

    fs.writeFile(
        `/tmp/result/src/routes/index.js`,
        webRoutes,
        'utf8',
        function (err) {
            if (err) {
                console.log('err', err);
            }
            console.log('The file was saved!');
        },
    );
};
