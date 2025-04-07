import React, { useEffect, useRef } from 'react';
import { IStudent } from 'types/student';
import { formatDateForInput } from '@utils/date-formatter';
import AvatarUpload from '@components/AvatarUpload';
import FormLabel from '@components/common/FormLabel';
import FormInput from '@components/common/FormInput';
import { Overlay } from 'models/Overlay';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
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
  formData: Partial<IStudent>;
  errors: Record<string, string>;
  tempAvatarUrl: string | null;
  isOpen: boolean;
  isEditMode: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileSelect: (file: File | null) => void;
  /** Callback function to save student data */
  onSave: () => void;
  /** Callback function for form cancellation */
  onCancel: () => void;
  onClose: () => void;
}

const StudentForm = ({
  formData,
  errors,
  tempAvatarUrl,
  isOpen,
  isEditMode,
  onInputChange,
  onFileSelect,
  onSave,
  onCancel,
  onClose,
}: StudentFormViewProps) => {
  const formRef = useRef<HTMLDivElement>(null);

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

  const hasErrors = Object.keys(errors).length > 0;
  if (!isOpen) return null;

  //  Form Header component
  const FormHeader = () => (
    <div className="popup-header">
      <Text
        className="popup-header-text"
        text={isEditMode ? 'Edit Student' : 'Add New Student'}
        as="h2"
      />
      <Button variant="close" onClick={onClose}>
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
        variant="cancel"
        onClick={() => {
          onCancel();
          onClose();
        }}
      >
        Cancel
      </Button>

      {/* Submit button with dynamic styling based on error state */}
      <Button
        variant="save"
        style={{
          backgroundColor: hasErrors ? 'var(--light-gray-color)' : '#1677ff',
          cursor: hasErrors ? 'not-allowed' : 'pointer',
          border: 'none',
          marginLeft: '10px',
          color: 'white',
          fontWeight: 'var(--font-weight-bold)',
        }}
        onClick={onSave}
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
            onFileSelect={onFileSelect}
            error={errors.avatar}
          />

          <form id="studentForm">
            {/* Mapped Form Fields */}
            {FORM_FIELDS.map((field) => (
              <div key={field.fieldName} className="form-group">
                <FormLabel htmlFor={field.fieldName}>{field.label}</FormLabel>
                <FormInput
                  type={field.type}
                  name={field.fieldName}
                  placeholder={field.placeholder}
                  value={formData[field.valueKey as keyof IStudent] ?? ''}
                  onInputChange={onInputChange}
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
                name="admission"
                type="date"
                className="calendar-input"
                value={formData.dateAdmission ? formatDateForInput(formData.dateAdmission) : ''}
                onInputChange={onInputChange}
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
