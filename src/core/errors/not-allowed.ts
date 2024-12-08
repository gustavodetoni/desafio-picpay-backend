import { UseCaseError } from "./use-case-error";

export class NotAllowedError extends Error implements UseCaseError {
    constructor(message: string = 'Not allowed') {	
        super(message);
    }
}