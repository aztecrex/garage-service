'use strict';

const bundle = require('lambundaler');

// const statusConfig = {
//     entry: 'status.js',
//     export: 'handler',
//     output: 'lambda-build/status.zip',
//     minify: true,
//     exclude: ['aws-sdk', 'aws-sdk/clients/iotdata']
// };

const config = name => {
    return {
        entry: `${name}.js`,
        export: 'handler',
        output: `lambda-build/${name}.zip`,
        minify: true,
        exclude: ['aws-sdk', 'aws-sdk/clients/iotdata']
    };
};

const b = (cfg) => {
    bundle(cfg, (err, buffer, artifacts) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`bundled: ${cfg.output}`);
    });

}
b(config('status'));
b(config('operate'));
b(config('up'));
b(config('down'));

// bundle(statusConfig, (err, buffer, artifacts) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log(`bundled: ${presentationCfg.output}`);
// });

// bundler({
//     entry: 'controller.js',
//     export: 'handle',
//     output: 'lambda-build/controller.zip',
//     exclude: ['aws-sdk']
// }, (err, buffer, artifacts) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("bundled: 'controller.zip'");
// });

// bundler({
//     entry: 'power.js',
//     export: 'handle',
//     output: 'lambda-build/power.zip',
//     exclude: ['aws-sdk']
// }, (err, buffer, artifacts) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("bundled: 'power.zip'");
// });

// bundler({
//     entry: 'matrix.js',
//     export: 'handle',
//     output: 'lambda-build/matrix.zip',
//     exclude: ['aws-sdk']
// }, (err, buffer, artifacts) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("bundled: 'matrix.zip'");
// });

