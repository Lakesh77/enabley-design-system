import { useState } from 'react';
import Badge from './Badge';
import Tooltip from './Tooltip';
import Button from './Button';
import './ManageLearners.css';

/* ── mock data ───────────────────────────────────────────────────── */
const LEARNERS = [
  {
    id: 1,
    username: 'learner_1',
    name: 'Adam Sharman',
    status: 'Joined',
    source: 'direct',
    sourceLabel: null,
  },
  {
    id: 2,
    username: 'ohad.green@enabley.io',
    name: 'Ohad Green',
    status: 'Joined',
    source: 'plan',
    sourceLabel: 'Sales Onboarding Q1',
  },
  {
    id: 3,
    username: 'ravid.ron@enabley.io',
    name: 'Training Manager',
    status: 'Joined',
    source: 'plan',
    sourceLabel: 'Leadership Track',
  },
  {
    id: 4,
    username: 'michael.williams@enabley.io',
    name: 'Michael Williams',
    status: 'Joined',
    source: 'direct',
    sourceLabel: null,
  },
  {
    id: 5,
    username: '972538791430@mock.xyz',
    name: 'Anna Shishkova',
    status: 'Joined',
    source: 'group',
    sourceLabel: 'EMEA Sales Team',
  },
  {
    id: 6,
    username: 'instructor_1',
    name: 'David instructor_1',
    status: 'Joined',
    source: 'direct',
    sourceLabel: null,
  },
  {
    id: 7,
    username: 'sweta.shrestha@enabley.io',
    name: 'Sweta Shrestha',
    status: 'Joined',
    source: 'group',
    sourceLabel: 'APAC Managers',
  },
];

/* ── source badge config ─────────────────────────────────────────── */
const SOURCE_CONFIG = {
  direct: { variant: 'success', icon: '👤', label: 'Direct' },
  plan:   { variant: 'info',    icon: '📋', label: 'Learning Plan' },
  group:  { variant: 'primary', icon: '👥', label: 'Group' },
};

function SourceBadge({ source, sourceLabel }) {
  const cfg = SOURCE_CONFIG[source];
  const text = sourceLabel ? `${cfg.label}: ${sourceLabel}` : cfg.label;

  return (
    <Tooltip content={text} position="top">
      <span className="ml-source">
        <Badge variant={cfg.variant} size="sm">
          <span className="ml-source__icon">{cfg.icon}</span>
          <span className="ml-source__text">
            {sourceLabel
              ? <><strong>{cfg.label}</strong> · {sourceLabel}</>
              : cfg.label}
          </span>
        </Badge>
      </span>
    </Tooltip>
  );
}

const NAV_ITEMS = ['Manage Learners', 'Invite Learners', 'Share Link'];

export default function ManageLearners({ onClose }) {
  const [navActive, setNavActive] = useState('Manage Learners');
  const [learners] = useState(LEARNERS);

  const joinedCount = learners.filter(l => l.status === 'Joined').length;

  return (
    <div className="ml-shell">
      {/* ── sidebar ── */}
      <aside className="ml-sidebar">
        {NAV_ITEMS.map(item => (
          <button
            key={item}
            className={`ml-sidebar__item${navActive === item ? ' ml-sidebar__item--active' : ''}`}
            onClick={() => setNavActive(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      {/* ── main panel ── */}
      <div className="ml-main">
        {navActive === 'Manage Learners' && (
          <>
            {/* header row */}
            <div className="ml-header">
              <div className="ml-header__stat">
                <svg className="ml-header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="ml-header__count">
                  <strong>{joinedCount}</strong>
                  <span className="ml-header__total">/{learners.length}</span>
                </span>
                <span className="ml-header__label">Joined Users</span>
              </div>
              <Button variant="primary" size="sm">MANAGE</Button>
            </div>

            {/* legend */}
            <div className="ml-legend">
              <span className="ml-legend__item">
                <Badge variant="success" size="sm">👤 Direct</Badge>
                <span>Assigned to course directly — can be removed or promoted</span>
              </span>
              <span className="ml-legend__item">
                <Badge variant="info" size="sm">📋 Learning Plan</Badge>
                <span>Managed by a learning plan — read-only</span>
              </span>
              <span className="ml-legend__item">
                <Badge variant="primary" size="sm">👥 Group</Badge>
                <span>Assigned via group membership — read-only</span>
              </span>
            </div>

            {/* table */}
            <table className="ml-table">
              <colgroup>
                <col /><col /><col /><col /><col />
              </colgroup>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Assignment</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {learners.map(l => {
                  const canManage = l.source === 'direct';
                  return (
                    <tr key={l.id} className={canManage ? '' : 'ml-table__row--readonly'}>
                      <td className="ml-table__username">
                        {l.source === 'group' && (
                          <svg className="ml-table__group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                          </svg>
                        )}
                        {l.username}
                      </td>
                      <td>{l.name}</td>
                      <td>
                        <span className="ml-status">{l.status}</span>
                      </td>
                      <td>
                        <SourceBadge source={l.source} sourceLabel={l.sourceLabel} />
                      </td>
                      <td className="ml-table__actions">
                        {canManage ? (
                          <Tooltip content="Manage learner" position="left">
                            <button className="ml-cog" aria-label="Manage">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                              </svg>
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content={
                              l.source === 'plan'
                                ? `Managed by "${l.sourceLabel}" learning plan`
                                : `Managed via "${l.sourceLabel}" group`
                            }
                            position="left"
                          >
                            <span className="ml-locked" aria-label="Locked">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                            </span>
                          </Tooltip>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {navActive === 'Invite Learners' && (
          <div className="ml-placeholder">
            <p>Invite new learners to this course by email or username.</p>
          </div>
        )}

        {navActive === 'Share Link' && (
          <div className="ml-placeholder">
            <p>Share a direct enrollment link for this course.</p>
          </div>
        )}
      </div>
    </div>
  );
}
