// General 9000~9999

import { BASE_EXCEPTION } from './constants/exception-name.constants';

// Any Error instances that I didn't Expected. (Must handle it after Error occured)
export class CustomUnExpectedError extends Error {
    code: number;

    constructor(error: Error) {
        super(error.message);
        this.name = BASE_EXCEPTION.UNEXPECTED;
        this.stack = error.stack || null;
    }
}

// Catched thing which is not Defined.
export class CustomUndefinedError extends Error {
    code: number;

    constructor(error: any) {
        super(`Custom Undefined Error: ${error}`);
        this.name = BASE_EXCEPTION.UNDEFINED;

        // Set Prototype for "instanceof CustomUndefinedError"
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

// env variable is not Defined.
export class EnvUndefinedError extends Error {
    code: number;

    constructor(envNames: string[]) {
        super(`Env Undefined Error: ${envNames.join(', ')}`);
        this.name = BASE_EXCEPTION.ENV;

        // Set Prototype for "instanceof CustomUndefinedError"
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
