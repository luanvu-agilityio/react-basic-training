import React from 'react';
import Title from '../Title';
import Text from '../Text';
import FormField from '../FormField';
import Button from '../Button';
import './index.css';

interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

interface FormProps {
  title?: string;
  subtitle?: string;
  description?: string;
  fields: FormFieldConfig[];
  values: Record<string, string | number | boolean>;
  errors: Record<string, string>;
  isLoading?: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  footer?: React.ReactNode;
  submitText?: string;
}

export const Form = ({
  title,
  subtitle,
  description,
  fields,
  values,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  footer,
  submitText = 'Submit',
}: FormProps) => {
  return (
    <div className="card">
      {title && <Title className="header-title" title={title} />}
      {subtitle && <Text text={subtitle} as="h2" className="header-subtitle" />}
      {description && <Text text={description} className="header-description" />}

      <form className="card-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <FormField
              label={field.label}
              className="form-input"
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={String(values[field.name] || '')}
              onInputChange={onInputChange}
              required={field.required}
            />
            {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
          </div>
        ))}

        <Button
          className="btn-submit"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </form>

      {footer && <div className="form-footer">{footer}</div>}
    </div>
  );
};
