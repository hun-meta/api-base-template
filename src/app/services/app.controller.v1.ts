import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { SUCCESS_RES } from '../constants/response-info.constants';
import { Public } from 'src/common/request/request.guard';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { getDefaultResponseOpts, getHealthOpts } from '../swagger/swagger.metadata';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    @CustomSwaggerDecorator(getDefaultResponseOpts)
    getDefaultResponse(): ControllerResponse<DefaultDto> {
        const data = this.appService.getDefaultResponse();
        const response = ControllerResponse.create<DefaultDto>(SUCCESS_RES, data);

        return response;
    }

    @Public()
    @Get('v1/health')
    @CustomSwaggerDecorator(getHealthOpts)
    getHealth(): ControllerResponse<HealthCheckDto> {
        const data = this.appService.getHealth();
        const response = ControllerResponse.create<HealthCheckDto>(SUCCESS_RES, data);

        return response;
    }
}
