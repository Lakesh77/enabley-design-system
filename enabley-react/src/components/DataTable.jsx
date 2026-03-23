import { useState, useMemo } from 'react';
import Avatar from './Avatar';
import Badge from './Badge';
import Progress from './Progress';
import './DataTable.css';

/* ── mock data ────────────────────────────────────────────────── */
const MOCK_DATA = [
  { id: 1, name: 'Ido Miran',        email: 'ido.miran@enabley.io',    course: 'Sales Onboarding',      score: 92,  progress: 100, status: 'passed',     expiry: '2025-06-01', duration: '4h 20m' },
  { id: 2, name: 'Anna Shishkova',   email: 'anna.s@enabley.io',       course: 'Leadership Track',      score: 78,  progress: 80,  status: 'in-progress', expiry: '2025-09-14', duration: '2h 05m' },
  { id: 3, name: 'Ohad Green',       email: 'ohad.green@enabley.io',   course: 'Product Management',   score: 55,  progress: 60,  status: 'failed',      expiry: '2025-03-30', duration: '3h 40m' },
  { id: 4, name: 'Michael Williams', email: 'michael.w@enabley.io',    course: 'Data Analytics 101',   score: null, progress: 20, status: 'not-started', expiry: '2025-12-31', duration: '5h 00m' },
  { id: 5, name: 'Sweta Shrestha',   email: 'sweta.s@enabley.io',      course: 'Sales Onboarding',      score: 88,  progress: 100, status: 'passed',     expiry: '2025-07-22', duration: '4h 15m' },
  { id: 6, name: 'Ravid Ron',        email: 'ravid.ron@enabley.io',    course: 'Leadership Track',      score: 95,  progress: 100, status: 'passed',     expiry: '2026-01-10', duration: '2h 30m' },
  { id: 7, name: 'David Cohen',      email: 'david.c@enabley.io',      course: 'Data Analytics 101',   score: 42,  progress: 45,  status: 'failed',      expiry: '2025-04-15', duration: '1h 55m' },
  { id: 8, name: 'Sophie Laurent',   email: 'sophie.l@enabley.io',     course: 'Product Management',   score: 81,  progress: 90,  status: 'in-progress', expiry: '2025-11-01', duration: '3h 10m' },
];

const STATUS_MAP = {
  'passed':      { variant: 'success', label: 'Passed'      },
  'failed':      { variant: 'error',   label: 'Failed'      },
  'in-progress': { variant: 'info',    label: 'In Progress' },
  'not-started': { variant: 'grey',    label: 'Not Started' },
};

const COLUMNS = [
  { key: 'name',     label: 'Full Name',         sortable: true  },
  { key: 'email',    label: 'Email',              sortable: true  },
  { key: 'course',   label: 'Course',             sortable: true  },
  { key: 'score',    label: 'Final Score',        sortable: true  },
  { key: 'progress', label: 'Progress',           sortable: true  },
  { key: 'status',   label: 'Completion Status',  sortable: true  },
  { key: 'expiry',   label: 'Expiration Date',    sortable: true  },
  { key: 'duration', label: 'Duration',           sortable: false },
];

function SortIcon({ direction }) {
  return (
    <span className="dt-sort-icon">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M4 0L7.46 4H0.54L4 0Z" fill={direction === 'asc' ? 'var(--primary)' : 'var(--primary-l1)'} />
        <path d="M4 12L0.54 8H7.46L4 12Z" fill={direction === 'desc' ? 'var(--primary)' : 'var(--primary-l1)'} />
      </svg>
    </span>
  );
}

function InfoIcon() {
  return (
    <svg className="dt-info-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5.5" stroke="var(--grey)" />
      <path d="M6 5.5V8.5M6 3.5V4" stroke="var(--grey)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function DataTable({ data = MOCK_DATA, columns = COLUMNS }) {
  const [sortKey, setSortKey]   = useState('name');
  const [sortDir, setSortDir]   = useState('asc');
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const pageSize = 6;

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.course.toLowerCase().includes(q)
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sortKey] ?? '';
      const vb = b[sortKey] ?? '';
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ?  1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData   = sorted.slice((page - 1) * pageSize, page * pageSize);

  function renderCell(row, col) {
    switch (col.key) {
      case 'name':
        return (
          <div className="dt-cell-name">
            <Avatar name={row.name} size="xs" />
            <span className="dt-cell-name__text">{row.name}</span>
          </div>
        );
      case 'progress':
        return (
          <div className="dt-cell-progress">
            <Progress value={row.progress} max={100} color="purple" showValue />
          </div>
        );
      case 'status': {
        const s = STATUS_MAP[row.status];
        return <Badge variant={s.variant} size="sm">{s.label}</Badge>;
      }
      case 'score':
        return row.score != null
          ? <span className="dt-cell-score">{row.score}</span>
          : <span className="dt-cell-null">—</span>;
      case 'expiry':
        return <span className="dt-cell-date">{row.expiry}</span>;
      default:
        return <span>{row[col.key]}</span>;
    }
  }

  return (
    <div className="dt-wrap">
      {/* toolbar */}
      <div className="dt-toolbar">
        <div className="dt-search">
          <svg className="dt-search__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="5" stroke="var(--grey)" strokeWidth="1.4" />
            <path d="M10 10L13 13" stroke="var(--grey)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            className="dt-search__input"
            type="text"
            placeholder="Search learners, courses…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <span className="dt-count">{filtered.length} learners</span>
      </div>

      {/* scrollable table */}
      <div className="dt-scroll">
        <table className="dt-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`dt-th${col.sortable ? ' dt-th--sortable' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="dt-th__inner">
                    <span className="dt-th__label">{col.label}</span>
                    <InfoIcon />
                    {col.sortable && (
                      <SortIcon direction={sortKey === col.key ? sortDir : null} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td className="dt-empty" colSpan={columns.length}>
                  No learners match your search.
                </td>
              </tr>
            ) : (
              pageData.map(row => (
                <tr key={row.id} className="dt-row">
                  {columns.map(col => (
                    <td key={col.key} className="dt-td">
                      {renderCell(row, col)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="dt-pagination">
          <button
            className="dt-page-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            ‹ Prev
          </button>
          <span className="dt-page-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="dt-page-btn"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
