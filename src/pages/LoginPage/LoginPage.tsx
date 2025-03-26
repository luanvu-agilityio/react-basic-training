import { EMAIL_REGEX } from '@constants/regex';
import { LOGIN_ERROR_MESSAGES } from '@constants/login-error-message';
import React, { useState } from 'react';
import Toast from '@components/common/toast/Toast';
import './LoginPage.css';
import { useLoadingSpinner } from '@components/common/loading-spinner/LoadingSpinner';
import Button from '@components/common/buttons/Button';
import { ToastType } from 'types/toast';
import { getUserService } from '../../services/user-service';
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

interface LoginFormProps {
  initialState?: {
    email?: string;
    password?: string;
    isLoading?: boolean;
  };
  initialErrors?: {
    email?: string;
    password?: string;
  };
  initialToast?: {
    show: boolean;
    type: ToastType;
    title: string;
    message: string;
  };
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialState = { email: '', password: '', isLoading: false },
  initialErrors = { email: '', password: '' },
  initialToast = { show: false, type: 'info', title: '', message: '' },
}) => {
  const { show, hide } = useLoadingSpinner();
  const [formState, setFormState] = useState<LoginFormState>({
    email: initialState.email ?? '',
    password: initialState.password ?? '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: initialErrors.email ?? '',
    password: initialErrors.password ?? '',
  });

  const [toast, setToast] = useState<ToastState>({
    show: initialToast.show,
    type: initialToast.type,
    title: initialToast.title,
    message: initialToast.message,
  });

  const [isLoading, setIsLoading] = useState(initialState.isLoading || false);

  const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });

    if (errors[id as keyof FormErrors]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { email: '', password: '' };

    if (!formState.email.trim()) {
      newErrors.email = LOGIN_ERROR_MESSAGES.EMAIL_REQUIRED;
      isValid = false;
    } else if (!isValidEmail(formState.email.trim())) {
      newErrors.email = LOGIN_ERROR_MESSAGES.EMAIL_INVALID;
      isValid = false;
    }

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

  const showToast = (type: ToastType, title: string, message: string) => {
    setToast({ show: true, type, title, message });
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    show();

    try {
      if (validateForm()) {
        const { email, password } = formState;

        // Get the user service
        const userService = await getUserService();

        // Authenticate using the user service
        const user = await userService.authenticate(email, password);

        if (user) {
          // Authentication successful
          showToast('success', 'Success!', LOGIN_ERROR_MESSAGES.AUTH_SUCCESS);

          // Store user information in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userId', user.id);
          // Use name if available, otherwise use email username
          localStorage.setItem('userName', user.name ?? email.split('@')[0]);
          localStorage.setItem('userAvatar', user.avatar ?? '');
          // store user role
          if (user.role) {
            localStorage.setItem('userRole', user.role);
          } else {
            // Default role
            localStorage.setItem('userRole', 'User');
          }

          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = '/index.html';
            hide();
          }, 3000);
        } else {
          // Authentication failed
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
  };

  return (
    <div className="auth">
      <div className="card card-login">
        <header className="card__header">
          <h1 className="header__title">crud operations</h1>
          <h2 className="header__subtitle">sign in</h2>
          <p className="header__description">Enter your credentials to access your account</p>
        </header>
        <form className="card__form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              type="email"
              className="form__input"
              id="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              className="form__input"
              id="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <Button
            className="form__submit"
            buttonType="submit"
            htmlType="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'sign in'}
          </Button>
        </form>

        <footer className="card__footer">
          <p className="footer__text">
            Forgot your password?{' '}
            <button
              type="button"
              className="footer__link"
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Reset Password
            </button>
          </p>
        </footer>

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
  );
};

export default LoginForm;
