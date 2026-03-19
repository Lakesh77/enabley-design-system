import { useState } from 'react';
import './Toggle.css';

export default function Toggle({ label, checked: ctrl, defaultChecked = false, disabled = false, onChange }) {
  const isControlled = ctrl !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const checked = isControlled ? ctrl : internal;

  function handleChange(e) {
    if (!isControlled) setInternal(e.target.checked);
    onChange?.(e.target.checked);
  }

  return (
    <label className={`en-toggle ${disabled ? 'en-toggle--disabled' : ''}`}>
      <span className="en-toggle__track">
        <input
          type="checkbox"
          className="en-toggle__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className="en-toggle__thumb" />
      </span>
      {label && <span className="en-toggle__label">{label}</span>}
    </label>
  );
}
