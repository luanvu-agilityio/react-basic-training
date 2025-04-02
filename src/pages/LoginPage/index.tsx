import React, { JSX } from 'react';
import LoginForm from '@components/common/LoginForm';

/**
 * LoginForm Component
 *
 * Authenticates users and provides access to the protected areas of the application.
 * Redirects to default route upon successful authentication.
 *
 * Features:
 * - User authentication
 * - Form validation
 * - Error handling
 *
 * @returns {JSX.Element} Login form component
 */
const LoginPage = (): JSX.Element => {
  return <LoginForm />;
};

export default LoginPage;
