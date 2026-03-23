import { useState } from 'react';
import ManageLearners from '../components/ManageLearners';
import Button from '../components/Button';
import './ManageLearnersPage.css';

/**
 * ManageLearnersPage — standalone page wrapping the ManageLearners panel.
 * Can be used as a full route page or embedded anywhere independently.
 */
export default function ManageLearnersPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mlp-page">
      {/* page header */}
      <div className="mlp-topbar">
        <div className="mlp-topbar__left">
          <div className="mlp-logo">
            <span className="mlp-logo__name">enabley↗</span>
            <span className="mlp-logo__sub">LMS Platform</span>
          </div>
          <nav className="mlp-breadcrumb">
            <span>Courses</span>
            <span className="mlp-breadcrumb__sep">›</span>
            <span>Sales Onboarding Q1</span>
            <span className="mlp-breadcrumb__sep">›</span>
            <span className="mlp-breadcrumb__active">Manage Learners</span>
          </nav>
        </div>
        <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
          + Manage Learners
        </Button>
      </div>

      {/* course card */}
      <div className="mlp-body">
        <div className="mlp-course-card">
          <div className="mlp-course-card__header">
            <div>
              <h1 className="mlp-course-card__title">Sales Onboarding Q1</h1>
              <p className="mlp-course-card__meta">Created by Ravid Ron · 7 learners enrolled · Last updated Mar 2026</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Manage Learners</Button>
          </div>

          <div className="mlp-stats">
            <div className="mlp-stat">
              <span className="mlp-stat__val">7</span>
              <span className="mlp-stat__label">Total Enrolled</span>
            </div>
            <div className="mlp-stat">
              <span className="mlp-stat__val">7</span>
              <span className="mlp-stat__label">Joined</span>
            </div>
            <div className="mlp-stat">
              <span className="mlp-stat__val">3</span>
              <span className="mlp-stat__label">Direct</span>
            </div>
            <div className="mlp-stat">
              <span className="mlp-stat__val">2</span>
              <span className="mlp-stat__label">Via Learning Plan</span>
            </div>
            <div className="mlp-stat">
              <span className="mlp-stat__val">2</span>
              <span className="mlp-stat__label">Via Group</span>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {open && (
        <div
          className="mlp-overlay"
          onClick={e => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="mlp-modal">
            <div className="mlp-modal__header">
              <span className="mlp-modal__title">Manage Learners</span>
              <button className="mlp-modal__close" onClick={() => setOpen(false)}>×</button>
            </div>
            <ManageLearners onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
