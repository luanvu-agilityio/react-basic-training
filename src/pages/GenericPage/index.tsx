import React, { JSX } from 'react';
import PageHeader from '@components/PageHeader';
import PageNotAvailable from '@pages/PageNotFound';

/**
 * GenericPage Component
 *
 * Placeholder component for routes that are defined but not yet implemented.
 * Displays the page name and a message indicating that the page is under development.
 *
 * @param {Object} props - Component props
 * @param {string} props.pageName - Name of the page to display
 * @returns {JSX.Element} Generic page placeholder
 */
export const GenericPage = ({ pageName }: { pageName: string }): JSX.Element => {
  return (
    <div>
      <PageHeader showSearch={false} />
      <section className="page">
        <PageNotAvailable pageName={pageName} />
      </section>
    </div>
  );
};
