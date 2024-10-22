import { IsString } from 'class-validator';

export class GlobalErrorDto {
    @IsString()
    message: string;

    static create(message: string): GlobalErrorDto {
        const dto = new GlobalErrorDto();
        dto.message = message;
        return dto;
    }
}
