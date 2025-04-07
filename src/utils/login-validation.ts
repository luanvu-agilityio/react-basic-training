import { EMAIL_REGEX } from '@constants/regex';
import { LOGIN_ERROR_MESSAGES } from '@constants/login-error-message';

/**
 * Form validation utilities
 *
 * This module provides reusable validation functions for form inputs,
 * particularly focusing on authentication-related validations.
 */

export interface FormErrors {
  [key: string]: string;
}

/**
 * Validates email format using regex
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

/**
 * Validates password requirements
 * @param password - Password to validate
 * @param minLength - Minimum required length (default: 6)
 * @returns boolean indicating if password is valid
 */
export const isValidPassword = (password: string, minLength = 6): boolean =>
  password.length >= minLength;

/**
 * Validates if a field is empty
 * @param value - Field value to check
 * @returns boolean indicating if field is empty
 */
export const isFieldEmpty = (value: string): boolean => !value?.trim();

/**
 * Validates login form fields
 * @param email - Email value
 * @param password - Password value
 * @returns Object containing validation errors and isValid flag
 */
export const validateLoginForm = (
  email: string,
  password: string,
): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {};

  // Email validation
  if (isFieldEmpty(email)) {
    errors.email = LOGIN_ERROR_MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(email.trim())) {
    errors.email = LOGIN_ERROR_MESSAGES.EMAIL_INVALID;
  }

  // Password validation
  if (isFieldEmpty(password)) {
    errors.password = LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED;
  } else if (!isValidPassword(password)) {
    errors.password = LOGIN_ERROR_MESSAGES.PASSWORD_LENGTH;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

/**
 * Generic form validator that takes field validators
 * @param fields - Object containing field values
 * @param validators - Object containing validation functions for each field
 * @returns Object containing validation errors and isValid flag
 */
export const validateForm = <T extends Record<string, unknown>>(
  fields: T,
  validators: { [K in keyof T]?: (value: T[K]) => string | null },
): { errors: FormErrors; isValid: boolean } => {
  const errors = Object.entries(validators).reduce((acc, [field, validator]) => {
    if (!validator) return acc;

    const error = validator(fields[field]);
    if (error) acc[field] = error;

    return acc;
  }, {} as FormErrors);

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
