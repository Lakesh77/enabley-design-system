import { useState } from 'react';
import './Alert.css';

const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

export default function Alert({ variant = 'info', title, children, dismissible = false }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className={`en-alert en-alert--${variant}`} role="alert">
      <span className="en-alert__icon">{icons[variant]}</span>
      <div className="en-alert__body">
        {title && <strong>{title} </strong>}
        {children}
      </div>
      {dismissible && (
        <button className="en-alert__close" onClick={() => setVisible(false)}>×</button>
      )}
    </div>
  );
}
