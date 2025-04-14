import { ChangeEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IStudent } from 'types/student';
import { formatDateForInput } from '@utils/date-formatter';
import AvatarUpload from '@components/AvatarUpload';
import { ICON_SRC } from '@constants/icon-src';
import { FORM_FIELDS } from '@constants/form-field';
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
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileSelect: (file: File | null) => void;
  onSubmit: () => void;
  onClose: () => void;
}

// Styled Components
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const CalendarInputWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CalendarInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: ${(props) =>
    props.hasError ? '1px solid var(--color-error)' : '1px solid var(--input-border-color)'};
  border-radius: 4px;
  font-size: var(--font-size-14);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--orange-color);
  }
`;

const CalendarIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* This ensures clicks pass through to the input */
  z-index: 1;
`;

const CalendarLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--black-color);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
`;

const ErrorContainer = styled.div`
  color: var(--color-error);
  font-size: 12px;
  margin-top: 0.25rem;
  font-weight: 500;
`;

// Hidden native calendar input that gets triggered when clicking the custom input
const HiddenCalendarInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

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
  // Reference to the hidden native date input
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Cleanup temp URL when component unmounts or form closes
  useEffect(() => {
    return () => {
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl);
      }
    };
  }, [tempAvatarUrl]);

  // Form fields configuration - excluding the date field as we'll render it separately
  const studentFormFields = FORM_FIELDS;

  // Format the date value for the input
  const formattedFormData = {
    ...formData,
    dateAdmission: formData.dateAdmission ? formatDateForInput(formData.dateAdmission) : '',
  };

  // Handler to open the native date picker when clicking anywhere in our custom input
  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
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

  // Custom render for date input with calendar icon
  const renderCustomDateField = () => {
    const hasError = !!errors.dateAdmission;

    return (
      <FormGroup>
        <CalendarLabel htmlFor="admission">Date of Admission</CalendarLabel>
        <CalendarInputWrapper onClick={handleCalendarClick}>
          <CalendarInput
            type="text"
            value={formattedFormData.dateAdmission || ''}
            readOnly
            placeholder="mm/dd/yyyy"
            hasError={hasError}
          />
          <CalendarIcon
            src={ICON_SRC.calendar.src}
            alt={ICON_SRC.calendar.alt}
            className={ICON_SRC.calendar.className}
          />
          <HiddenCalendarInput
            ref={dateInputRef}
            type="date"
            name="admission"
            id="admission"
            value={formattedFormData.dateAdmission || ''}
            onChange={onInputChange}
          />
        </CalendarInputWrapper>
        {hasError && <ErrorContainer>{errors.dateAdmission}</ErrorContainer>}
      </FormGroup>
    );
  };

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
      renderAfterFields={renderCustomDateField}
    />
  );
};

export default StudentForm;
