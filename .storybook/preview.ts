import type { Preview } from '@storybook/react';
import '../src/components/common/Toast/index.css';
import '../src/styles/index.css';
import '../src/components/Sidebar/index.css';
import '../src/components/PageHeader/index.css';
import '../src/components/common/Button/index.css';
import '../src/components/StudentSortDropdown/index.css';
import '../src/components/common/Pagination/index.css';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
