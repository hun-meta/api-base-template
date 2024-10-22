import { ResponseInfo } from '../../response/types';

// server error
export const INTERNAL_SERVER_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 5000,
    message: 'INTERNAL_SERVER_ERROR',
};

// request resource or function not ready error
export const NOT_IMPLEMENTED: ResponseInfo = {
    status: 501,
    returnCode: 501,
    message: 'NOT_IMPLEMENTED',
};

// request service not available at the moment error
export const SERVICE_UNAVAILABLE: ResponseInfo = {
    status: 503,
    returnCode: 503,
    message: 'SERVICE_UNAVAILABLE',
};

// request parameter error
export const BAD_REQUEST: ResponseInfo = {
    status: 400,
    returnCode: 4000,
    message: 'BAD_REQUEST',
};

// request Authorization invalid? error
export const UNAUTHORIZED: ResponseInfo = {
    status: 401,
    returnCode: 4001,
    message: 'UNAUTHORIZED',
};

// request resource not enough permission error
export const FORBIDDEN: ResponseInfo = {
    status: 403,
    returnCode: 4003,
    message: 'FORBIDDEN',
};

// request resource not found error
export const NOT_FOUND: ResponseInfo = {
    status: 404,
    returnCode: 4004,
    message: 'BAD_REQUEST',
};

// request resource already exists? error
export const CONFLICT: ResponseInfo = {
    status: 409,
    returnCode: 4009,
    message: 'CONFLICT',
};

// request resource deprecated? error
export const GONE: ResponseInfo = {
    status: 410,
    returnCode: 4010,
    message: 'GONE',
};

// request payload exceed limit error
export const PAYLOAD_TOO_LARGE: ResponseInfo = {
    status: 413,
    returnCode: 4013,
    message: 'PAYLOAD_TOO_LARGE',
};

// request media type unsupported error
export const UNSUPPORTED_MEDIA_TYPE: ResponseInfo = {
    status: 415,
    returnCode: 4015,
    message: 'UNSUPPORTED_MEDIA_TYPE',
};

// request can not be processed error
export const UNPROCESSABLE_ENTITY: ResponseInfo = {
    status: 422,
    returnCode: 4022,
    message: 'UNPROCESSABLE_ENTITY',
};
