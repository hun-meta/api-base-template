import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

// 커스텀 로그 필터
const levelFilter = (level: string) =>
    winston.format((info) => {
        if (info.level === level) {
            return info;
        }
        return false;
    })();

const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.ms(),
    utilities.format.nestLike('API-AUTH', { prettyPrint: true }),
    winston.format.printf(({ timestamp, level, message, ms, context, ...meta }) => {
        const metaString = Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : '';
        return `[${process.env.NODE_ENV}] ${timestamp} [${level}] [${context}] ${message} ${ms} ${metaString}`;
    }),
);

// log lotation settings
const dailyOption = (level: string) => {
    return {
        level,
        datePattern: 'YYYY-MM-DD',
        dirname: `./logs/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 7,
        zippedArchive: true,
        format: winston.format.combine(levelFilter(level), customFormat),
    };
};

export const winstonLogger = WinstonModule.forRoot({
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.ms(),
                winston.format.errors({ stack: true }),
                winston.format.colorize(),
                customFormat,
            ),
        }),
        new winstonDaily({
            ...dailyOption('info'),
            level: 'info',
        }),
        new winstonDaily({
            ...dailyOption('warn'),
            level: 'warn',
        }),
        new winstonDaily({
            ...dailyOption('error'),
            level: 'error',
        }),
    ],
});
