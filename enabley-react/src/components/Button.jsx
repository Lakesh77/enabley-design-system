import './Button.css';

export default function Button({
  variant = 'primary',   // primary | ghost | gradient | dark | danger
  size = 'md',           // sm | md | lg
  children,
  icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  className = '',
}) {
  return (
    <button
      className={`en-btn en-btn--${variant} en-btn--${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && <span className="en-btn__icon">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="en-btn__icon">{icon}</span>}
    </button>
  );
}
