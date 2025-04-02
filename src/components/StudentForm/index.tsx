import React, { useState, useEffect, useRef } from 'react';
import { formatDate, formatDateForInput } from '@helpers/date-formatter';
import { Validator } from '@helpers/form-validation';
import { CloudinaryUploadService } from 'services/image-upload';
import { generateEnrollmentNumber } from '@helpers/enrollment-number-generator';
import { IStudent } from 'types/student';
import AvatarUpload from '@components/AvatarUpload';
import FormLabel from '@components/common/FormLabel';
import FormInput from '@components/common/FormInput';
import { Overlay } from '@components/common/Overlay';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { DEFAULT_AVATAR } from '@constants/avatar';
import { ICON_SRC } from '@constants/icon-src';
import { FORM_FIELDS } from '@constants/form-field';
import './index.css';

/**
 * StudentForm Component
 *
 * A form component for creating and editing student records.
 *
 * Features:
 * - Add/Edit student functionality
 * - Avatar upload with preview
 * - Form validation
 * - Auto-generated enrollment numbers
 * - Date formatting
 * - Error handling
 */
interface StudentFormViewProps {
  /** Callback function to save student data */
  onSave: (studentData: Partial<IStudent>) => void;
  /** Callback function for form cancellation */
  onCancel: () => void;
  /** Function to fetch all students (for validation) */
  getStudents?: () => Promise<IStudent[]>;
  /** Student data for edit mode */
  student?: IStudent;
  /** Controls form visibility */
  isOpen: boolean;
  /** Callback for closing the form */
  onClose: () => void;
}

const StudentForm = ({
  onSave,
  onCancel,
  getStudents,
  student,
  isOpen,
  onClose,
}: StudentFormViewProps) => {
  // Component state
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IStudent>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize form state based on mode (add/edit)
   * Handles:
   * - Setting edit mode
   * - Populating form data
   * - Generating enrollment number
   * - Clearing errors
   */
  useEffect(() => {
    if (isOpen) {
      if (student) {
        // Edit mode
        setIsEditMode(true);
        setCurrentStudentId(student.id || null);
        setFormData(student);
      } else {
        // Add new mode
        setIsEditMode(false);
        setCurrentStudentId(null);
        setFormData({});
        getEnrollmentNumber();
      }
      setSelectedAvatarFile(null);
      setTempAvatarUrl(null);
      setErrors({});
    }
  }, [isOpen, student]);

  // Cleanup temp URL when component unmounts or form closes
  useEffect(() => {
    return () => {
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl);
      }
    };
  }, [tempAvatarUrl]);

  /**
   * Handles clicks outside the form modal
   * Closes the form only when clicking the overlay
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not the form
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  /**
   * Generates a unique enrollment number for new students
   * Uses existing students list to ensure uniqueness
   */
  const getEnrollmentNumber = async () => {
    if (!getStudents) return;

    try {
      const students = await getStudents();
      const enrollNum = generateEnrollmentNumber(students);
      setFormData((prev) => ({ ...prev, enrollNum }));
    } catch (error) {
      console.error('Failed to generate enrollment number:', error);
    }
  };

  /**
   * Handles form input changes
   * Maps input IDs to student properties
   * Triggers validation for changed field
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Map input IDs to student properties
    const fieldMap: Record<string, keyof IStudent> = {
      name: 'name',
      email: 'email',
      phone: 'phoneNum',
      admission: 'dateAdmission',
    };

    const field = fieldMap[id] || (id as keyof IStudent);

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  };

  /**
   * Handles avatar file selection (not uploading yet)
   * Creates local preview and stores file for later upload
   */
  const handleFileSelect = (file: File | null) => {
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
  };

  /**
   * Validates individual form fields
   * Handles:
   * - Required fields
   * - Email format
   * - Duplicate email check
   * - Phone number format
   */
  const validateField = async (field: keyof IStudent, value: string) => {
    //Creates a partial student object with just the field being validated
    const partialStudent: Partial<IStudent> = { [field]: value };

    if (isEditMode && currentStudentId) {
      partialStudent.id = currentStudentId;
    }

    // Get all students if needed for email validation
    const allStudents = field === 'email' && getStudents ? await getStudents() : undefined;

    // Validate the field
    const { errors: fieldErrors } = Validator.validateForm(partialStudent, allStudents);

    // Update errors state (extracted common logic)
    updateFieldError(field, fieldErrors[field]);
  };

  /**
   * Updates the error state for a specific field
   * @param field - The field being validated
   * @param errorMessage - The error message (if any)
   */
  const updateFieldError = (field: keyof IStudent, errorMessage?: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[field] = errorMessage;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  /**
   * Handles form submission
   * Validates all fields
   * Formats data for submission
   * Triggers save callback if valid
   */
  const handleSubmit = async () => {
    // Validate all required fields before submission
    const allStudents = getStudents ? await getStudents() : [];

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
      return;
    }

    try {
      // Only now upload the avatar if there's a selected file and no validation errors
      if (selectedAvatarFile && !errors.avatar) {
        const imageUrl = await CloudinaryUploadService.uploadAvatar(selectedAvatarFile);
        studentData.avatar = imageUrl;
      }

      // If validation passed and avatar upload succeeded (if applicable), proceed with saving
      onSave(studentData);
      onClose();
    } catch (error) {
      console.error('Error during form submission:', error);
      setErrors((prev) => ({
        ...prev,
        avatar: error instanceof Error ? error.message : 'Failed to upload avatar',
      }));
    }
  };

  // Check if form has any errors
  const hasErrors = Object.keys(errors).length > 0;

  if (!isOpen) return null;

  //  Form Header component
  const FormHeader = () => (
    <div className="popup-header">
      <Text
        className="popup-header__title"
        text={isEditMode ? 'Edit Student' : 'Add New Student'}
        as="h2"
      />
      <Button className="close-btn" onClick={onClose}>
        {' '}
        &times;
      </Button>
    </div>
  );

  //Form Footer component
  const FormFooter = () => (
    <div className="popup-footer">
      {/* Cancel button */}
      <Button
        className="btn btn-cancel"
        onClick={() => {
          onCancel();
          onClose();
        }}
      >
        Cancel
      </Button>

      {/* Submit button with dynamic styling based on error state */}
      <Button
        className="btn btn-add"
        style={{
          backgroundColor: hasErrors ? 'var(--light-gray-color)' : 'var(--orange-color)',
          cursor: hasErrors ? 'not-allowed' : 'pointer',
        }}
        onClick={handleSubmit}
        disabled={hasErrors}
      >
        {isEditMode ? 'Update Student' : 'Add Student'}
      </Button>
    </div>
  );

  return (
    <Overlay onClick={handleOverlayClick}>
      <div className="popup-container" ref={formRef}>
        {/* Integrated Header */}
        <FormHeader />

        {/* Body */}
        <div className="popup-body">
          <AvatarUpload
            avatar={formData.avatar}
            previewUrl={tempAvatarUrl || undefined}
            onFileSelect={handleFileSelect}
            error={errors.avatar}
          />

          <form id="studentForm">
            {/* Mapped Form Fields */}
            {FORM_FIELDS.map((field) => (
              <div key={field.id} className="form-group">
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                <FormInput
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.valueKey as keyof IStudent] ?? ''}
                  onChange={handleInputChange}
                  disabled={field.disabled}
                />
                {errors[field.valueKey] && (
                  <div className="error-message">{errors[field.valueKey]}</div>
                )}
              </div>
            ))}

            {/* Date of Admission (With Calendar Icon) */}
            <div className="form-group">
              <FormLabel htmlFor="admission">Date of Admission</FormLabel>
              <FormInput
                id="admission"
                type="date"
                className="calendar-input"
                value={formData.dateAdmission ? formatDateForInput(formData.dateAdmission) : ''}
                onChange={handleInputChange}
                hasError={!!errors.dateAdmission}
                imgSrc={ICON_SRC.calendar.src}
                imgAlt={ICON_SRC.calendar.alt}
                imgClassName={ICON_SRC.calendar.className}
              />
              {errors.dateAdmission && <div className="error-message">{errors.dateAdmission}</div>}
            </div>
          </form>
        </div>

        {/* Integrated Footer */}
        <FormFooter />
      </div>
    </Overlay>
  );
};

export default StudentForm;
