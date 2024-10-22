import { Injectable } from '@nestjs/common';
import { DefaultDto, HealthCheckDto } from '../dtos/default.dto';

@Injectable()
export class AppService {
    constructor() {}

    getDefaultResponse(): DefaultDto {
        const welcomeStr = 'Welcome to API - Auth\n';
        const currentDate = new Date();
        const curDatetime = currentDate.toISOString();
        const responseStr = welcomeStr + curDatetime;

        return DefaultDto.create(responseStr);
    }

    getHealth(): HealthCheckDto {
        const currentDate = new Date();
        const curDatetime = currentDate.toISOString();

        return HealthCheckDto.create(curDatetime);
    }
}
