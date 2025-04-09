import React, { useEffect } from 'react';
import { IStudent } from 'types/student';
import { formatDateForInput } from '@utils/date-formatter';
import AvatarUpload from '@components/AvatarUpload';
import { ICON_SRC } from '@constants/icon-src';
import { FORM_FIELDS } from '@constants/form-field';
import './index.css';
import ModalForm from '@components/common/ModalForm';

/**
 * StudentForm Component
 *
 * A form component for creating and editing student records.
 */
interface StudentFormViewProps {
  formData: Partial<IStudent>;
  errors: Record<string, string>;
  tempAvatarUrl: string | null;
  isOpen: boolean;
  isEditMode: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileSelect: (file: File | null) => void;
  onSubmit: () => void;
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
  onSubmit,
  onClose,
}: StudentFormViewProps) => {
  // Cleanup temp URL when component unmounts or form closes
  useEffect(() => {
    return () => {
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl);
      }
    };
  }, [tempAvatarUrl]);

  // Form fields configuration
  const studentFormFields = [
    ...FORM_FIELDS,
    {
      fieldName: 'admission',
      label: 'Date of Admission',
      type: 'date',
      valueKey: 'dateAdmission',
      className: 'calendar-input',
      imgSrc: ICON_SRC.calendar.src,
      imgAlt: ICON_SRC.calendar.alt,
      imgClassName: ICON_SRC.calendar.className,
    },
  ];

  // Format the date value for the input
  const formattedFormData = {
    ...formData,
    dateAdmission: formData.dateAdmission ? formatDateForInput(formData.dateAdmission) : '',
  };

  // Render the avatar upload section before the main form fields
  const renderAvatarUpload = () => (
    <AvatarUpload
      avatar={formData.avatar}
      previewUrl={tempAvatarUrl ?? undefined}
      onFileSelect={onFileSelect}
      error={errors.avatar}
    />
  );
  return (
    <ModalForm
      formData={formattedFormData}
      errors={errors}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Student' : 'Add New Student'}
      submitText={isEditMode ? 'Update Student' : 'Add Student'}
      cancelText="Cancel"
      fields={studentFormFields}
      renderBeforeFields={renderAvatarUpload}
    />
  );
};

export default StudentForm;
