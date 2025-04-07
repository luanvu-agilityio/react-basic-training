import React from 'react';

import Button from '@components/common/Button';
import { FormErrors } from '@utils/login-validation';
import FormLabel from '@components/common/FormLabel';
import FormInput from '@components/common/FormInput';
import Text from '@components/common/Text';
import Title from '@components/common/Title';

import './index.css';
import NavigationLink from '@components/NavigationLink';

/**
 * A simplified login form component
 *
 * This component focuses solely on rendering the form UI and collecting user input
 *
 * Props:
 * - formState: Current form values
 * - errors: Validation error messages
 * - isLoading: Loading state for submit button
 * - onInputChange: Handler for input field changes
 * - onSubmit: Handler for form submission
 * - onResetPassword: Handler for password reset link
 */
interface LoginFormProps {
  formState: {
    email: string;
    password: string;
  };
  errors: FormErrors;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResetPassword: () => void;
}

const LoginForm = ({
  formState,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  onResetPassword,
}: LoginFormProps) => {
  const formFields = [
    {
      label: 'Email',
      userField: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      value: formState.email,
      error: errors.email,
    },
    {
      label: 'Password',
      userField: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      value: formState.password,
      error: errors.password,
    },
  ];

  return (
    <div
      style={{
        fontFamily: 'var(--font-family-primary)',
        minHeight: '100vh',
      }}
    >
      <div className="auth">
        <div className="card card-login">
          <Title className="header-title" title="crud operations" />
          <Text
            text="sign in"
            as="h2"
            className="header-subtitle"
            style={{ textTransform: 'uppercase' }}
          />
          <Text
            text="Enter your credentials to access your account"
            className="header-description"
          />
          <form className="card-form" onSubmit={onSubmit}>
            {formFields.map((field) => (
              <div key={field.userField} className="form-group">
                <FormLabel htmlFor={field.userField}>{field.label}</FormLabel>
                <FormInput
                  className="form-input"
                  type={field.type}
                  name={field.userField}
                  placeholder={field.placeholder}
                  value={field.value}
                  onInputChange={onInputChange}
                />
                {field.error && <p className="error-message">{field.error}</p>}
              </div>
            ))}
            <Button
              className="btn-submit"
              disabled={isLoading}
              isLoading={isLoading}
              onClick={onSubmit}
            >
              sign in
            </Button>
          </form>
          <div
            className="link-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: '30px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--black-color)',
            }}
          >
            <Text text="Forgot your password? " className="link-text" as="p" />
            <span>
              <NavigationLink
                className="reset-link"
                to="reset"
                text="Reset Password"
                onClick={onResetPassword}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
