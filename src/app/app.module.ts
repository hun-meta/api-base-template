import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './services/app.controller.v1';
import { AppService } from './services/app.service';
import { IdModule } from 'src/id/id.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionsFilter } from 'src/common/exception/global-exception.filter';
import { RequestGuard } from 'src/common/request/request.guard';
import { ResponseInterceptor } from 'src/common/response/interceptor/response.interceptor';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from 'src/common/request/request-id.middleware';
import { GlobalLoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true },
        }),
        ConfigModule.forRoot({
            envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
            isGlobal: true,
        }),
        GlobalLoggerModule,
        IdModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: RequestGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        AppService,
    ],
    exports: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ClsMiddleware, RequestIdMiddleware) // ClsMiddleware가 먼저 동작하도록 설정
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
