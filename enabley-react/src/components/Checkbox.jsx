import { useState } from 'react';
import './Checkbox.css';

export default function Checkbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  onChange,
}) {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  function handleChange(e) {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  }

  return (
    <label className={`en-checkbox ${disabled ? 'en-checkbox--disabled' : ''}`}>
      <span className={`en-checkbox__box ${checked || indeterminate ? 'en-checkbox__box--checked' : ''}`}>
        {indeterminate && !checked && (
          <svg width="10" height="2" fill="none" stroke="white" strokeWidth="2.5"><line x1="0" y1="1" x2="10" y2="1"/></svg>
        )}
        {checked && (
          <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        )}
        <input
          type="checkbox"
          className="en-checkbox__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
      </span>
      {label && <span className="en-checkbox__label">{label}</span>}
    </label>
  );
}
