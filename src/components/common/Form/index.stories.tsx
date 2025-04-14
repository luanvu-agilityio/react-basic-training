import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Form } from './index';
import Button from '../Button';
import Text from '../Text';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable form component with fields, validation, and submission handling.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Form title',
    },
    subtitle: {
      control: 'text',
      description: 'Form subtitle',
    },
    description: {
      control: 'text',
      description: 'Form description',
    },
    fields: {
      control: 'object',
      description: 'Configuration for form fields',
    },
    values: {
      control: 'object',
      description: 'Form field values',
    },
    errors: {
      control: 'object',
      description: 'Form validation errors',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the form is in a loading state',
    },
    onInputChange: {
      action: 'changed',
      description: 'Handler for input changes',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Handler for form submission',
    },
    footer: {
      control: 'text',
      description: 'Optional footer content',
    },
    submitText: {
      control: 'text',
      description: 'Text for the submit button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// Registration Form
export const RegistrationForm: Story = {
  render: () => {
    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const fields = [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter your first name',
        required: true,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter your last name',
        required: true,
      },
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
        placeholder: 'Create a password',
        required: true,
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true,
      },
      {
        name: 'agreeTerms',
        label: 'I agree to the Terms & Conditions',
        type: 'checkbox',
        required: true,
      },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const inputValue = type === 'checkbox' ? checked : value;

      setValues((prev) => ({ ...prev, [name]: inputValue }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Validation
      const newErrors: Record<string, string> = {};

      if (!values.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }

      if (!values.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      if (!values.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!values.password) {
        newErrors.password = 'Password is required';
      } else if (values.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!values.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (values.password !== values.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!values.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log('Registration values:', values);
        alert('Registration successful!');
      }, 1500);
    };

    return (
      <div style={{ width: '400px' }}>
        <Form
          title="Create an Account"
          subtitle="Join our community"
          description="Fill out the form below to create your account"
          fields={fields}
          values={values}
          errors={errors}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          submitText="Register"
          footer={
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Text text="Already have an account?" />
              <Button
                variant="link"
                onClick={() => console.log('Login clicked')}
                style={{ marginLeft: '5px', color: 'blue' }}
              >
                Sign in
              </Button>
            </div>
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A registration form with multiple fields and validation.',
      },
    },
  },
};

// Contact Form
export const ContactForm: Story = {
  render: () => {
    const [values, setValues] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const fields = [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter your phone number (optional)',
        required: false,
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter your message',
        required: true,
      },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Validation
      const newErrors: Record<string, string> = {};

      if (!values.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!values.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (values.phone && !/^\d{10}$/.test(values.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }

      if (!values.message.trim()) {
        newErrors.message = 'Message is required';
      } else if (values.message.length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSent(true);
        console.log('Contact form values:', values);
      }, 1000);
    };

    if (sent) {
      return (
        <div
          style={{
            width: '400px',
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
          <Text as="h2" text="Message Sent!" />
          <Text text="Thank you for contacting us. We'll get back to you as soon as possible." />
          <Button
            variant="submit"
            onClick={() => {
              setValues({ name: '', email: '', phone: '', message: '' });
              setSent(false);
            }}
            style={{ marginTop: '20px' }}
          >
            Send Another Message
          </Button>
        </div>
      );
    }

    return (
      <div style={{ width: '400px' }}>
        <Form
          title="Contact Us"
          subtitle="Get in Touch"
          description="Fill out the form below and we'll get back to you as soon as possible."
          fields={fields}
          values={values}
          errors={errors}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          submitText="Send Message"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A contact form with success feedback.',
      },
    },
  },
};

// Error State Form
export const ErrorStateForm: Story = {
  render: () => {
    const fields = [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Choose a username',
        required: true,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        required: true,
      },
    ];

    return (
      <div style={{ width: '350px' }}>
        <Form
          title="Create Account"
          fields={fields}
          values={{ username: 'user', password: '123' }}
          errors={{
            username: 'Username must be at least 4 characters',
            password: 'Password is too weak',
          }}
          isLoading={false}
          onInputChange={() => {}}
          onSubmit={(e) => e.preventDefault()}
          submitText="Create Account"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form displaying validation errors.',
      },
    },
  },
};
