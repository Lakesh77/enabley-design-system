import { useEffect } from 'react';
import './Modal.css';

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose?.(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="en-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="en-modal" role="dialog" aria-modal="true">
        <div className="en-modal__head">
          <span className="en-modal__title">{title}</span>
          <button className="en-modal__close" onClick={onClose}>×</button>
        </div>
        <div className="en-modal__body">{children}</div>
        {footer && <div className="en-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
