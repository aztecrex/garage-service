const IoTData = require('aws-sdk/clients/iotdata');
const R = require('ramda');


// i know, they're hardcoded, it's a demo
const THING_NAME = 'iot-codecraft-thing-Garage-Device-GSBODF67Q7W0';
const ENDPOINT = 'ad78o9k6p57sk-ats.iot.us-east-1.amazonaws.com';
const OP_TOPIC = 'control/' + THING_NAME + '/operate';

const Data = new IoTData({
    region: 'us-east-1',
    endpoint: ENDPOINT,
});

const fetchDesired = async () => {
    const result = await new Promise((resolve, reject) => {

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
    return R.path(["state", "desired"], result) || {};
};

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

const issueOperate = v => {
    return new Promise((resolve, reject) => {
        Data.publish({
            topic: OP_TOPIC,
        }, (err, data) => {
            if (err) reject(err);
            else resolve({});
        });
    });
};

exports.handler = async (event, context) => {
    const desiredBefore = await fetchDesired();
    const wanted = desiredBefore.position || 'UNKNOWN';
    const want = wanted === 'UP' ? 'DOWN' : 'UP';
    const desired = { position: want };
    await issueOperate();
    await updateDesired(desired);
    return {
        statusCode: 200,
        body: JSON.stringify({}),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Allow": "GET, OPTIONS",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*"
        }
    };
};



