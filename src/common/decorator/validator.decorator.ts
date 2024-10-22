import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// INFO: Custom Decorator for byte checker(sms, lms, mms)
@ValidatorConstraint({ name: 'isByteLength', async: false })
export class IsByteLengthConstraint implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        if (text === undefined || text === null) {
            return false;
        }

        const byteLength = Buffer.byteLength(text, 'utf8');
        return byteLength <= (args.constraints[0] as number);
    }

    defaultMessage(args: ValidationArguments) {
        return `Message must be ${args.constraints[0] as number} bytes or fewer.`;
    }
}
