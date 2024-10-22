import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { EnvUndefinedError } from '../exception/errors';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// TODO: Edit RequestGuard after implemention of api-auth-sys
@Injectable()
export class RequestGuard implements CanActivate {
    private readonly apiKey: string;

    constructor(
        private reflector: Reflector,
        private configService: ConfigService,
    ) {
        this.apiKey = this.configService.get<string>('ID_API_KEY');
    }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        if (!this.apiKey) {
            throw new EnvUndefinedError(['API_KEY']);
        }

        const [type, token] = authorizationHeader.split(' ');

        if (type !== 'Bearer' || token !== this.apiKey) {
            throw new UnauthorizedException('Invalid API key');
        }

        return true;
    }
}
