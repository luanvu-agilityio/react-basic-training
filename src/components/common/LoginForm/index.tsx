import React, { useState } from 'react';
import { EMAIL_REGEX } from '@constants/regex';
import { LOGIN_ERROR_MESSAGES } from '@constants/login-error-message';
import { useLoadingSpinner } from '@components/common/LoadingSpinner';
import Button from '@components/common/Button';
import Toast from '@components/common/Toast';
import { Title } from '../Title';
import { Subtitle } from '../Subtitle';
import { Description } from '../Description';
import Link from '../Link';
import { ToastType } from 'types/toast';
import { getUserService } from 'services/user-service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/Auth.context';
import { ROUTES } from 'route/config';
import { FormLabel } from '../Label';
import FormInput from '../FormInput';
import './index.css';

/**
 * A login form component for React applications.
 *
 * This component provides a complete authentication interface with email/password inputs,
 * form validation, loading states, error handling, and toast notifications.
 *
 * Features:
 * - Email and password validation
 * - Loading state management
 * - Error message display
 * - Toast notifications
 * - Reset password link
 * - Responsive design
 *
 * State Management:
 * - Form state (email, password)
 * - Error state for form validation
 * - Loading state during authentication
 * - Toast state for notifications
 *
 * Form Validation:
 * - Email format validation
 * - Required field validation
 * - Password length validation (minimum 6 characters)
 */
interface LoginFormState {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

interface ToastState {
  show: boolean;
  type: ToastType;
  title: string;
  message: string;
}

const LoginForm: React.FC = () => {
  // Navigation and authentication hooks
  const navigate = useNavigate();
  const { login } = useAuth();
  const { show, hide } = useLoadingSpinner();

  // Form state management
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  // Error state for validation messages
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  // Toast notification state
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'info',
    title: '',
    message: '',
  });

  // Loading state for submit button
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validates email format using regex
   * @param email - Email address to validate
   */
  const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  /**
   * Handles input field changes
   * Updates form state and clears corresponding error
   * @param e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });

    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };

  /**
   * Validates form inputs
   * Checks for:
   * - Required fields
   * - Email format
   * - Password length
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { email: '', password: '' };

    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = LOGIN_ERROR_MESSAGES.EMAIL_REQUIRED;
      isValid = false;
    } else if (!isValidEmail(formState.email.trim())) {
      newErrors.email = LOGIN_ERROR_MESSAGES.EMAIL_INVALID;
      isValid = false;
    }

    // Password validation
    if (!formState.password) {
      newErrors.password = LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED;
      isValid = false;
    } else if (formState.password.length < 6) {
      newErrors.password = LOGIN_ERROR_MESSAGES.PASSWORD_LENGTH;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Shows toast notification with specified parameters
   */
  const showToast = (type: ToastType, title: string, message: string) => {
    setToast({ show: true, type, title, message });
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  /**
   * Handles form submission
   * 1. Prevents default form submission
   * 2. Validates form inputs
   * 3. Attempts authentication
   * 4. Handles success/failure cases
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    show();

    try {
      if (validateForm()) {
        const { email, password } = formState;
        const userService = await getUserService();
        const user = await userService.authenticate(email, password);

        if (user) {
          login({
            username: user.name ?? email.split('@')[0],
            userRole: user.role ?? 'User',
            userProfileImage: user.avatar ?? '',
          });
          showToast('success', 'Success!', LOGIN_ERROR_MESSAGES.AUTH_SUCCESS);

          setTimeout(() => {
            navigate(ROUTES.DEFAULT);
            hide();
          }, 1000);
        } else {
          showToast('error', 'Error!', LOGIN_ERROR_MESSAGES.AUTH_FAILED);
          setFormState({ ...formState, password: '' });
          setIsLoading(false);
          hide();
        }
      } else {
        showToast('warning', 'Warning!', LOGIN_ERROR_MESSAGES.FORM_ERRORS);
        setIsLoading(false);
        hide();
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('error', 'Error!', 'An unexpected error occurred during login');
      setIsLoading(false);
      hide();
    }
    hide();
  };

  const handleResetPassword = () => {
    // Implement password reset logic or navigation
    console.log('Reset Password clicked');
  };

  // Form field configuration for rendering
  const formFields = [
    {
      label: 'Email',
      id: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      value: formState.email,
      error: errors.email,
    },
    {
      label: 'Password',
      id: 'password',
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
          <Title className="header__title" title="crud operations" />
          <Subtitle className="header__subtitle" subtitle="SIGN IN" />
          <Description
            className="header__description"
            description="Enter your credentials to access your account"
          />
          <form className="card__form" onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.id} className="form__group">
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                <FormInput
                  className="form__input"
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={handleInputChange}
                />
                {field.error && <p className="error-message">{field.error}</p>}
              </div>
            ))}
            <Button className="form__submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? 'Loading...' : 'sign in'}
            </Button>
          </form>
          <Link onLinkClick={handleResetPassword} />
          {toast.show && (
            <Toast
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onClose={closeToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
