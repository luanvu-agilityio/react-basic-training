import { ChangeEvent, ReactElement, ReactNode } from 'react';
import Modal from '@components/common/Modal';
import FormField from '@components/common/FormField';

/**
 * Generic Form Component
 *
 * A reusable form component that can be used with Modal
 * - Handles form fields rendering
 * - Supports custom form sections/components
 * - Manages form submission
 */
interface FormField {
  fieldName: string;
  label: string;
  type: string;
  placeholder?: string;
  valueKey: string;
  disabled?: boolean;
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgClassName?: string;
}

interface ModalFormProps<T extends Record<string, unknown>> {
  // Form data and handlers
  readonly formData: T;
  readonly errors: Record<string, string>;
  readonly onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly onSubmit: () => void;

  // Modal props
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly submitText?: string;
  readonly cancelText?: string;
  readonly submitDisabled?: boolean;

  // Form configuration
  readonly fields: FormField[];
  readonly renderBeforeFields?: () => ReactNode;
  readonly renderAfterFields?: () => ReactNode;
}

function ModalForm<T extends Record<string, unknown>>({
  formData,
  errors,
  onInputChange,
  onSubmit,
  isOpen,
  onClose,
  title,
  submitText = 'Submit',
  cancelText = 'Cancel',
  submitDisabled,
  fields,
  renderBeforeFields,
  renderAfterFields,
}: ModalFormProps<T>): ReactElement {
  // Determine if form should be disabled based on errors
  const hasErrors = submitDisabled ?? Object.keys(errors).length > 0;

  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      title={title}
      onSubmit={onSubmit}
      cancelText={cancelText}
      submitText={submitText}
      submitDisabled={hasErrors}
    >
      {renderBeforeFields?.()}

      <form>
        {/* Mapped Form Fields */}
        {fields.map((field) => {
          const fieldValue = field.valueKey in formData ? String(formData[field.valueKey]) : '';

          return (
            <div key={field.fieldName} className="form-group">
              <FormField
                label={field.label}
                type={field.type}
                name={field.fieldName}
                placeholder={field.placeholder}
                value={fieldValue}
                onInputChange={onInputChange}
                disabled={field.disabled}
                className={field.className}
                hasError={!!errors[field.valueKey]}
                imgSrc={field.imgSrc}
                imgAlt={field.imgAlt}
                imgClassName={field.imgClassName}
              />
              {errors[field.valueKey] && (
                <div className="error-message">{errors[field.valueKey]}</div>
              )}
            </div>
          );
        })}
      </form>

      {renderAfterFields?.()}
    </Modal>
  );
}

export default ModalForm;
