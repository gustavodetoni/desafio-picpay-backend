import { UseCaseError } from "./use-case-error";

export class ResourceAlreadyExists extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`${resource} already exists`);
  }
}