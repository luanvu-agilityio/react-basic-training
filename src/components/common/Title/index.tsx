import React from 'react';

interface TitleProps {
  title: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ title, className }) => (
  <h1 className={className}>{title}</h1>
);
