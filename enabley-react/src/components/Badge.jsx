import './Badge.css';

export default function Badge({ children, variant = 'primary', size = 'md' }) {
  return (
    <span className={`en-badge en-badge--${variant} en-badge--${size}`}>
      {children}
    </span>
  );
}
