import { useState, useCallback } from 'react';
import { IStudent } from 'types/student';
import { Validator } from '@utils/form-validation';
import { CloudinaryUploadService } from '@services/image-upload';
import { DEFAULT_AVATAR } from '@constants/avatar';
import { formatDate } from '@utils/date-formatter';
import { generateEnrollmentNumber } from '@utils/enrollment-number-generator';

/**
 * Custom hook for managing student form state and operations
 */
export const useStudentForm = (
  allStudents: IStudent[],
  saveStudent: (studentData: Partial<IStudent>) => Promise<boolean>,
) => {
  // Form state
  const [formData, setFormData] = useState<Partial<IStudent>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);

  /**
   * Generates a unique enrollment number for new students
   */
  const getEnrollmentNumber = useCallback(async () => {
    try {
      const enrollNum = generateEnrollmentNumber(allStudents);
      setFormData((prev) => ({ ...prev, enrollNum }));
    } catch (error) {
      console.error('Failed to generate enrollment number:', error);
    }
  }, [allStudents]);

  /**
   * Initialize form state based on mode (add/edit)
   */
  const initializeForm = useCallback(
    (selectedStudent?: IStudent) => {
      if (selectedStudent) {
        // Edit mode
        setIsEditMode(true);
        setCurrentStudentId(selectedStudent.id || null);
        setFormData(selectedStudent);
      } else {
        // Add new mode
        setIsEditMode(false);
        setCurrentStudentId(null);
        setFormData({});
        getEnrollmentNumber();
      }

      // Reset avatar-related state
      setSelectedAvatarFile(null);
      setTempAvatarUrl(null);
      setErrors({});
    },
    [getEnrollmentNumber],
  );

  /**
   * Updates the error state for a specific field
   */
  const updateFieldError = useCallback((field: keyof IStudent, errorMessage?: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[field] = errorMessage;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  }, []);

  /**
   * Validates individual form fields
   */
  const validateField = useCallback(
    async (field: keyof IStudent, value: string) => {
      //Creates a partial student object with just the field being validated
      const partialStudent: Partial<IStudent> = { [field]: value };

      if (isEditMode && currentStudentId) {
        partialStudent.id = currentStudentId;
      }

      // Validate the field
      const { errors: fieldErrors } = Validator.validateForm(partialStudent, allStudents);

      // Update errors state
      updateFieldError(field, fieldErrors[field]);
    },
    [allStudents, currentStudentId, isEditMode, updateFieldError],
  );

  /**
   * Handles form input changes
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      // Map input IDs to student properties
      const fieldMap: Record<string, keyof IStudent> = {
        name: 'name',
        email: 'email',
        phone: 'phoneNum',
        admission: 'dateAdmission',
      };

      const field = fieldMap[name] || (name as keyof IStudent);

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      validateField(field, value);
    },
    [validateField],
  );

  /**
   * Handles avatar file selection
   */
  const handleFileSelect = useCallback(
    (file: File | null) => {
      // Clear any previous errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors['avatar'];
        return newErrors;
      });

      // Clear previous temp URL if exists
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl);
        setTempAvatarUrl(null);
      }

      if (!file) {
        setSelectedAvatarFile(null);
        return;
      }

      // Validate file before creating preview
      try {
        CloudinaryUploadService.validateFile(file);

        // Store file for later upload
        setSelectedAvatarFile(file);

        // Create temporary local preview
        const localPreviewUrl = URL.createObjectURL(file);
        setTempAvatarUrl(localPreviewUrl);
      } catch (error) {
        console.error('Avatar validation failed', error);
        setErrors((prev) => ({
          ...prev,
          avatar: error instanceof Error ? error.message : 'Invalid file',
        }));
      }
    },
    [tempAvatarUrl],
  );

  /**
   * Form submission handler
   * Returns true if submission was successful, false otherwise
   */
  const handleSubmitForm = useCallback(async (): Promise<boolean> => {
    // Create the final student data object for validation
    const studentData: Partial<IStudent> = {
      ...formData,
      avatar: formData.avatar ?? DEFAULT_AVATAR,
    };

    // Format date for submission if it exists
    if (formData.dateAdmission) {
      const date = new Date(formData.dateAdmission);
      studentData.dateAdmission = formatDate(date);
    }

    // Add ID if in edit mode
    if (currentStudentId) {
      studentData.id = currentStudentId;
    }

    // Validate all fields at once
    const { isValid, errors: validationErrors } = Validator.validateForm(studentData, allStudents);

    if (!isValid) {
      //Update error state with all validation errors
      setErrors(validationErrors);
      // Stop submission if validation fails
      return false;
    }

    try {
      // Only now upload the avatar if there's a selected file and no validation errors
      if (selectedAvatarFile && !errors.avatar) {
        const imageUrl = await CloudinaryUploadService.uploadAvatar(selectedAvatarFile);
        studentData.avatar = imageUrl;
      }

      // If validation passed and avatar upload succeeded (if applicable), proceed with saving
      return await saveStudent(studentData);
    } catch (error) {
      console.error('Error during form submission:', error);
      setErrors((prev) => ({
        ...prev,
        avatar: error instanceof Error ? error.message : 'Failed to upload avatar',
      }));
      return false;
    }
  }, [formData, currentStudentId, allStudents, errors.avatar, selectedAvatarFile, saveStudent]);

  return {
    formData,
    errors,
    tempAvatarUrl,
    isEditMode,
    currentStudentId,
    handleInputChange,
    handleFileSelect,
    initializeForm,
    handleSubmitForm,
  };
};
