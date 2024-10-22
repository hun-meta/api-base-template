import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from 'src/common/response/dto/base-response.dto';
import { ClsService } from 'nestjs-cls';
import { ControllerResponse } from '../dto/controller-response.dto';

// Global Interceptor for Creating BaseResponse with requestId
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // get Response to set http status
        const response = context.switchToHttp().getResponse();
        const requestId = this.cls.get('requestId');

        return next.handle().pipe(
            map((controllerResponse: ControllerResponse<any>) => {
                const { info, data } = controllerResponse;
                if (info && info.status) {
                    response.status(info.status);
                }

                return BaseResponse.create<any>(requestId, info, data);
            }),
        );
    }
}
