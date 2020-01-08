const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');


// i know, they're hardcoded, it's a demo
const THING_NAME = 'iot-demo-thing-LightSwitch-Device-W8NX19X0CBKG';
const ENDPOINT = 'ad78o9k6p57sk-ats.iot.us-east-1.amazonaws.com';

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: ENDPOINT,
});

const fetchReported = async () => {
    const result = await new Promise ((resolve, reject) => {

        Data.getThingShadow({
            thingName: THING_NAME,
        }, (err, data) => {
            if (err) {
                if (err.statusCode === 404) {
                    resolve({});
                } else {
                    reject(err);
                }
            } else {
                console.log(data);
                resolve(JSON.parse(data.payload));
            }
        });
    });
    return R.path(["state","reported"], result) || {};
};

exports.handler = async (event, context) => {
    const reported = await fetchReported();
    const status = reported.switch || false;
    return {
        statusCode: 200,
        body: JSON.stringify({switch: status ? "ON" : "OFF",}),
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS",
            "Access-Control-Allow-Methods" : "GET, OPTIONS",
            "Access-Control-Allow-Headers" : "*"
        }
    };
};

