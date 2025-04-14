import { HTMLAttributes } from 'react';
import { HTMLAttributes } from 'react';

/**
 * A Text component
 *
 * This component renders text content with configurable element type, styling, and other properties.
 *
 * Props:
 * - `text` (string): The text content to display
 * - `as` (string): HTML element to render ('p', 'h1', 'h2', 'span', etc.). Defaults to 'p'
 * - `className` (string, optional): CSS class names for styling
 * - `style` (React.CSSProperties, optional): Inline styles
 * - `...rest`: Any additional props will be passed to the rendered element
 */
interface TextProps extends HTMLAttributes<HTMLElement> {
  text?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
}

const Text = ({ text, as = 'p', className, style, children, ...rest }: TextProps) => {
  const Element = as;

  return (
    <Element className={className} style={style} {...rest}>
      {text || children}
    </Element>
  );
};
export default Text;
