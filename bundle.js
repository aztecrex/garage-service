'use strict';

const bundle = require('lambundaler');

const presentationCfg = {
    entry: 'status.js',
    export: 'handler',
    output: 'lambda-build/status.zip',
    exclude: ['aws-sdk']
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
b(presentationCfg);

// bundle(presentationCfg, (err, buffer, artifacts) => {
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

