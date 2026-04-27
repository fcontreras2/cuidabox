/* global lucide */
const Icon = ({ name, className = '', strokeWidth = 2, size }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.innerHTML = '';
    const icons = lucide.icons || lucide;
    const data = icons[name] || icons[name.charAt(0).toUpperCase() + name.slice(1)];
    if (!data) {
      el.textContent = '?';
      return;
    }
    // lucide UMD shape: { iconName: [tag, attrs, [children]] }
    const create = (node) => {
      const [tag, attrs, children] = node;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs || {}).forEach(([k, v]) => svg.setAttribute(k, v));
      (children || []).forEach((c) => {
        if (Array.isArray(c)) {
          const [ctag, cattrs] = c;
          const child = document.createElementNS('http://www.w3.org/2000/svg', ctag);
          Object.entries(cattrs || {}).forEach(([k, v]) => child.setAttribute(k, v));
          svg.appendChild(child);
        }
      });
      return svg;
    };
    const node = create(data);
    node.setAttribute('stroke-width', strokeWidth);
    if (size) {
      node.setAttribute('width', size);
      node.setAttribute('height', size);
    }
    node.setAttribute('class', className);
    el.appendChild(node);
  }, [name, className, strokeWidth, size]);
  return <span ref={ref} className="inline-flex items-center justify-center" />;
};

// Patient avatar — solid sage circle with initials
const PatientAvatar = ({ name, color = 'sage', size = 'md' }) => {
  const sz = { sm: 'size-8 text-[12px]', md: 'size-10 text-[14px]', lg: 'size-14 text-[18px]', xl: 'size-20 text-[26px]' }[size];
  const palette = {
    sage:   { bg: '#4A6E5E', fg: '#FBF7F2' },
    coral:  { bg: '#E8896B', fg: '#FFFFFF' },
    gold:   { bg: '#C9A35A', fg: '#1E3329' },
    plum:   { bg: '#8E6F8E', fg: '#FFFFFF' },
    cream:  { bg: '#F3ECE2', fg: '#1E3329' },
  }[color] || { bg: '#4A6E5E', fg: '#FBF7F2' };
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span
      className={`${sz} rounded-full grid place-items-center font-semibold tracking-tight font-display`}
      style={{ background: palette.bg, color: palette.fg }}
    >
      {initials}
    </span>
  );
};

// Section title — uppercase eyebrow with hairline underline
const SectionTitle = ({ children, className = '' }) => (
  <div className={`flex items-center gap-3 mb-3 ${className}`}>
    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400">{children}</span>
    <span className="flex-1 h-px bg-line-soft" />
  </div>
);

// Status bar (iOS-ish) — used inside our static screens
const StatusBar = () => (
  <div className="absolute top-0 left-0 right-0 h-12 px-7 flex items-center justify-between text-[14px] font-semibold text-primary-700 z-10">
    <span className="mono-num">9:41</span>
    <span className="flex items-center gap-1">
      <span className="inline-block w-4 h-2.5 rounded-[1px]" style={{
        background: 'linear-gradient(90deg, #1E3329 0%, #1E3329 75%, transparent 75%)',
        border: '1px solid #1E3329',
      }} />
    </span>
  </div>
);

// Home indicator
const HomeIndicator = () => (
  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[120px] h-[5px] rounded-full bg-primary-700/80" />
);

// Phone shell — 390x844 (iPhone 14)
const Phone = ({ children, theme = 'cream' }) => {
  const bg = theme === 'cream' ? 'phone-bg' : 'bg-paper';
  return (
    <div className="relative w-[390px] h-[844px] overflow-hidden bg-cream rounded-[44px] border-[8px] border-[#1a1714] shadow-2xl">
      <div className={`absolute inset-0 ${bg} flex flex-col`}>
        <StatusBar />
        <div className="flex-1 flex flex-col pt-12 overflow-hidden">{children}</div>
        <HomeIndicator />
      </div>
    </div>
  );
};

// Tab bar — used in dashboard / history / meds / doctors / profile
const TabBar = ({ active }) => {
  const tabs = [
    { id: 'home', label: 'Hoy', icon: 'home' },
    { id: 'history', label: 'Historia', icon: 'clock-3' },
    { id: 'register', label: '', icon: 'plus', primary: true },
    { id: 'medications', label: 'Meds', icon: 'pill' },
    { id: 'profile', label: 'Perfil', icon: 'user' },
  ];
  return (
    <div className="px-4 pb-7 pt-2">
      <div className="rounded-[28px] bg-paper/95 backdrop-blur border border-line shadow-sage flex items-end justify-between px-3 py-2 relative">
        {tabs.map((t) => {
          if (t.primary) {
            return (
              <button
                key={t.id}
                className="size-14 -mt-7 rounded-full bg-coral-500 text-paper grid place-items-center shadow-warm border-4 border-cream"
                aria-label="Registrar"
              >
                <Icon name="plus" className="size-6" strokeWidth={2.5} />
              </button>
            );
          }
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${isActive ? 'text-primary-700' : 'text-ink-400'}`}
            >
              <Icon name={t.icon} className="size-[18px]" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-semibold tracking-tight ${isActive ? '' : 'opacity-80'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Logo mark
const Logomark = ({ size = 40 }) => (
  <span
    className="inline-grid place-items-center rounded-[14px] text-cream"
    style={{
      width: size,
      height: size,
      background: 'linear-gradient(135deg, #2D4A3E 0%, #4A6E5E 100%)',
      boxShadow: '0 12px 28px -10px rgba(45, 74, 62, 0.18)',
    }}
  >
    <Icon name="heart-pulse" className="text-cream" size={size * 0.5} strokeWidth={2.2} />
  </span>
);

// Pill/chip
const Chip = ({ children, tone = 'sage', icon }) => {
  const map = {
    sage:  'bg-primary-50 text-primary-700',
    coral: 'bg-coral-100 text-coral-600',
    gold:  'bg-gold-100 text-[#7A6232]',
    plum:  'bg-plum-100 text-plum-500',
    paper: 'bg-paper text-primary-700 border border-line',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold ${map[tone]}`}>
      {icon && <Icon name={icon} className="size-3.5" />}
      {children}
    </span>
  );
};

// Generic header back button
const BackHeader = ({ title, subtitle }) => (
  <header className="px-6 pt-2 pb-2 flex items-center justify-between">
    <button className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
      <Icon name="chevron-left" className="size-4" />
    </button>
    {title && (
      <div className="text-center">
        {subtitle && <span className="block text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-400">{subtitle}</span>}
        <span className="font-display text-[16px] text-primary-700">{title}</span>
      </div>
    )}
    <span className="size-10" aria-hidden />
  </header>
);

Object.assign(window, {
  Icon, PatientAvatar, SectionTitle, StatusBar, HomeIndicator, Phone, TabBar, Logomark, Chip, BackHeader,
});
