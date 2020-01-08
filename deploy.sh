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
deploy switch garageapicomputeC305D6AA-switch6A58E20C-HB5HADL1TBY5

