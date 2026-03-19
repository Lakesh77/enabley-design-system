import { useState } from 'react';
import './Tabs.css';

export default function Tabs({ tabs = [], defaultTab }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key);
  const current = tabs.find(t => t.key === active);
  return (
    <div className="en-tabs">
      <div className="en-tabs__bar">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`en-tabs__tab ${active === t.key ? 'en-tabs__tab--active' : ''}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="en-tabs__panel">{current?.content}</div>
    </div>
  );
}
