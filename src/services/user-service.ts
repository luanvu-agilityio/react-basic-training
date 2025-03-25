import { BaseService } from './base-service';
import { IUser } from 'types/user';

/**
 * UserService class extends BaseService to manage users via the API
 */

export class UserService extends BaseService<IUser> {
  /**
   * Constructor to initialize the base URL for the user endpoint
   * @param baseUrl - The base URL for the user endpoint
   */
  constructor(baseUrl: string) {
    super(`${baseUrl}/users`);
  }

  /**
   * Retrieves all users from the API
   * @returns A promise that resolves to an array of users
   */
  async getAll(): Promise<IUser[]> {
    try {
      const response = await fetch(this.baseUrl);
      return this.handleResponse<IUser[]>(response);
    } catch (error) {
      throw this.handleError(error, 'retrieving users');
    }
  }

  /**
   * Retrieves a single user by ID
   * @param id - The unique identifier of the user
   * @returns A promise that resolves to the user or undefined if not found
   */

  async getById(id: string): Promise<IUser | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (response.status === 404) {
        return undefined;
      }
      return this.handleResponse<IUser>(response);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return undefined;
    }
  }

  /**
   * Creates a new user
   * @param user - The user to create
   * @returns A promise that resolves to the created user
   */
  async create(user: IUser): Promise<IUser> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return this.handleResponse<IUser>(response);
    } catch (error) {
      throw this.handleError(error, 'creating user');
    }
  }

  /**
   * Updates an existing user
   * @param user - The user to update
   * @returns A promise that resolves to the updated user
   */
  async update(user: IUser): Promise<IUser> {
    try {
      const response = await fetch(`${this.baseUrl}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return this.handleResponse<IUser>(response);
    } catch (error) {
      throw this.handleError(error, 'updating user');
    }
  }

  /**
   * Deletes a user by ID
   * @param id - The unique identifier of the user
   * @returns A promise that resolves when the user is deleted
   */
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
    } catch (error) {
      throw this.handleError(error, 'deleting user');
    }
  }

  /**
   * Authenticates a user by email and password
   * @param email - The user's email
   * @param password - The user's password
   * @returns A promise that resolves to the authenticated user or null if authentication fails
   */
  async authenticate(email: string, password: string): Promise<IUser | null> {
    try {
      // Query the API for users matching the email
      const response = await fetch(`${this.baseUrl}?email=${encodeURIComponent(email)}`);
      const users = await this.handleResponse<IUser[]>(response);

      // Find the user with matching credentials
      const authenticatedUser = users.find(
        (user) => user.email === email && user.password === password,
      );
      return authenticatedUser || null;
    } catch (error) {
      console.error('Authentication error', error);
      throw this.handleError(error, 'authenticating user');
    }
  }
}

/**
 * UserServiceEnvironment class provides a method to create a UserService instance
 */

export class UserServiceEnvironment {
  /**
   * Create an instance of UserService based on the availability of local or remote API
   * @returns A promise that resolves to an instance of UserService
   */
  static async create(): Promise<UserService> {
    // Import environment configuration from data-service
    const environment = {
      localApiUrl: 'http://localhost:3000',
      remoteApiUrl: 'https://crud-api-vuea.onrender.com',
    };

    // Test local JSON server first, then fall back to remote
    return fetch(`${environment.localApiUrl}/users`)
      .then(() => new UserService(environment.localApiUrl))
      .catch(() => {
        // Test remote API next
        return fetch(`${environment.remoteApiUrl}/users`)
          .then(() => new UserService(environment.remoteApiUrl))
          .catch(() => {
            // Fallback for API URL
            return new UserService(environment.remoteApiUrl);
          });
      });
  }
}

/**
 * Get the singleton instance of UserService
 * @returns A Promise that resolves to the singleton instance of UserService
 */

let userServiceInstance: UserService | null = null;
export const getUserService = async (): Promise<UserService> => {
  if (!userServiceInstance) {
    userServiceInstance = await UserServiceEnvironment.create();
  }
  return userServiceInstance;
};

/**
 * Initialize the user service and attach it to the window object for global access
 */
declare global {
  interface Window {
    userService: UserService;
  }
}

UserServiceEnvironment.create().then((service) => {
  window.userService = service;
});
