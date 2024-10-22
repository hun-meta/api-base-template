import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseInfo } from '../types';

// API Response Value DTO
export class BaseResponse<T> {
    @IsString()
    requestId: string;

    @IsObject()
    responseInfo: ResponseInfo;

    @ValidateNested()
    @Type(() => Object)
    data: T;

    static create<T>(requestId: string, responseInfo: ResponseInfo, data: T): BaseResponse<T> {
        const response = new BaseResponse<T>();
        response.requestId = requestId;
        response.responseInfo = responseInfo;
        response.data = data;

        return response;
    }
}
