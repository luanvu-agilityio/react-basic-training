import React from 'react';
import './index.css';
import { Title } from '@components/common/Title';
import { Description } from '@components/common/Description';
import { Subtitle } from '@components/common/Subtitle';

const PageNotAvailable: React.FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <div className="page-not-available">
      <div className="page__header">
        <Title className="page__title" title={pageName} />
      </div>
      <div className="page-not-available__content">
        <div className="page-not-available__icon">
          <img
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868072/page-not-found_omhbr6.png"
            alt="Page Not Found"
            loading="lazy"
          />
        </div>
        <Subtitle
          className="page-not-available__title"
          subtitle="Page not available at the moment"
        />
        <Description
          className="page-not-available__message"
          description="This feature is under development and will be updated soon. Please check back later."
        />
      </div>
    </div>
  );
};
export default PageNotAvailable;
