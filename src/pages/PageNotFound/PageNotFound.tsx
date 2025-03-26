import React from 'react';
import './PageNotFound.css';

const PageNotAvailable: React.FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <div className="page-not-available">
      <div className="page__header">
        <h1 className="page__title">{pageName}</h1>
      </div>
      <div className="page-not-available__content">
        <div className="page-not-available__icon">
          <img
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868072/page-not-found_omhbr6.png"
            alt="Page Not Found"
            loading="lazy"
          />
        </div>
        <h2 className="page-not-available__title">Page not available at the moment</h2>
        <p className="page-not-available__message">
          This feature is under development and will be updated soon. Please check back later.
        </p>
      </div>
    </div>
  );
};
export default PageNotAvailable;
