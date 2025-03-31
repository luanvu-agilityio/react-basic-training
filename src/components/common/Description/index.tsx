import React from 'react';

interface DescriptionProps {
  description: string;
  className?: string;
}

export const Description: React.FC<DescriptionProps> = ({ description, className }) => (
  <p className={className}>{description}</p>
);
