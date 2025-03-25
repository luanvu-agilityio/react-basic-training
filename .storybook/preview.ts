import type { Preview } from '@storybook/react';
import '../src/components/common/toast/Toast.css';
import '../src/styles/index.css';
import '../src/pages/LoginPage.css';
import '../src/components/layout/sidebar/Sidebar.css';
import '../src/components/layout/header/Header.css';
import '../src/components/common/buttons/Button.css';
import '../src/components/student/SortDropdown.css';
import '../src/components/common/pagination/Pagination.css';
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
