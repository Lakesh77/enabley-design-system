import { useState } from 'react';
import {
  Button, Input, Checkbox, RadioGroup, Toggle,
  Badge, Avatar, AvatarGroup, Progress,
  Alert, Modal, Tooltip, Tabs, Spinner,
} from './components';
import './App.css';

const NAV = [
  { id: 'colors',     label: 'Colors',       group: 'Foundation' },
  { id: 'typography', label: 'Typography',   group: 'Foundation' },
  { id: 'buttons',    label: 'Buttons',      group: 'Components' },
  { id: 'inputs',     label: 'Inputs',       group: 'Components' },
  { id: 'selection',  label: 'Selection',    group: 'Components' },
  { id: 'feedback',   label: 'Feedback',     group: 'Components' },
  { id: 'data',       label: 'Data Display', group: 'Components' },
  { id: 'overlay',    label: 'Overlay',      group: 'Components' },
];

function Story({ name, meta, children }) {
  return (
    <div className="sb-story">
      <div className="sb-story__head">
        <span className="sb-story__name">{name}</span>
        {meta && <span className="sb-story__meta">{meta}</span>}
      </div>
      <div className="sb-story__preview">{children}</div>
    </div>
  );
}

function Section({ id, title, desc, children }) {
  return (
    <section className="sb-section" id={id}>
      <h2 className="sb-section__title">{title}</h2>
      <p className="sb-section__desc">{desc}</p>
      {children}
    </section>
  );
}

function Swatch({ name, hex, bg }) {
  return (
    <div className="swatch">
      <div className="swatch__box" style={{ background: bg || hex }} />
      <div className="swatch__name">{name}</div>
      <div className="swatch__hex">{hex || '—'}</div>
    </div>
  );
}

export default function App() {
  const [active, setActive]   = useState('colors');
  const [modal1, setModal1]   = useState(false);
  const [radioVal, setRadioVal] = useState('open');

  const groups = [...new Set(NAV.map(n => n.group))];

  function scrollTo(id) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="sb-layout">

      {/* ── Sidebar ── */}
      <nav className="sb-nav">
        <div className="sb-nav__logo">
          <div className="sb-nav__logo-name">enabley↗</div>
          <div className="sb-nav__logo-sub">Design System v2.0</div>
        </div>
        {groups.map(g => (
          <div key={g}>
            <div className="sb-nav__group">{g}</div>
            {NAV.filter(n => n.group === g).map(n => (
              <button
                key={n.id}
                className={`sb-nav__item ${active === n.id ? 'sb-nav__item--active' : ''}`}
                onClick={() => scrollTo(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* ── Main ── */}
      <div className="sb-main">
        <header className="sb-topbar">
          <h1>Design System Storybook</h1>
          <Badge variant="primary">Enabley v2.0</Badge>
          <Badge variant="success">React + Vite</Badge>
        </header>

        <div className="sb-content">

          {/* COLORS */}
          <Section id="colors" title="Colors" desc="Brand and semantic tokens extracted from the Enabley Figma design system.">
            <Story name="Brand Palette">
              <div className="sb-swatches">
                <Swatch name="Primary"  hex="#9A2496" />
                <Swatch name="Mid"      hex="#7E3495" />
                <Swatch name="Dark"     hex="#4E2B6A" />
                <Swatch name="Light-1"  hex="#C0A9C7" />
                <Swatch name="Light-2"  hex="#F1E9F3" />
                <Swatch name="Gradient" hex="135°" bg="linear-gradient(135deg,#9a2496,#4e2b6a)" />
              </div>
              <div className="sb-swatches" style={{ marginTop: 12 }}>
                <Swatch name="Text"  hex="#3A3A3A" />
                <Swatch name="Grey"  hex="#8195A3" />
                <Swatch name="Error" hex="#F2566E" />
                <Swatch name="Orange" hex="#F05A28" />
                <Swatch name="Green" hex="#28A745" />
                <Swatch name="Blue"  hex="#4E6CFF" />
                <Swatch name="Red"   hex="#DC3545" />
              </div>
            </Story>
          </Section>

          {/* TYPOGRAPHY */}
          <Section id="typography" title="Typography" desc="Lexend variable font — weights 300–700.">
            <Story name="Type Scale">
              <div className="sb-type-scale">
                {[
                  { label: 'Display',   size: 32, weight: 700 },
                  { label: 'Heading 1', size: 24, weight: 700 },
                  { label: 'Heading 2', size: 20, weight: 600 },
                  { label: 'Heading 3', size: 16, weight: 600 },
                  { label: 'Body',      size: 14, weight: 400 },
                  { label: 'Small',     size: 13, weight: 400, color: '#8195a3' },
                ].map(t => (
                  <div key={t.label} className="sb-type-row">
                    <span style={{ fontSize: t.size, fontWeight: t.weight, color: t.color }}>
                      {t.label} — The quick brown fox jumps over the lazy dog.
                    </span>
                    <span className="sb-type-meta">{t.size}px / {t.weight}</span>
                  </div>
                ))}
              </div>
            </Story>
          </Section>

          {/* BUTTONS */}
          <Section id="buttons" title="Buttons" desc="Pill-shaped (30px radius). Three variants, three sizes, icon and disabled support.">
            <Story name="Variants" meta="primary · ghost · gradient · dark · danger">
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="gradient">Gradient</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </Story>
            <Story name="Sizes" meta="sm · md · lg">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="ghost" size="sm">Ghost sm</Button>
              <Button variant="ghost" size="md">Ghost md</Button>
              <Button variant="ghost" size="lg">Ghost lg</Button>
            </Story>
            <Story name="With Icons">
              <Button variant="primary" icon={
                <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
              }>Message</Button>
              <Button variant="gradient" icon={
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14m-7-7h14"/>
                </svg>
              }>Add Course</Button>
              <Button variant="ghost" iconPosition="right" icon={
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-7 9v-2H5v2h14v-2h-7z"/>
                </svg>
              }>Export</Button>
            </Story>
          </Section>

          {/* INPUTS */}
          <Section id="inputs" title="Inputs" desc="4px radius. States: default, focus (purple), error, disabled.">
            <Story name="All States">
              <div className="sb-grid-2">
                <Input label="Default" placeholder="Enter course title…" />
                <Input label="Error state" defaultValue="invalid@" state="error" helperText="Please enter a valid email address." />
                <Input label="Disabled" placeholder="Read-only field" state="disabled" helperText="This field cannot be edited." />
                <Input label="Textarea" placeholder="Course description…" rows={3} />
              </div>
            </Story>
          </Section>

          {/* SELECTION */}
          <Section id="selection" title="Selection Controls" desc="Checkbox, Radio, and Toggle — fully interactive.">
            <Story name="Checkbox" meta="click to toggle">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked (default)" defaultChecked />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled + Checked" disabled defaultChecked />
            </Story>
            <Story name="Radio Group" meta="click to select">
              <RadioGroup
                name="enrolment"
                value={radioVal}
                onChange={setRadioVal}
                options={[
                  { value: 'open',    label: 'Open Enrolment' },
                  { value: 'manager', label: 'Manager Approval Required' },
                  { value: 'admin',   label: 'Admin Only' },
                ]}
              />
            </Story>
            <Story name="Toggle Switch" meta="click to toggle">
              <Toggle label="Self-enrolment enabled" defaultChecked />
              <Toggle label="Certificate on completion" />
              <Toggle label="Discussion forum active" defaultChecked />
              <Toggle label="Disabled toggle" disabled />
            </Story>
          </Section>

          {/* FEEDBACK */}
          <Section id="feedback" title="Feedback" desc="Progress bars, alerts, badges, and spinners.">
            <Story name="Progress Bars" meta="green · blue · red · purple">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
                <Progress label="Course progress" value={75}  color="purple" />
                <Progress label="Quiz score"       value={50}  color="blue" />
                <Progress label="Failed attempts"  value={40}  color="red" />
                <Progress label="Completed"        value={100} color="green" />
              </div>
            </Story>
            <Story name="Alerts" meta="click × to dismiss">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <Alert variant="success" title="Success!" dismissible>Course published and visible to learners.</Alert>
                <Alert variant="error"   title="Error!"   dismissible>Failed to save. Check your connection.</Alert>
                <Alert variant="warning" title="Warning!" dismissible>No content yet. Add a module before publishing.</Alert>
                <Alert variant="info"    title="Info."    dismissible>Learners will be notified on publish.</Alert>
              </div>
            </Story>
            <Story name="Badges">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Completed</Badge>
              <Badge variant="error">Failed</Badge>
              <Badge variant="warning">In Progress</Badge>
              <Badge variant="info">New</Badge>
              <Badge variant="grey">Draft</Badge>
              <Badge variant="solid">Live</Badge>
            </Story>
            <Story name="Spinners" meta="sm · md · lg">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </Story>
          </Section>

          {/* DATA DISPLAY */}
          <Section id="data" title="Data Display" desc="Avatars, avatar groups, and tabs.">
            <Story name="Avatars" meta="xs · sm · md · lg · xl">
              <Avatar name="Sarah Anderson" size="xs" />
              <Avatar name="Alex Johnson"   size="sm" />
              <Avatar name="Maria Kim"      size="md" />
              <Avatar name="Tom Park"       size="lg" />
              <Avatar name="Priya Patel"    size="xl" />
            </Story>
            <Story name="Avatar Group">
              <AvatarGroup
                users={[
                  { name: 'Sarah Anderson' },
                  { name: 'Alex Johnson' },
                  { name: 'Maria Kim' },
                  { name: 'Tom Park' },
                  { name: 'Priya Patel' },
                  { name: 'Carlos Ruiz' },
                ]}
                max={4}
              />
            </Story>
            <Story name="Tabs" meta="click to switch">
              <Tabs
                tabs={[
                  { key: 'overview', label: 'Overview', content: 'Course overview: track progress, completions and engagement metrics.' },
                  { key: 'learners', label: 'Learners', content: 'Manage enrolled learners, send reminders, review individual progress.' },
                  { key: 'content',  label: 'Content',  content: 'Add, edit and reorder modules, quizzes, and learning assets.' },
                  { key: 'settings', label: 'Settings', content: 'Configure enrolment type, notifications, certificates and visibility.' },
                ]}
              />
            </Story>
          </Section>

          {/* OVERLAY */}
          <Section id="overlay" title="Overlay" desc="Tooltips and modals.">
            <Story name="Tooltip" meta="hover to reveal">
              <Tooltip content="This action cannot be undone">
                <Button variant="primary" size="sm">Top tooltip</Button>
              </Tooltip>
              <Tooltip content="Opens in new window" position="right">
                <Button variant="ghost" size="sm">Right tooltip</Button>
              </Tooltip>
            </Story>
            <Story name="Modal">
              <Button variant="primary" onClick={() => setModal1(true)}>Open Modal</Button>
              <Modal
                open={modal1}
                onClose={() => setModal1(false)}
                title="Create New Course"
                footer={
                  <>
                    <Button variant="ghost" size="sm" onClick={() => setModal1(false)}>Cancel</Button>
                    <Button variant="gradient" size="sm">Create Course</Button>
                  </>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input label="Course Title" placeholder="e.g. Introduction to Design Thinking" />
                  <Input label="Description" placeholder="Describe the learning objectives…" rows={3} />
                </div>
              </Modal>
            </Story>
          </Section>

        </div>
      </div>
    </div>
  );
}
