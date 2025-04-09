import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SortDropdown from './index';
import { ISortConfig } from 'types/sort';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SortDropdown> = {
  title: 'Components/StudentSortDropdown',
  component: SortDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sorting component for sorting data by different sort fields and orders',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSortChange: {
      description: 'Callback function triggered when sort options is changed',
      control: false,
    },
    initialConfig: {
      description: 'Initial sort config',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SortDropdown>;

// Default story
export const Default: Story = {
  args: {
    onSortChange: action('sort-changed'),
    initialConfig: { field: 'name', order: 'asc' },
  },
};

// Story with different initial configuration
export const InitialSortByEmail: Story = {
  args: {
    onSortChange: action('sort-changed'),
    initialConfig: { field: 'email', order: 'asc' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown initialize with field email sorting ascending order',
      },
    },
  },
};

// Story with descending order
export const InitialSortByDateDesc: Story = {
  args: {
    onSortChange: action('sort-changed'),
    initialConfig: { field: 'dateAdmission', order: 'desc' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown initialize with field dateAdmission sorting descending order',
      },
    },
  },
};

// Interactive story with a wrapper component
export const Interactive: Story = {
  render: () => {
    const InteractiveWrapper = () => {
      const [currentSort, setCurrentSort] = React.useState<ISortConfig>({
        field: 'name',
        order: 'asc',
      });

      const handleSortChange = (config: ISortConfig) => {
        setCurrentSort(config);
        action('sort-changed')(config);
      };

      return (
        <div>
          <SortDropdown onSortChange={handleSortChange} initialConfig={currentSort} />
          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <p>Current sort configuration:</p>
            <pre>{JSON.stringify(currentSort, null, 2)}</pre>
          </div>
        </div>
      );
    };

    return <InteractiveWrapper />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing the current sort configuration when options are selected',
      },
    },
  },
};
