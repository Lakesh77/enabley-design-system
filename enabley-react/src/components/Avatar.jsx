import './Avatar.css';

const gradients = [
  'linear-gradient(135deg,#9a2496,#4e2b6a)',
  'linear-gradient(135deg,#0ea5e9,#0369a1)',
  'linear-gradient(135deg,#22c55e,#15803d)',
  'linear-gradient(135deg,#f05a28,#c0390a)',
];

export default function Avatar({ name, src, size = 'md', style = {} }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  const bg = gradients[(name?.charCodeAt(0) || 0) % gradients.length];

  return (
    <div className={`en-avatar en-avatar--${size}`} style={{ background: bg, ...style }}>
      {src ? <img src={src} alt={name} className="en-avatar__img" /> : initials}
    </div>
  );
}

export function AvatarGroup({ users = [], max = 4 }) {
  const visible = users.slice(0, max);
  const extra   = users.length - max;
  return (
    <div className="en-avatar-group">
      {visible.map((u, i) => <Avatar key={i} name={u.name} src={u.src} size="md" />)}
      {extra > 0 && (
        <div className="en-avatar en-avatar--md en-avatar--extra">+{extra}</div>
      )}
    </div>
  );
}
