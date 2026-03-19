import './Radio.css';

export default function Radio({ label, name, value, checked, onChange, disabled = false }) {
  return (
    <label className={`en-radio ${disabled ? 'en-radio--disabled' : ''}`}>
      <span className={`en-radio__circle ${checked ? 'en-radio__circle--selected' : ''}`}>
        <span className="en-radio__dot" />
        <input
          type="radio"
          className="en-radio__input"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      </span>
      {label && <span className="en-radio__label">{label}</span>}
    </label>
  );
}

export function RadioGroup({ name, options = [], value, onChange }) {
  return (
    <div className="en-radio-group">
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          checked={value === opt.value}
          disabled={opt.disabled}
          onChange={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
