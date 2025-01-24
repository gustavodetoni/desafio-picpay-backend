export abstract class AuthorizationService {
    abstract authorize(): Promise<boolean>;
}