
exports.handler = function (event, context) {
    console.log('i was bundled');
    context.succeed({
        statusCode: 200,
        body: JSON.stringify({position: 'Unknown', want: 'DOWN',}),
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS",
            "Access-Control-Allow-Methods" : "GET, OPTIONS",
            "Access-Control-Allow-Headers" : "*"
        }
    });
};


