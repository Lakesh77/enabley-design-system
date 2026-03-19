import './Spinner.css';
export default function Spinner({ size = 'md' }) {
  return <div className={`en-spinner en-spinner--${size}`} role="status" aria-label="Loading" />;
}
