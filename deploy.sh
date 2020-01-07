#!/usr/bin/env bash


function deploy() {
    local fname="$2"
    local bundle="$1"
    aws lambda update-function-code \
            --function-name "${fname}" \
            --zip-file fileb://lambda-build/${bundle}.zip
    aws lambda update-function-configuration \
            --function-name "${fname}" \
            --handler ${bundle}.handler

}

# these shouldn't be hardcoded
deploy status garageapicomputeC305D6AA-status13EA9EF7-1VBPQGD29GGKS
deploy operate garageapicomputeC305D6AA-operate1B290FF5-TLEW1O71TS71
deploy up garageapicomputeC305D6AA-up7BE735C4-1D72GSBRECRLM
deploy down garageapicomputeC305D6AA-downBE5BAE9F-1JN46IP20R1ZW


# aws lambda update-function-code --function-name garageapicomputeC305D6AA-status13EA9EF7-1VBPQGD29GGKS --zip-file fileb://lambda-build/status.zip
# aws lambda update-function-configuration --function-name garageapicomputeC305D6AA-status13EA9EF7-1VBPQGD29GGKS --handler status.handler
# aws lambda update-function-code --function-name garageapicomputeC305D6AA-operate1B290FF5-TLEW1O71TS71 --zip-file fileb://lambda-build/operate.zip
# aws lambda update-function-configuration --function-name garageapicomputeC305D6AA-operate1B290FF5-TLEW1O71TS71 --handler operate.handler


# garageapicomputeC305D6AA.LambdaFunupNaN = garageapicomputeC305D6AA-up7BE735C4-1D72GSBRECRLM
# garageapicomputeC305D6AA.LambdaFundownNaN = garageapicomputeC305D6AA-downBE5BAE9F-1JN46IP20R1ZW
# garageapicomputeC305D6AA.ExportsOutputFnGetAttoperate1B290FF5Arn2E4CF341 = arn:aws:lambda:us-east-1:299766559344:function:garageapicomputeC305D6AA-operate1B290FF5-TLEW1O71TS71
# garageapicomputeC305D6AA.ExportsOutputFnGetAttdownBE5BAE9FArn0CE9C927 = arn:aws:lambda:us-east-1:299766559344:function:garageapicomputeC305D6AA-downBE5BAE9F-1JN46IP20R1ZW
# garageapicomputeC305D6AA.ExportsOutputFnGetAttstatus13EA9EF7Arn10CCB6FE = arn:aws:lambda:us-east-1:299766559344:function:garageapicomputeC305D6AA-status13EA9EF7-1VBPQGD29GGKS
