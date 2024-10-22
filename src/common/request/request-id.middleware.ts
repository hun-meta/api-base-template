import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ClsService } from 'nestjs-cls';
import { LoggerService } from '../logger/logger.service';

// INFO:
// RequestIdMiddleWare는 매 요청마다 고유한 ID를 생성, cls를 통해서 저장한다.
// HTTP 요청 관련 정보 로깅, 요청 처리 완료/실패 시 로깅
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    constructor(
        private readonly cls: ClsService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(RequestIdMiddleware.name);
    }

    use(req: Request, res: Response, next: NextFunction) {
        const requestId = uuidv4();
        this.cls.set('requestId', requestId);

        let logMessage = `Request Start - ID: ${requestId}, Host: ${req.hostname}, Path: ${req.path}, IP: ${req.ip}`;
        if (req.method === 'GET') {
            logMessage += `, Query: ${JSON.stringify(req.query)}`;
        } else if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
            logMessage += `, Body: ${JSON.stringify(req.body)}`;
        }
        this.logger.info(logMessage);

        res.on('finish', () => {
            // request processed
            this.logger.info(`Request Finished - ID: ${requestId}`);
        });

        res.on('close', () => {
            // request closed by Client OR Server
            this.logger.info(`Request Closed - ID: ${requestId}`);
        });

        res.on('error', (err) => {
            // request failed by Error
            this.logger.info(`Request Error - ID: ${requestId}, Error: ${err.message}`);
        });

        next();
    }
}
