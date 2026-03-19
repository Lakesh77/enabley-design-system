import './Input.css';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  state = 'default',   // default | error | disabled
  helperText,
  leadingIcon,
  trailingIcon,
  rows,                // if rows provided → renders textarea
}) {
  const isError    = state === 'error';
  const isDisabled = state === 'disabled';

  return (
    <div className="en-field">
      {label && <label className="en-label">{label}</label>}
      <div className={`en-input-wrap ${isError ? 'en-input-wrap--error' : ''} ${isDisabled ? 'en-input-wrap--disabled' : ''}`}>
        {leadingIcon && <span className="en-input-icon">{leadingIcon}</span>}
        {rows ? (
          <textarea
            className="en-input"
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            rows={rows}
          />
        ) : (
          <input
            className="en-input"
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
          />
        )}
        {trailingIcon && <span className="en-input-icon">{trailingIcon}</span>}
      </div>
      {helperText && (
        <span className={`en-field-hint ${isError ? 'en-field-hint--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}
