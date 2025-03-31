import React from 'react';
import Header from '@components/layout/Header';
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
export const GenericPage: React.FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <div>
      <Header showSearch={false} />
      <section className="page">
        <PageNotAvailable pageName={pageName} />
      </section>
    </div>
  );
};
