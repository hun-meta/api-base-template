import { Injectable, Inject, Scope } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private context: string;

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    setContext(context: string) {
        this.context = context;
    }

    info(message: string) {
        this.logger.info(message, { context: this.context });
    }

    error(message: string, stack: string = undefined, meta: any = undefined) {
        this.logger.error(message, { context: this.context, stack, meta });
    }

    warn(message: string) {
        this.logger.warn(message, { context: this.context });
    }

    debug(message: string, value: any = undefined) {
        // this.logger.debug(message, { context: this.context, ...this.formatMeta(meta) });
        this.logger.debug(message, { context: this.context, value });
    }
}
