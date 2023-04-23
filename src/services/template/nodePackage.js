const nodePackage = (
    serviceName,
    serviceDescription,
    dependencies,
    devDependencies,
) => ({
    name: serviceName,
    version: '1.0.0',
    author: '',
    main: 'index.js',
    type: 'module',
    scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        start: 'node ./src/index.js',
        dev: 'nodemon ./src/index.js',
    },
    license: 'ISC',
    description: serviceDescription,
    dependencies,
    devDependencies,
});

export default nodePackage;
