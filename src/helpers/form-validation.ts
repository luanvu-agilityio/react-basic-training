import { IStudent } from '../types/student';
import { FORM_ERROR_MESSAGES } from '../constants/form-error-message';
import { EMAIL_REGEX, NAME_REGEX, ENROLL_REGEX, PHONE_REGEX } from '@constants/regex';
/**
 * Validator class provides static methods for validating student form fields.
 */
export class Validator {
  static readonly MAX_NAME_LENGTH: number = 50;
  static readonly MAX_EMAIL_LENGTH: number = 50;

  static validateEmail(email: string | undefined): boolean {
    const value = email ?? '';
    if (value.length > this.MAX_EMAIL_LENGTH) return false;
    const emailRegex = EMAIL_REGEX;
    return emailRegex.test(value);
  }

  /**
   * Validates a phone number.
   * @param phone - The phone number to validate.
   * @returns True if the phone number is valid, otherwise false.
   */
  static validatePhone(phone: string | undefined): boolean {
    const value = phone ?? '';
    // Remove all whitespace first
    const trimmedPhone = value.replace(/\s+/g, '');
    // Check if it starts with an optional + and has 10-15 digits
    const phoneRegex = PHONE_REGEX;
    return phoneRegex.test(trimmedPhone);
  }

  /**
   * Validates if a value is not empty.
   * @param value - The value to validate.
   * @returns True if the value is not empty, otherwise false.
   */
  static validateRequired(value: string | undefined): boolean {
    return !!(value ?? '').trim();
  }

  /**
   * Validates an enrollment number.
   * @param enrollNum - The enrollment number to validate.
   * @returns True if the enrollment number is valid, otherwise false.
   */
  static validateEnrollmentNumber(enrollNum: string | undefined): boolean {
    const value = enrollNum ?? '';
    const enrollRegex = ENROLL_REGEX;
    return enrollRegex.test(value);
  }

  /**
   * Validates a name.
   * @param name - The name to validate.
   * @returns True if the name is valid, otherwise false.
   */
  static validateName(name: string | undefined): boolean {
    const value = name ?? '';
    if (value.length > this.MAX_NAME_LENGTH) return false;
    const nameRegex = NAME_REGEX;
    return nameRegex.test(value);
  }

  /**
   * Validates a date.
   * @param date - The date to validate.
   * @returns True if the date is valid and not in the future, otherwise false.
   */
  static validateDate(date: string | undefined): boolean {
    const value = date ?? '';
    const inputDate = new Date(value);
    const today = new Date();
    return !isNaN(inputDate.getTime()) && inputDate <= today;
  }

  /**
   * Validates a student form.
   * @param student - The student data to validate.
   * @param existingStudents - An optional array of existing students to check for uniqueness.
   * @returns An object containing the validation result and any validation errors.
   */
  static validateForm(
    student: Partial<IStudent>,
    existingStudents: IStudent[] = [],
  ): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    this.validateNameField(student.name, errors);
    this.validateEmailField(student, existingStudents, errors);
    this.validatePhoneField(student.phoneNum, errors);
    this.validateEnrollmentField(student, existingStudents, errors);
    this.validateDateAdmissionField(student.dateAdmission, errors);

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  private static validateNameField(name: string | undefined, errors: Record<string, string>): void {
    if (!this.validateRequired(name)) {
      errors.name = FORM_ERROR_MESSAGES.REQUIRED.NAME;
    } else if (!this.validateName(name)) {
      errors.name =
        (name?.length ?? 0) > this.MAX_NAME_LENGTH
          ? `Maximum ${this.MAX_NAME_LENGTH} characters allowed`
          : FORM_ERROR_MESSAGES.INVALID.NAME;
    }
  }

  private static validateEmailField(
    student: Partial<IStudent>,
    existingStudents: IStudent[],
    errors: Record<string, string>,
  ): void {
    if (!this.validateRequired(student.email)) {
      errors.email = FORM_ERROR_MESSAGES.REQUIRED.EMAIL;
    } else if (!this.validateEmail(student.email)) {
      errors.email =
        (student.email?.length ?? 0) > this.MAX_EMAIL_LENGTH
          ? `Maximum ${this.MAX_EMAIL_LENGTH} characters allowed.`
          : FORM_ERROR_MESSAGES.INVALID.EMAIL;
    } else if (
      existingStudents.length &&
      !this.validateUniqueEmail(student.email!, existingStudents, student.id)
    ) {
      errors.email = FORM_ERROR_MESSAGES.DUPLICATE.EMAIL;
    }
  }

  private static validatePhoneField(
    phone: string | undefined,
    errors: Record<string, string>,
  ): void {
    if (!this.validateRequired(phone)) {
      errors.phoneNum = FORM_ERROR_MESSAGES.REQUIRED.PHONE;
    } else if (!this.validatePhone(phone)) {
      errors.phoneNum = FORM_ERROR_MESSAGES.INVALID.PHONE;
    }
  }

  private static validateEnrollmentField(
    student: Partial<IStudent>,
    existingStudents: IStudent[],
    errors: Record<string, string>,
  ): void {
    if (!student.id) return;

    if (!this.validateRequired(student.enrollNum)) {
      errors.enrollNum = FORM_ERROR_MESSAGES.REQUIRED.ENROLL_NUM;
    } else if (!this.validateEnrollmentNumber(student.enrollNum)) {
      errors.enrollNum = FORM_ERROR_MESSAGES.INVALID.ENROLL_NUM;
    } else if (
      existingStudents.length &&
      !this.validateUniqueEnrollmentNumber(student.enrollNum!, existingStudents, student.id)
    ) {
      errors.enrollNum = FORM_ERROR_MESSAGES.DUPLICATE.ENROLL_NUM;
    }
  }

  private static validateDateAdmissionField(
    date: string | undefined,
    errors: Record<string, string>,
  ): void {
    if (!this.validateRequired(date)) {
      errors.dateAdmission = FORM_ERROR_MESSAGES.REQUIRED.DATE_ADMISSION;
    } else if (!this.validateDate(date)) {
      errors.dateAdmission = FORM_ERROR_MESSAGES.INVALID.DATE;
    }
  }

  /**
   * Validates if an email is unique among existing students.
   * @param email - The email to validate.
   * @param existingStudents - The array of existing students.
   * @param currentStudentId - The ID of the current student being validated
   * @returns True if the email is unique, otherwise false.
   */
  static validateUniqueEmail(
    email: string,
    existingStudents: IStudent[],
    currentStudentId?: string,
  ): boolean {
    return !existingStudents.some(
      (student) => student.email === email && student.id !== currentStudentId,
    );
  }

  /**
   * Validates if an enrollment number is unique among existing students.
   * @param enrollNum - The enrollment number to validate.
   * @param existingStudents - The array of existing students.
   * @param currentStudentId - The ID of the current student being validated
   * @returns True if the enrollment number is unique, otherwise false.
   */
  static validateUniqueEnrollmentNumber(
    enrollNum: string,
    existingStudents: IStudent[],
    currentStudentId?: string,
  ): boolean {
    return !existingStudents.some(
      (student) => student.enrollNum === enrollNum && student.id !== currentStudentId,
    );
  }
}
