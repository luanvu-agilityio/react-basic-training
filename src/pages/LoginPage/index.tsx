import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ERROR_MESSAGES } from '@constants/login-error-message';
import { FormErrors, validateLoginForm } from '@utils/login-validation';
import { useAuth } from '@contexts/Auth.context';
import { useToast } from 'contexts/Toast.context';
import { getUserService } from 'services/user-service';
import { ROUTES } from 'route/config';
import NavigationLink from '@components/NavigationLink';
import Text from '@components/common/Text';
import { Form } from '@components/common/Form';
import './index.css';

/**
 * LoginPage Component
 *
 * This component manages all state and business logic for user authentication,
 * while delegating UI rendering to the LoginForm component.
 *
 * State Management:
 * - Form state (email, password)
 * - Error state for form validation
 * - Loading state during authentication
 *
 * Features:
 * - User authentication
 * - Form validation
 * - Error handling
 * - Success/failure notifications
 * - Navigation after login
 */

interface LoginFormState {
  email: string;
  password: string;
  [key: string]: string;
}

const LoginPage = () => {
  // Navigation and authentication hooks
  const navigate = useNavigate();
  const { login } = useAuth();

  // Global toast context
  const { showToast } = useToast();

  // Form state management
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  // Error state for validation messages
  const [errors, setErrors] = useState<FormErrors>({});

  // Loading state for submit button
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles input field changes
   * Updates form state and clears corresponding error
   * @param e - Input change event
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  /**
   * Handles form submission
   * 1. Prevents default form submission
   * 2. Validates form inputs
   * 3. Attempts authentication
   * 4. Handles success/failure cases
   * @param e - Form submit event
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formState;
      const { errors: validationErrors, isValid } = validateLoginForm(email, password);

      if (!isValid) {
        setErrors(validationErrors);
        setIsLoading(false);

        return;
      }

      const userService = await getUserService();
      const user = await userService.authenticate(email, password);

      if (user) {
        const username = user.name ?? email.split('@')[0];

        login({
          username,
          userRole: user.role ?? 'User',
          userProfileImage: user.avatar ?? '',
        });

        showToast('success', 'Success!', LOGIN_ERROR_MESSAGES.AUTH_SUCCESS);

        // Use a more modern approach with Promise
        await new Promise((resolve) => setTimeout(resolve, 300));
        navigate(ROUTES.DEFAULT);
      } else {
        showToast('error', 'Error!', LOGIN_ERROR_MESSAGES.AUTH_FAILED);
        setFormState((prev) => ({ ...prev, password: '' }));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('error', 'Error!', 'An unexpected error occurred during login');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loginFormFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
    },
  ];

  const handleResetPassword = () => {};

  const resetPasswordLink = (
    <div className="link-container">
      <Text text="Forgot your password? " className="link-text" as="span" />
      <span>
        <NavigationLink
          className="reset-link"
          to="reset"
          text="Reset Password"
          onClick={handleResetPassword}
        />
      </span>
    </div>
  );

  return (
    <div className="auth">
      <Form
        title="crud operations"
        subtitle="sign in"
        description="Enter your credentials to access your account"
        fields={loginFormFields}
        values={formState}
        errors={errors}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        submitText="sign in"
        footer={resetPasswordLink}
      />
    </div>
  );
};

export default LoginPage;
