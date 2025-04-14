import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StudentTableHeader from './index';

const meta: Meta<typeof StudentTableHeader> = {
  title: 'Components/StudentTableHeader',
  component: StudentTableHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A table header component for the student list table.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <Story />
          <tbody></tbody>
        </table>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudentTableHeader>;

// Default table header
export const Default: Story = {};

// With custom styling
export const WithCustomStyling: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <style>
            {`
              .table-header {
                background-color: var(--color-info);
                color: white;
                padding: 12px 16px;
                text-align: left;
                font-weight: 600;
              }
              .name-cell {
                min-width: 200px;
              }
              .email-cell {
                min-width: 250px;
              }
            `}
          </style>
          <Story />
          <tbody>
            <tr>
              <td
                colSpan={7}
                style={{ padding: '12px', textAlign: 'center', color: 'var(--dark-gray-color)' }}
              >
                Table body content would appear here
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  ],
};
