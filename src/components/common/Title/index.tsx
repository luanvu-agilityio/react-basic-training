interface TitleProps {
  title: string;
  className?: string;
}

const Title = ({ title, className = 'title' }: TitleProps) => (
  <h1 className={className}>{title}</h1>
);
export default Title;
