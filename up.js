const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');


// i know, they're hardcoded, it's a demo
const THING_NAME = 'iot-codecraft-thing-Garage-Device-GSBODF67Q7W0';
const ENDPOINT = 'ad78o9k6p57sk-ats.iot.us-east-1.amazonaws.com';

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: ENDPOINT,
});


const updateDesired = v => {
    const payload = { state: { desired: v } };
    return new Promise((resolve, reject) => {
        Data.updateThingShadow({
            thingName: THING_NAME,
            payload: JSON.stringify(payload)
        }, (err, data) => {
            if (err) reject(err);
            else resolve({});
        });
    });
};


exports.handler = async (event, context) => {
    const desiredBefore = await fetchDesired();
    const desired = { position: "UP" };
    await updateDesired(desired);
    return {
        statusCode: 200,
        body: JSON.stringify({}),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Allow": "POST, OPTIONS",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "*"
        }
    };
};

