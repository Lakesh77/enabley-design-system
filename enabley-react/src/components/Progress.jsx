import './Progress.css';

export default function Progress({ value = 0, max = 100, color = 'purple', label, showValue = true }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="en-progress">
      {(label || showValue) && (
        <div className="en-progress__header">
          {label && <span className="en-progress__label">{label}</span>}
          {showValue && <span className="en-progress__value">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="en-progress__track">
        <div
          className={`en-progress__fill en-progress__fill--${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
