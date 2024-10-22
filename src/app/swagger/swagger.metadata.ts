// swagger.metadata.ts
import { createBody, createSwaggerOptions } from '../../common/decorator/swagger.decorator';
import { SUCCESS_RES } from '../constants/response-info.constants';

export const getDefaultResponseOpts = createSwaggerOptions({
    summary: 'return datetime, for testing server(Default Path)',
    responses: [
        {
            status: 200,
            description: 'request success',
            schema: {
                example: createBody(SUCCESS_RES, {
                    responseStr: 'Welcome to API - Auth\n<DateTime>',
                }),
            },
        },
    ],
});

export const getHealthOpts = createSwaggerOptions({
    summary: 'AWS Health Check Path',
    responses: [
        {
            status: 200,
            description: 'request success',
            schema: {
                example: createBody(SUCCESS_RES, { responseStr: '<DateTime>' }),
            },
        },
    ],
});
