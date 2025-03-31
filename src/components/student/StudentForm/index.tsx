import React, { useState, useEffect, useRef } from 'react';
import { formatDate, formatDateForInput } from '@helpers/date-formatter';
import { Validator } from '@helpers/form-validation';
import { CloudinaryUploadService } from 'services/image-upload';
import { generateEnrollmentNumber } from '@helpers/enrollment-number-generator';
import { IStudent } from 'types/student';
import FormHeader from './Header';
import AvatarUpload from './AvatarUpload';
import FormFooter from './Footer';
import './index.css';
import { FormLabel } from '@components/common/Label';
import FormInput from '@components/common/FormInput';
import InputWithIcon from '@components/common/FormInputWithIcon';
import { Overlay } from '@components/common/Overlay';

/**
 * StudentForm Component
 *
 * A comprehensive form component for creating and editing student records.
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

const StudentForm: React.FC<StudentFormViewProps> = ({
  onSave,
  onCancel,
  getStudents,
  student,
  isOpen,
  onClose,
}) => {
  // Component state
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IStudent>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      setErrors({});
    }
  }, [isOpen, student]);

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
   * Handles avatar image upload
   * Uploads to Cloudinary and updates form state
   * Handles upload errors
   */
  const handleFileUpload = async (file: File) => {
    try {
      const imageUrl = await CloudinaryUploadService.uploadAvatar(file);
      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
      setErrors((prev) => {
        const newError = { ...prev };
        delete newError['avatar'];
        return newError;
      });
    } catch (error) {
      console.log('Avatar upload failed', error);
      setErrors((prev) => ({
        ...prev,
        avatar: error instanceof Error ? error.message : 'Failed to upload avatar',
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
      avatar:
        formData.avatar ??
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1742547439/opzj4nkixf9ftq6bmeyj.jpg',
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

    //If validation passed, proceed with the saving
    onSave(studentData);
    onClose();
  };

  // Check if form has any errors
  const hasErrors = Object.keys(errors).length > 0;

  if (!isOpen) return null;

  const icons = {
    calendar: {
      src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868045/calendar_rnyiqj.png',
      alt: 'calendar icon',
      className: 'calendar-icon',
    },
    camera: {
      src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868045/camera_zqn9bv.png',
      alt: 'camera icon',
      className: 'camera-icon',
    },
  };

  // Form Fields Configuration
  const formFields = [
    {
      label: 'Name',
      id: 'name',
      type: 'text',
      placeholder: 'Enter student name',
      valueKey: 'name',
    },
    {
      label: 'Email',
      id: 'email',
      type: 'text',
      placeholder: 'Enter your email',
      valueKey: 'email',
    },
    {
      label: 'Phone Number',
      id: 'phone',
      type: 'text',
      placeholder: 'Enter you phone number',
      valueKey: 'phoneNum',
    },
    {
      label: 'Enroll Number',
      id: 'enroll',
      disabled: true,
      valueKey: 'enrollNum',
    },
  ];

  return (
    <Overlay onClick={handleOverlayClick}>
      <div className="popup-container" ref={formRef}>
        {/* Header */}
        <FormHeader title={isEditMode ? 'Edit Student' : 'Add New Student'} onClose={onClose} />
        {/* Body */}
        <div className="popup-body">
          <AvatarUpload
            avatar={formData.avatar}
            onUpload={handleFileUpload}
            error={errors.avatar}
            defaultAvatar={icons.camera.src}
          />

          <form id="studentForm">
            {/* Mapped Form Fields */}
            {formFields.map((field) => (
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
              <InputWithIcon
                id="admission"
                type="date"
                className="calendar-input"
                value={formData.dateAdmission ? formatDateForInput(formData.dateAdmission) : ''}
                onChange={handleInputChange}
                hasError={!!errors.dateAdmission}
                icon={icons.calendar}
              />
              {errors.dateAdmission && <div className="error-message">{errors.dateAdmission}</div>}
            </div>
          </form>
        </div>

        {/* Footer */}
        <FormFooter
          onCancel={() => {
            onCancel();
            onClose();
          }}
          onSubmit={handleSubmit}
          submitButtonText={isEditMode ? 'Update Student' : 'Add Student'}
          hasErrors={hasErrors}
        />
      </div>
    </Overlay>
  );
};
export default StudentForm;
