import './Tooltip.css';

export default function Tooltip({ children, content, position = 'top' }) {
  return (
    <span className="en-tooltip-wrap">
      {children}
      <span className={`en-tooltip en-tooltip--${position}`}>{content}</span>
    </span>
  );
}
