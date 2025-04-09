import React from 'react';

interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className = 'title' }) => (
  <h1 className={className}>{title}</h1>
);
export default Title;
