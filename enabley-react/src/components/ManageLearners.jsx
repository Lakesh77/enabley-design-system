import { useState, useMemo } from 'react';
import Avatar from './Avatar';
import Badge from './Badge';
import Tooltip from './Tooltip';
import Button from './Button';
import './ManageLearners.css';

/* ── mock data ───────────────────────────────────────────────────── */
const LEARNERS = [
  { id: 1, username: 'learner_1',                    name: 'Adam Sharman',     status: 'Joined', source: 'direct', sourceLabel: null },
  { id: 2, username: 'ohad.green@enabley.io',        name: 'Ohad Green',       status: 'Joined', source: 'plan',   sourceLabel: 'Sales Onboarding Q1' },
  { id: 3, username: 'ravid.ron@enabley.io',         name: 'Training Manager', status: 'Joined', source: 'plan',   sourceLabel: 'Leadership Track' },
  { id: 4, username: 'michael.williams@enabley.io',  name: 'Michael Williams', status: 'Joined', source: 'direct', sourceLabel: null },
  { id: 5, username: '972538791430@mock.xyz',         name: 'Anna Shishkova',   status: 'Joined', source: 'group',  sourceLabel: 'EMEA Sales Team' },
  { id: 6, username: 'instructor_1',                 name: 'David Instructor', status: 'Joined', source: 'direct', sourceLabel: null },
  { id: 7, username: 'sweta.shrestha@enabley.io',    name: 'Sweta Shrestha',   status: 'Joined', source: 'group',  sourceLabel: 'APAC Managers' },
];

const SOURCE_CONFIG = {
  direct: { variant: 'success', icon: '👤', label: 'Direct' },
  plan:   { variant: 'info',    icon: '📋', label: 'Learning Plan' },
  group:  { variant: 'primary', icon: '👥', label: 'Group' },
};

const COLUMNS = [
  { key: 'name',        label: 'Full Name',   sortable: true  },
  { key: 'username',    label: 'Username',    sortable: true  },
  { key: 'status',      label: 'Status',      sortable: false },
  { key: 'source',      label: 'Assignment',  sortable: true  },
  { key: 'actions',     label: 'Actions',     sortable: false },
];

/* ── sub-components ──────────────────────────────────────────────── */
function SortIcon({ direction }) {
  return (
    <span className="ml-sort-icon">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M4 0L7.46 4H0.54L4 0Z" fill={direction === 'asc'  ? 'var(--primary)' : 'var(--primary-l1)'} />
        <path d="M4 12L0.54 8H7.46L4 12Z" fill={direction === 'desc' ? 'var(--primary)' : 'var(--primary-l1)'} />
      </svg>
    </span>
  );
}

function InfoIcon() {
  return (
    <svg className="ml-info-icon" width="11" height="11" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5.5" stroke="var(--grey)" />
      <path d="M6 5.5V8.5M6 3.5V4" stroke="var(--grey)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SourceBadge({ source, sourceLabel }) {
  const cfg = SOURCE_CONFIG[source];
  const tooltip = sourceLabel ? `${cfg.label}: ${sourceLabel}` : cfg.label;
  return (
    <Tooltip content={tooltip} position="top">
      <span className="ml-source">
        <Badge variant={cfg.variant} size="sm">
          <span className="ml-source__icon">{cfg.icon}</span>
          <span className="ml-source__text">
            {sourceLabel ? <><strong>{cfg.label}</strong> · {sourceLabel}</> : cfg.label}
          </span>
        </Badge>
      </span>
    </Tooltip>
  );
}

const NAV_ITEMS = ['Manage Learners', 'Invite Learners', 'Share Link'];

/* ── main component ──────────────────────────────────────────────── */
export default function ManageLearners({ onClose }) {
  const [navActive, setNavActive] = useState('Manage Learners');
  const [sortKey, setSortKey]     = useState('name');
  const [sortDir, setSortDir]     = useState('asc');
  const [search, setSearch]       = useState('');

  const joinedCount = LEARNERS.filter(l => l.status === 'Joined').length;

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = LEARNERS.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.username.toLowerCase().includes(q) ||
      (l.sourceLabel || '').toLowerCase().includes(q)
    );
    return [...filtered].sort((a, b) => {
      const va = a[sortKey] ?? '';
      const vb = b[sortKey] ?? '';
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ?  1 : -1;
      return 0;
    });
  }, [search, sortKey, sortDir]);

  return (
    <div className="ml-shell">
      {/* sidebar */}
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

      {/* main */}
      <div className="ml-main">
        {navActive === 'Manage Learners' && (
          <>
            {/* header */}
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
                  <span className="ml-header__total">/{LEARNERS.length}</span>
                </span>
                <span className="ml-header__label">Joined Users</span>
              </div>
              <Button variant="primary" size="sm">MANAGE</Button>
            </div>

            {/* legend */}
            <div className="ml-legend">
              <span className="ml-legend__item"><Badge variant="success" size="sm">👤 Direct</Badge><span>Assigned directly — can be removed or promoted</span></span>
              <span className="ml-legend__item"><Badge variant="info"    size="sm">📋 Learning Plan</Badge><span>Managed by a learning plan — read-only</span></span>
              <span className="ml-legend__item"><Badge variant="primary" size="sm">👥 Group</Badge><span>Assigned via group — read-only</span></span>
            </div>

            {/* toolbar */}
            <div className="ml-toolbar">
              <div className="ml-search">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="var(--grey)" strokeWidth="1.4"/>
                  <path d="M10 10L13 13" stroke="var(--grey)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input
                  className="ml-search__input"
                  type="text"
                  placeholder="Search learners…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <span className="ml-count">{rows.length} learners</span>
            </div>

            {/* table */}
            <div className="ml-table-scroll">
              <table className="ml-table">
                <thead>
                  <tr>
                    {COLUMNS.map(col => (
                      <th
                        key={col.key}
                        className={`ml-th${col.sortable ? ' ml-th--sortable' : ''}`}
                        onClick={() => col.sortable && handleSort(col.key)}
                      >
                        <span className="ml-th__inner">
                          <span className="ml-th__label">{col.label}</span>
                          {col.sortable && <InfoIcon />}
                          {col.sortable && <SortIcon direction={sortKey === col.key ? sortDir : null} />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr><td className="ml-empty" colSpan={COLUMNS.length}>No learners match your search.</td></tr>
                  ) : rows.map(l => {
                    const canManage = l.source === 'direct';
                    return (
                      <tr key={l.id} className={`ml-row${canManage ? '' : ' ml-row--readonly'}`}>
                        {/* name + avatar */}
                        <td className="ml-td ml-td--name">
                          <div className="ml-cell-name">
                            <Avatar name={l.name} size="xs" />
                            <span className="ml-cell-name__text">{l.name}</span>
                          </div>
                        </td>

                        {/* username */}
                        <td className="ml-td ml-td--username">
                          {l.source === 'group' && (
                            <svg className="ml-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                          )}
                          {l.username}
                        </td>

                        {/* status */}
                        <td className="ml-td">
                          <Badge variant="success" size="sm">{l.status}</Badge>
                        </td>

                        {/* assignment source */}
                        <td className="ml-td">
                          <SourceBadge source={l.source} sourceLabel={l.sourceLabel} />
                        </td>

                        {/* actions */}
                        <td className="ml-td ml-td--actions">
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
                              content={l.source === 'plan' ? `Managed by "${l.sourceLabel}"` : `Via "${l.sourceLabel}" group`}
                              position="left"
                            >
                              <span className="ml-locked">
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
            </div>
          </>
        )}

        {navActive === 'Invite Learners' && (
          <div className="ml-placeholder"><p>Invite new learners to this course by email or username.</p></div>
        )}

        {navActive === 'Share Link' && (
          <div className="ml-placeholder"><p>Share a direct enrollment link for this course.</p></div>
        )}
      </div>
    </div>
  );
}
