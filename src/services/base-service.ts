/**
 * Custom error class that includes status code and response information
 */
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
/**
 * Generic type param T represents the resource type (e.g., IStudent, IUser, ICategory if we have in the future)
 * Generic type param ID represents the type of the identifier (usually string or number)
 */
export abstract class BaseService<T, ID = string> {
  /**
   * Base URL for the specific resource endpoint
   */
  protected readonly baseUrl: string;

  /**
   * Constructor to initialize the base URL for a specific resource
   * @param baseUrl - The base URL for the resource endpoint
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Retrieves all resources from the API
   * @returns a promise that resolves to an array of resources
   */
  abstract getAll(): Promise<T[]>;

  /**
   * Retrieves a single resource by its identifier
   * @param id - The unique identifier of the resource
   * @returns a promise that resolves to the resource or undefined if not found
   */
  abstract getById(id: ID): Promise<T | undefined>;

  /**
   * Creates a new resource
   * @param resource - The resource to create
   * @returns a promise that resolves to the created resource
   */
  abstract create(resource: T): Promise<T>;

  /**
   * Updates an existing resource
   * @param resource - The updated resource
   * @returns a promise that resolves to the updated resource
   */
  abstract update(resource: T): Promise<T>;

  /**
   * Deletes a resource by its identifier
   * @param id - The unique identifier of the resource
   * @returns a promise that resolves when the resource is deleted
   */
  abstract delete(id: ID): Promise<void>;

  /**
   * Handles API response
   * @param response - The fetch API response
   * @returns A promise that resolves to the parsed response data
   */
  protected async handleResponse<R>(response: Response): Promise<R> {
    if (!response.ok) {
      throw response;
    }
    return await response.json();
  }
  /**
   * Common error handling method that converts errors to ApiError
   * @param error - The error object
   * @param operation - Description of the operation that failed
   * @returns An ApiError instance
   */
  protected handleError(error: unknown, operation: string): ApiError {
    console.error(`Error during ${operation}:`, error);

    if (error instanceof Response) {
      return new ApiError(error.statusText || 'Request failed', error.status);
    }

    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(
        error.message.includes('NetworkError')
          ? 'Network error - please check your connection'
          : error.message,
      );
    }

    return new ApiError('An unexpected error occurred');
  }
}
