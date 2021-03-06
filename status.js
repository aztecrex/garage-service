const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');


// i know, they're hardcoded, it's a demo
const THING_NAME = 'iot-codecraft-thing-Garage-Device-GSBODF67Q7W0';
const ENDPOINT = 'ad78o9k6p57sk-ats.iot.us-east-1.amazonaws.com';

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: ENDPOINT,
});

const fetchDesired = async () => {
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
    return R.path(["state","desired"], result) || {};
};

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
    const desired = await fetchDesired();
    const reported = await fetchReported();
    const want = desired.position || 'UNKNOWN';
    const position = reported.position || 'UNKNOWN';
    return {
        statusCode: 200,
        body: JSON.stringify({position, want,}),
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS",
            "Access-Control-Allow-Methods" : "GET, OPTIONS",
            "Access-Control-Allow-Headers" : "*"
        }
    };
};

