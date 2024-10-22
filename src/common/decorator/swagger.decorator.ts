import { applyDecorators } from '@nestjs/common';
import {
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiParam,
    ApiBody,
    ApiHeader,
    ApiConsumes,
    ApiProduces,
    ApiQueryOptions,
    ApiResponseOptions,
    ApiParamOptions,
    ApiBodyOptions,
    ApiHeaderOptions,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseInfo } from '../response/types';

// INFO: Swagger api docs option interface
export interface SwaggerOptions {
    summary?: string;
    tags?: string[];
    queries?: ApiQueryOptions[];
    responses?: ApiResponseOptions[];
    params?: ApiParamOptions[];
    body?: ApiBodyOptions;
    headers?: ApiHeaderOptions[];
    consumes?: string[];
    produces?: string[];
    bearerAuth?: boolean;
}

// INFO: Swagger schema Creater for ApiResponseOptions
export function createBody(info: ResponseInfo, data: Object) {
    return {
        requestId: 'API Request UUID',
        responseInfo: info,
        data: data,
    };
}

// INFO: Swagger option object creater
export function createSwaggerOptions(options: Partial<SwaggerOptions>): SwaggerOptions {
    return options;
}

// INFO: Swagger Cutom Decorator
export function CustomSwaggerDecorator(options: SwaggerOptions) {
    const decorators = [
        ...(options.summary ? [ApiOperation({ summary: options.summary })] : []),
        ...(options.tags ? [ApiTags(...options.tags)] : []),
        ...(options.queries ? options.queries.map((query) => ApiQuery(query)) : []),
        ...(options.responses ? options.responses.map((response) => ApiResponse(response)) : []),
        ...(options.params ? options.params.map((param) => ApiParam(param)) : []),
        ...(options.body ? [ApiBody(options.body)] : []),
        ...(options.headers ? options.headers.map((header) => ApiHeader(header)) : []),
        ...(options.consumes ? [ApiConsumes(...options.consumes)] : []),
        ...(options.produces ? [ApiProduces(...options.produces)] : []),
        ...(options.bearerAuth ? [ApiBearerAuth()] : []), // Add ApiBearerAuth if bearerAuth is true
    ];
    return applyDecorators(...decorators);
}
