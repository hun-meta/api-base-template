import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { winstonLogger } from './logger.config';

@Global()
@Module({
    imports: [winstonLogger],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class GlobalLoggerModule {}
