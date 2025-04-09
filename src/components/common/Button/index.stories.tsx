import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import './index.css';
import Button, { ButtonVariant } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile Button component supporting multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'submit',
        'add',
        'back',
        'toggle',
        'close',
        'upload',
        'delete',
        'edit',
        'cancel',
        'confirm',
        'pagination',
        'notification',
        'link',
        'save',
        'dropdown',
      ],
      description: 'Button visual style variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    isLoading: false,
    disabled: false,
    variant: 'submit',
    size: 'medium',
    onClick: () => console.log('Button clicked'),
  },
};

export const ButtonVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '600px' }}>
      {[
        'submit',
        'add',
        'back',
        'toggle',
        'close',
        'upload',
        'delete',
        'edit',
        'cancel',
        'confirm',
        'pagination',
        'notification',
        'link',
        'save',
        'dropdown',
      ].map((variant) => (
        <Button
          key={variant}
          variant={variant as ButtonVariant}
          onClick={() => console.log(`${variant} clicked`)}
        >
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcases all available button variants.',
      },
    },
  },
};

export const ButtonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Button variant="submit" size="small" onClick={() => console.log('Small button clicked')}>
        Small
      </Button>
      <Button variant="submit" size="medium" onClick={() => console.log('Medium button clicked')}>
        Medium
      </Button>
      <Button variant="submit" size="large" onClick={() => console.log('Large button clicked')}>
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows different button sizes: small, medium, and large.',
      },
    },
  },
};

export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="submit" onClick={() => console.log('Regular button clicked')}>
        Regular
      </Button>
      <Button
        variant="submit"
        isLoading={true}
        onClick={() => console.log('Loading button clicked')}
      >
        Loading
      </Button>
      <Button
        variant="submit"
        disabled={true}
        onClick={() => console.log('Disabled button clicked')}
      >
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates different button states: regular, loading, and disabled.',
      },
    },
  },
};

export const InteractiveButton: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
      setIsLoading(true);
      setClickCount((prev) => prev + 1);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <Button variant="confirm" isLoading={isLoading} onClick={handleClick}>
          Click me!
        </Button>
        <div>Times clicked: {clickCount}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive example that shows button state changes on click.',
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Custom Styled Button',
    variant: 'submit',
    className: 'custom-button-class',
    onClick: () => console.log('Custom button clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with additional custom CSS class applied.',
      },
    },
  },
};

export const WithIconText: Story = {
  render: () => (
    <Button variant="submit" onClick={() => console.log('Button clicked')}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={{ fontSize: '1.2em' }}>+</span>
        <span>Add Item</span>
      </div>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with icon + text.',
      },
    },
  },
};
