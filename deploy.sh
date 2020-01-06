#!/usr/bin/env bash

# these shouldn't be hardcoded
aws lambda update-function-code --function-name garageapicomputeC305D6AA-status13EA9EF7-1VBPQGD29GGKS --zip-file fileb://lambda-build/status.zip
aws lambda update-function-configuration --function-name garageapicomputeC305D6AA-status13EA9EF7-1VBPQGD29GGKS --handler status.handler
aws lambda update-function-code --function-name garageapicomputeC305D6AA-operate1B290FF5-TLEW1O71TS71 --zip-file fileb://lambda-build/operate.zip
aws lambda update-function-configuration --function-name garageapicomputeC305D6AA-operate1B290FF5-TLEW1O71TS71 --handler operate.handler

