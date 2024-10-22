import { ResponseInfo } from '../types';
import { IsObject } from 'class-validator';

// Controller Return Value DTO
export class ControllerResponse<T> {
    @IsObject()
    info: ResponseInfo;

    @IsObject()
    data: T;

    static create<T>(info: ResponseInfo, data: T): ControllerResponse<T> {
        const response = new ControllerResponse<T>();
        response.info = info;
        response.data = data;

        return response;
    }
}
