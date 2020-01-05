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


// const updateDesired = v => {
//     const payload = {state: {desired: v}};
//     return new Promise((resolve, reject) => {
//         Data.updateThingShadow({
//             thingName: ThingName,
//             payload: JSON.stringify(payload)
//         }, (err, data) => {
//             if (err) reject(err);
//             else resolve({});
//         });
//     });
// };

// const advance = async () => {
//     const curDesired = await fetchDesired()
//         .catch(err => {console.error(err); return {}});
//     const current = curDesired.slide || 1;
//     console.log(current);
//     await updateDesired({slide: Math.min(NumSlides, current + 1)});
// };

// const retreat = async () => {
//     const curDesired = await fetchDesired()
//         .catch(err => {console.error(err); return {}});
//     const current = curDesired.slide || 1;
//     console.log(current);
//     updateDesired({slide: Math.max(1, current - 1)});
// };

// const togglePresentation = async () => {
//     const curDesired = await fetchDesired()
//         .catch(err => {console.error(err); return {}});
//     const current = curDesired.presenting || false;
//     updateDesired({presenting: !current});
// };


// here's what the message from the button looks like
// {
//     "serialNumber": "GXXXXXXXXXXXXXXXXX",
//     "batteryVoltage": "xxmV",
//     "clickType": "SINGLE" | "DOUBLE" | "LONG"
// }

// const SINGLE="SINGLE";
// const DOUBLE="DOUBLE";
// const LONG="LONG";
// const UNKNOWN = "unknown";


// const eventAction = (evt = {}) => {
//     return evt.clickType || UNKNOWN;
// };

// const dispatch = action => {
//     switch (action) {
//         case SINGLE:    return advance();
//         case DOUBLE:    return retreat();
//         case LONG:      return togglePresentation();
//         default:        return Promise.resolve({});
//     }

// };

// const handle = async (event, context, callback) => {

//     await dispatch(eventAction(event))
//             .catch(console.error);
//     callback(null,{});

// };

// module.exports.handle=handle;
