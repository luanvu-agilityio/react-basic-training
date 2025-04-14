import styled from 'styled-components';
import Title from '../Title';
import Text from '../Text';
import FormField from '../FormField';
import Button from '../Button';
import { ChangeEvent, FormEvent, ReactNode } from 'react';

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
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  footer?: ReactNode;
  submitText?: string;
}

// Styled Components
const Card = styled.div`
  width: 47.5rem;
  min-height: 55rem;
  padding: 4.4rem 3rem;
  background-color: var(--white-color);
  border-radius: 2rem;
  box-shadow: 2px 5px 10px 0px #0000001a;
`;

const HeaderTitle = styled(Title)`
  position: relative;
  padding-left: 4.5rem;
  margin-bottom: 3rem;
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  text-align: center;
  text-transform: uppercase;

  &::before {
    content: '';
    position: absolute;
    left: 4.5rem;
    top: 0;
    height: 100%;
    width: 0.6rem;
    background-color: #f8d442;
    border-radius: 6px;
  }
`;

const HeaderSubtitle = styled(Text)`
  font-size: 2.2rem;
  color: var(--black-color);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
`;

const HeaderDescription = styled(Text)`
  font-size: var(--font-size-14);
  color: var(--dark-gray-color);
  text-align: center;
  margin-bottom: 5rem;
`;

const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledFormField = styled(FormField)`
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--input-border-color);
  border-radius: 0.4rem;
  width: 100%;
  font-size: var(--font-size-12);
  transition: border-color 0.3s;

  &::placeholder {
    font-size: var(--font-size-12);
    color: var(--light-gray-color);
  }

  &:focus {
    outline: none;
    border-color: var(--input-focus-color);
  }
`;

const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: var(--font-size-12);
`;

const SubmitButton = styled(Button)`
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 1rem 2rem;
  font-size: 14px;
  background-color: var(--orange-color);
  font-size: 14px;
  font-weight: bold;
  border: none;
  padding: 13px 25px;
  text-transform: uppercase;
`;

const FormFooter = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: var(--font-size-14);
  color: var(--dark-gray-color);
`;

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
    <Card>
      {title && <HeaderTitle title={title} />}
      {subtitle && <HeaderSubtitle as="h2">{subtitle}</HeaderSubtitle>}
      {description && <HeaderDescription text={description} />}

      <CardForm onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormGroup key={field.name}>
            <StyledFormField
              label={field.label}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={String(values[field.name] || '')}
              onInputChange={onInputChange}
              required={field.required}
            />
            {errors[field.name] && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
          </FormGroup>
        ))}

        <SubmitButton disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
          {submitText}
        </SubmitButton>
      </CardForm>

      {footer && <FormFooter>{footer}</FormFooter>}
    </Card>
  );
};

export default Form;
