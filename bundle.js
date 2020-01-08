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
b(config('switch'));

