/* global Phone, Icon, PatientAvatar, SectionTitle, TabBar, Logomark, Chip, BackHeader */

// ============================================================
// SHARED MOCK DATA
// ============================================================
const PATIENTS = [
  { id: 'mama',  shortName: 'Mamá',   fullName: 'Carmen R.',  age: 72, color: 'sage',  pending: 2, medsActive: 4 },
  { id: 'papa',  shortName: 'Papá',   fullName: 'José L.',    age: 75, color: 'coral', pending: 0, medsActive: 3 },
  { id: 'sofia', shortName: 'Sofía',  fullName: 'Sofía P.',   age: 8,  color: 'gold',  pending: 1, medsActive: 1 },
  { id: 'self',  shortName: 'Mí',     fullName: 'María (tú)', age: 38, color: 'plum',  pending: 0, medsActive: 0 },
];

// ============================================================
// 01 · SELECTOR  ·  ¿De quién cuidamos hoy?
// ============================================================
const SelectorScreen = () => (
  <Phone>
    <header className="flex items-center justify-between px-6 pt-1 pb-4">
      <div className="flex items-center gap-3">
        <Logomark size={40} />
        <span className="font-display text-xl text-primary-700">CuidaBox</span>
      </div>
    </header>

    <section className="px-6 pt-2 pb-6">
      <p className="font-display-italic text-[18px] text-coral-600">Buenos días, María</p>
      <h1 className="mt-1 font-display text-[36px] leading-[1.05] tracking-tight text-primary-700">
        ¿De quién cuidamos<br/>hoy?
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-600 max-w-[280px]">
        Selecciona un familiar para revisar su salud.
      </p>
    </section>

    <section className="px-6 flex flex-col gap-3 flex-1">
      {PATIENTS.map((p) => (
        <button key={p.id} className="rounded-[20px] bg-paper border border-line hover:border-coral-200 transition-colors p-4 text-left flex items-center gap-4 shadow-sage/30">
          <PatientAvatar name={p.shortName} color={p.color} size="lg" />
          <div className="flex-1">
            <div className="font-display text-[18px] text-primary-700">{p.shortName}</div>
            <div className="text-[12px] text-ink-400">{p.fullName} · {p.age} años</div>
          </div>
          {p.pending > 0 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-coral-100 text-coral-600 text-[11px] font-semibold">
              <span className="size-1.5 rounded-full bg-coral-500" />
              {p.pending} hoy
            </span>
          ) : (
            <Icon name="chevron-right" className="size-4 text-ink-400" />
          )}
        </button>
      ))}
      <button className="mt-2 rounded-[18px] h-14 border border-dashed border-line bg-paper/50 hover:bg-paper text-primary-700 flex items-center justify-center gap-2 text-[14px] font-medium">
        <Icon name="plus" className="size-4" />
        Agregar familiar
      </button>
    </section>

    <footer className="px-6 pt-4 pb-4 flex items-center justify-center gap-2 text-[11px] text-ink-400">
      <Icon name="lock" className="size-3" />
      <span>Tus datos están cifrados de extremo a extremo</span>
    </footer>
  </Phone>
);

// ============================================================
// 02 · DASHBOARD  ·  Lo importante
// ============================================================
const DashboardScreen = () => (
  <Phone>
    <header className="px-6 pb-4 flex items-center justify-between">
      <button className="flex items-center gap-3">
        <PatientAvatar name="Mamá" color="sage" size="md" />
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-[0.12em] text-ink-400 font-semibold">Cuidando a</span>
          <span className="font-display text-[18px] leading-none text-primary-700 inline-flex items-center gap-1">
            Mamá <Icon name="chevron-down" className="size-3.5 text-ink-400" />
          </span>
        </span>
      </button>
      <button className="relative size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
        <Icon name="bell" className="size-4" />
        <span className="absolute top-2 right-2 size-2 rounded-full bg-coral-500 ring-2 ring-paper" />
      </button>
    </header>

    <section className="px-6 pb-6">
      <p className="font-display-italic text-[16px] text-coral-600">Buenos días, María</p>
      <h1 className="mt-1 font-display text-[32px] leading-[1.08] tracking-tight text-primary-700">Lo importante</h1>
    </section>

    <main className="flex-1 overflow-y-auto px-6 pb-2 no-scrollbar">
      <SectionTitle>Ahora mismo</SectionTitle>

      {/* NowCard — coral gradient, sage orb */}
      <div className="relative overflow-hidden rounded-[24px] p-5 text-paper" style={{
        background: 'linear-gradient(135deg, #E8896B 0%, #D06F4F 100%)',
        boxShadow: '0 20px 40px -12px rgba(232, 137, 107, 0.35)',
      }}>
        <div className="absolute -top-8 -right-8 size-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)', filter: 'blur(12px)' }} />
        <div className="relative">
          <p className="font-display-italic text-[14px] opacity-90">Próxima dosis en</p>
          <p className="font-display text-[44px] leading-none mt-1 mono-num">23<span className="text-[22px] opacity-80"> min</span></p>
          <div className="flex items-center gap-3 mt-4">
            <span className="size-11 rounded-full bg-paper/20 grid place-items-center backdrop-blur-sm">
              <Icon name="pill" className="size-5" />
            </span>
            <div>
              <p className="font-medium text-[15px]">Enalapril 10mg</p>
              <p className="text-[12px] opacity-85">1 comprimido · con desayuno</p>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button className="flex-1 h-10 rounded-full bg-paper text-coral-600 font-semibold text-[13px] inline-flex items-center justify-center gap-1.5">
              <Icon name="check" className="size-4" /> Marcar dada
            </button>
            <button className="h-10 px-4 rounded-full bg-paper/15 text-paper font-medium text-[13px] inline-flex items-center gap-1">
              <Icon name="clock" className="size-3.5" /> 10 min
            </button>
          </div>
        </div>
      </div>

      <SectionTitle className="mt-7">Próximamente</SectionTitle>
      {[
        { time: '14:00', title: 'Losartán 50mg', sub: 'Después de comer', icon: 'pill', tone: 'sage' },
        { time: 'Mañ. 09:30', title: 'Dr. Ramírez · Cardiología', sub: 'Hospital Central', icon: 'stethoscope', tone: 'plum' },
        { time: 'Jue 16', title: 'Análisis de sangre', sub: 'Ayuno desde 22:00', icon: 'flask-conical', tone: 'gold' },
      ].map((it, i) => (
        <div key={i} className="rounded-[18px] bg-paper border border-line p-3.5 flex items-center gap-3 mb-2">
          <span className={`size-10 rounded-[12px] grid place-items-center ${
            it.tone === 'sage' ? 'bg-primary-50 text-primary-700' :
            it.tone === 'plum' ? 'bg-plum-100 text-plum-500' : 'bg-gold-100 text-[#7A6232]'
          }`}>
            <Icon name={it.icon} className="size-4" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[14px] text-primary-700 truncate">{it.title}</p>
            <p className="text-[12px] text-ink-400">{it.sub}</p>
          </div>
          <span className="text-[12px] font-semibold text-ink-600 mono-num">{it.time}</span>
        </div>
      ))}
    </main>

    <TabBar active="home" />
  </Phone>
);

// ============================================================
// 03 · REGISTER  ·  Cuéntame qué pasó
// ============================================================
const RegisterScreen = () => (
  <Phone>
    <header className="px-6 pb-2 flex items-center justify-between">
      <button className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
        <Icon name="arrow-left" className="size-4" />
      </button>
      <Chip tone="plum" icon="sparkles">Asistente IA</Chip>
      <span className="size-10" />
    </header>

    <section className="px-6 pt-2 pb-4">
      <p className="font-display-italic text-[18px] text-coral-600">Cuéntame</p>
      <h1 className="mt-1 font-display text-[34px] leading-[1.08] tracking-tight text-primary-700">¿Qué pasó hoy?</h1>
      <p className="mt-3 text-[13.5px] leading-relaxed text-ink-600 max-w-[300px]">
        Habla, escribe o adjunta una foto. Yo me encargo de organizarlo.
      </p>
    </section>

    <main className="flex-1 overflow-y-auto px-6 pb-4 no-scrollbar">
      {/* Mic canvas */}
      <div className="rounded-[28px] bg-gradient-to-br from-cream-2 to-paper border border-line p-6 flex flex-col items-center">
        <button className="size-24 rounded-full grid place-items-center text-paper relative" style={{
          background: 'linear-gradient(135deg, #E8896B 0%, #D06F4F 100%)',
          boxShadow: '0 20px 40px -12px rgba(232, 137, 107, 0.35)',
        }}>
          <span className="absolute inset-0 rounded-full animate-ping bg-coral-300/40" />
          <Icon name="mic" className="size-9 relative" strokeWidth={2.2} />
        </button>
        <p className="font-display-italic text-[15px] text-coral-600 mt-4">Toca y habla</p>
        <div className="flex items-end gap-1 mt-3 h-6">
          {[8, 14, 22, 18, 12, 20, 16, 10, 18, 24, 14, 8].map((h, i) => (
            <span key={i} className="w-1 rounded-full bg-coral-300/70" style={{ height: h }} />
          ))}
        </div>
      </div>

      {/* Text fallback */}
      <div className="mt-4 rounded-[20px] border border-line bg-paper p-3">
        <p className="text-[13.5px] text-ink-400">O escríbelo aquí…</p>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-line-soft">
          <button className="size-9 rounded-full bg-cream-2 grid place-items-center text-primary-700">
            <Icon name="camera" className="size-4" />
          </button>
          <button className="h-10 px-5 rounded-full bg-primary-700 text-cream font-semibold text-[13px] inline-flex items-center gap-1.5">
            <Icon name="sparkles" className="size-4" /> Procesar
          </button>
        </div>
      </div>

      {/* Examples */}
      <p className="mt-6 text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-400 mb-2.5">Ejemplos</p>
      <div className="flex flex-col gap-2">
        {[
          'Mamá tomó su losartán a las 8 con la papilla',
          'Sofía tuvo fiebre de 38.2 después del cole',
          'Cita con Dr. Ramírez el jueves 9:30',
        ].map((ex, i) => (
          <button key={i} className="rounded-full px-4 py-2.5 bg-paper border border-line text-left text-[13px] text-ink-600 inline-flex items-center gap-2">
            <Icon name="quote" className="size-3 text-coral-500 shrink-0" />
            <span className="truncate">{ex}</span>
          </button>
        ))}
      </div>
    </main>
  </Phone>
);

// ============================================================
// 04 · TIMELINE / HISTORY
// ============================================================
const TIMELINE = [
  { day: 'Hoy', items: [
    { time: '08:15', icon: 'pill', tone: 'sage', title: 'Enalapril 10mg', meta: 'Dada · con desayuno' },
    { time: '07:30', icon: 'thermometer', tone: 'coral', title: 'Temperatura 36.7°C', meta: 'Normal' },
  ]},
  { day: 'Ayer', items: [
    { time: '20:00', icon: 'pill', tone: 'sage', title: 'Losartán 50mg', meta: 'Dada · cena' },
    { time: '17:30', icon: 'notebook-pen', tone: 'plum', title: 'Mareo leve al levantarse', meta: 'Nota de María' },
    { time: '12:00', icon: 'utensils', tone: 'gold', title: 'Almorzó completo', meta: 'Sin sal añadida' },
    { time: '08:15', icon: 'pill', tone: 'sage', title: 'Enalapril 10mg', meta: 'Dada' },
  ]},
];

const TimelineScreen = () => (
  <Phone>
    <header className="px-6 pb-3 flex items-center justify-between">
      <button className="flex items-center gap-2.5">
        <PatientAvatar name="Mamá" color="sage" size="sm" />
        <span className="font-display text-[16px] text-primary-700 inline-flex items-center gap-1">
          Mamá <Icon name="chevron-down" className="size-3.5 text-ink-400" />
        </span>
      </button>
      <button className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
        <Icon name="sliders-horizontal" className="size-4" />
      </button>
    </header>

    <section className="px-6 pb-4">
      <p className="font-display-italic text-[16px] text-coral-600">Todo lo que pasa</p>
      <h1 className="mt-1 font-display text-[32px] leading-[1.08] tracking-tight text-primary-700">Historia</h1>
    </section>

    {/* Filters */}
    <div className="px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
      {['Todo', 'Medicación', 'Síntomas', 'Citas', 'Notas'].map((f, i) => (
        <button key={f} className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap ${i === 0 ? 'bg-primary-700 text-cream' : 'bg-paper border border-line text-ink-600'}`}>
          {f}
        </button>
      ))}
    </div>

    <main className="flex-1 overflow-y-auto px-6 pb-2 no-scrollbar">
      {TIMELINE.map((group) => (
        <div key={group.day} className="mb-5">
          <SectionTitle>{group.day}</SectionTitle>
          <div className="relative pl-8">
            {/* Rail */}
            <span className="absolute left-3 top-2 bottom-2 w-px bg-line" />
            {group.items.map((it, i) => (
              <div key={i} className="relative mb-2.5">
                <span className={`absolute -left-[22px] top-3 size-3 rounded-full ring-4 ring-cream ${
                  it.tone === 'sage' ? 'bg-primary-500' :
                  it.tone === 'coral' ? 'bg-coral-500' :
                  it.tone === 'plum' ? 'bg-plum-500' : 'bg-gold-500'
                }`} style={ it.tone === 'gold' ? { background: '#C9A35A' } : {}} />
                <button className="w-full text-left rounded-[16px] bg-paper border border-line p-3.5 flex items-start gap-3">
                  <span className={`size-9 rounded-[10px] grid place-items-center shrink-0 ${
                    it.tone === 'sage' ? 'bg-primary-50 text-primary-700' :
                    it.tone === 'coral' ? 'bg-coral-100 text-coral-600' :
                    it.tone === 'plum' ? 'bg-plum-100 text-plum-500' : 'bg-gold-100 text-[#7A6232]'
                  }`}>
                    <Icon name={it.icon} className="size-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[14px] text-primary-700">{it.title}</p>
                    <p className="text-[12px] text-ink-400">{it.meta}</p>
                  </div>
                  <span className="text-[12px] font-semibold text-ink-600 mono-num shrink-0">{it.time}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>

    <TabBar active="history" />
  </Phone>
);

// ============================================================
// 05 · MEDICATIONS
// ============================================================
const MedicationsScreen = () => (
  <Phone>
    <header className="px-6 pb-3 flex items-center justify-between">
      <button className="flex items-center gap-2.5">
        <PatientAvatar name="Mamá" color="sage" size="sm" />
        <span className="font-display text-[16px] text-primary-700 inline-flex items-center gap-1">
          Mamá <Icon name="chevron-down" className="size-3.5 text-ink-400" />
        </span>
      </button>
      <button className="size-10 rounded-full bg-coral-500 text-paper grid place-items-center shadow-warm">
        <Icon name="plus" className="size-4" />
      </button>
    </header>

    <section className="px-6 pb-4">
      <p className="font-display-italic text-[16px] text-coral-600">Su tratamiento</p>
      <h1 className="mt-1 font-display text-[32px] leading-[1.08] tracking-tight text-primary-700">Medicación</h1>
    </section>

    {/* Tabs */}
    <div className="px-6 pb-4">
      <div className="inline-flex p-1 rounded-full bg-cream-2 border border-line">
        <button className="px-4 py-1.5 rounded-full text-[12px] font-semibold bg-paper text-primary-700 shadow-sage">Activos · 4</button>
        <button className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-ink-400">Pasados</button>
      </div>
    </div>

    <main className="flex-1 overflow-y-auto px-6 pb-2 no-scrollbar">
      {[
        { name: 'Enalapril', dose: '10mg', schedule: '1×/día · 8:00', remaining: 12, total: 30, taken: 18, color: 'sage' },
        { name: 'Losartán',  dose: '50mg', schedule: '2×/día · 8:00, 20:00', remaining: 22, total: 60, taken: 38, color: 'coral' },
        { name: 'Atorvastatina', dose: '20mg', schedule: '1×/día · noche', remaining: 8, total: 30, taken: 22, color: 'gold' },
        { name: 'Vitamina D', dose: '1000UI', schedule: '1×/semana', remaining: 6, total: 12, taken: 6, color: 'plum' },
      ].map((m, i) => {
        const pct = Math.round((m.taken / m.total) * 100);
        const dotBg = { sage: '#4A6E5E', coral: '#E8896B', gold: '#C9A35A', plum: '#8E6F8E' }[m.color];
        return (
          <button key={i} className="w-full text-left rounded-[20px] bg-paper border border-line p-4 mb-2.5 flex items-start gap-3">
            <span className="size-11 rounded-[14px] grid place-items-center shrink-0" style={{ background: `${dotBg}1A`, color: dotBg }}>
              <Icon name="pill" className="size-5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <p className="font-display text-[17px] text-primary-700 truncate">{m.name}</p>
                <span className="text-[12px] text-ink-400">{m.dose}</span>
              </div>
              <p className="text-[12px] text-ink-400 mb-2">{m.schedule}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-cream-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: dotBg }} />
                </div>
                <span className="text-[11px] font-semibold mono-num text-ink-600">{m.taken}/{m.total}</span>
              </div>
            </div>
          </button>
        );
      })}
    </main>

    <TabBar active="medications" />
  </Phone>
);

// ============================================================
// 06 · DOCTORS
// ============================================================
const DoctorsScreen = () => (
  <Phone>
    <header className="px-6 pb-3 flex items-center justify-between">
      <button className="flex items-center gap-2.5">
        <PatientAvatar name="Mamá" color="sage" size="sm" />
        <span className="font-display text-[16px] text-primary-700 inline-flex items-center gap-1">
          Mamá <Icon name="chevron-down" className="size-3.5 text-ink-400" />
        </span>
      </button>
      <button className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700">
        <Icon name="plus" className="size-4" />
      </button>
    </header>

    <section className="px-6 pb-4">
      <p className="font-display-italic text-[16px] text-coral-600">Su equipo médico</p>
      <h1 className="mt-1 font-display text-[32px] leading-[1.08] tracking-tight text-primary-700">Doctores</h1>
    </section>

    <main className="flex-1 overflow-y-auto px-6 pb-2 no-scrollbar">
      {/* Featured — médico de cabecera */}
      <div className="relative overflow-hidden rounded-[24px] p-5 mb-3" style={{
        background: 'linear-gradient(135deg, #4A6E5E 0%, #2D4A3E 100%)',
        color: '#FBF7F2',
      }}>
        <div className="absolute -top-6 -right-6 size-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,137,107,0.35) 0%, transparent 70%)', filter: 'blur(14px)' }} />
        <span className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-coral-500 text-paper text-[10px] font-bold uppercase tracking-wider">
          <Icon name="star" className="size-3" /> Cabecera
        </span>
        <div className="relative flex items-start gap-3 mt-3">
          <span className="size-14 rounded-full bg-cream-2 text-primary-700 grid place-items-center font-display text-[18px] font-semibold">RM</span>
          <div className="flex-1">
            <p className="font-display text-[19px] leading-tight">Dra. Rosa Méndez</p>
            <p className="text-[12px] opacity-80">Medicina interna · Centro Salud Norte</p>
            <div className="flex gap-2 mt-3">
              <button className="h-8 px-3 rounded-full bg-paper text-primary-700 text-[12px] font-semibold inline-flex items-center gap-1">
                <Icon name="phone" className="size-3" /> Llamar
              </button>
              <button className="h-8 px-3 rounded-full bg-paper/15 text-paper text-[12px] font-medium inline-flex items-center gap-1">
                <Icon name="calendar-plus" className="size-3" /> Cita
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other doctors */}
      {[
        { name: 'Dr. Carlos Ramírez', spec: 'Cardiología', loc: 'Hospital Central', last: 'Visto hace 2 sem', icon: 'heart-pulse' },
        { name: 'Dra. Lucía Torres', spec: 'Endocrinología', loc: 'Clínica Sur', last: 'Cita: jue 9:30', icon: 'activity' },
        { name: 'Dr. Pablo Ortiz', spec: 'Oftalmología', loc: 'Centro Visual', last: 'Visto hace 3 m', icon: 'eye' },
      ].map((d, i) => (
        <button key={i} className="w-full text-left rounded-[18px] bg-paper border border-line p-3.5 mb-2 flex items-center gap-3">
          <span className="size-11 rounded-full bg-primary-50 text-primary-700 grid place-items-center">
            <Icon name={d.icon} className="size-4" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[14px] text-primary-700 truncate">{d.name}</p>
            <p className="text-[12px] text-ink-400 truncate">{d.spec} · {d.loc}</p>
          </div>
          <span className="text-[11px] font-semibold text-ink-600 shrink-0">{d.last}</span>
        </button>
      ))}
    </main>

    <TabBar active="profile" />
  </Phone>
);

// ============================================================
// 07 · PATIENT DETAIL
// ============================================================
const PatientDetailScreen = () => (
  <Phone>
    <BackHeader />
    <main className="flex-1 overflow-y-auto px-6 pb-4 no-scrollbar">
      <section className="flex flex-col items-center pt-2 pb-5">
        <PatientAvatar name="Carmen R" color="sage" size="xl" />
        <p className="font-display-italic text-[15px] text-coral-600 mt-3">Cuidando a</p>
        <h1 className="font-display text-[28px] text-primary-700">Carmen Rodríguez</h1>
        <p className="text-[12px] text-ink-400 mt-1">Mamá · 72 años · Desde 2023</p>
        <div className="flex gap-2 mt-4">
          <Chip tone="coral" icon="droplet">O+</Chip>
          <Chip tone="gold" icon="alert-triangle">Penicilina</Chip>
          <Chip tone="paper" icon="ruler">1.62m · 64kg</Chip>
        </div>
      </section>

      <SectionTitle>Resumen</SectionTitle>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { v: '4', l: 'Meds activos', icon: 'pill', tone: 'sage' },
          { v: '3', l: 'Doctores', icon: 'stethoscope', tone: 'plum' },
          { v: '12', l: 'Eventos / sem', icon: 'activity', tone: 'coral' },
        ].map((s, i) => (
          <div key={i} className="rounded-[16px] bg-paper border border-line p-3">
            <span className={`inline-grid place-items-center size-8 rounded-[10px] mb-2 ${
              s.tone === 'sage' ? 'bg-primary-50 text-primary-700' :
              s.tone === 'plum' ? 'bg-plum-100 text-plum-500' : 'bg-coral-100 text-coral-600'
            }`}>
              <Icon name={s.icon} className="size-4" />
            </span>
            <p className="font-display text-[22px] text-primary-700 leading-none mono-num">{s.v}</p>
            <p className="text-[11px] text-ink-400 mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Condiciones</SectionTitle>
      {[
        { name: 'Hipertensión arterial', since: 'Desde 2019', icon: 'heart-pulse' },
        { name: 'Diabetes tipo 2', since: 'Desde 2021', icon: 'droplets' },
        { name: 'Colesterol elevado', since: 'Desde 2022', icon: 'trending-up' },
      ].map((c, i) => (
        <div key={i} className="rounded-[16px] bg-paper border border-line p-3.5 mb-2 flex items-center gap-3">
          <span className="size-9 rounded-[10px] bg-primary-50 text-primary-700 grid place-items-center">
            <Icon name={c.icon} className="size-4" />
          </span>
          <div className="flex-1">
            <p className="font-medium text-[14px] text-primary-700">{c.name}</p>
            <p className="text-[12px] text-ink-400">{c.since}</p>
          </div>
          <Icon name="chevron-right" className="size-4 text-ink-400" />
        </div>
      ))}

      <button className="w-full mt-4 h-12 rounded-full bg-paper border border-line text-primary-700 font-semibold text-[14px] inline-flex items-center justify-center gap-2">
        <Icon name="pencil" className="size-4" /> Editar perfil
      </button>
    </main>
  </Phone>
);

// ============================================================
// 08 · TIMELINE EVENT DETAIL
// ============================================================
const TimelineDetailScreen = () => (
  <Phone>
    <BackHeader subtitle="HISTORIA · HOY" title="Detalle" />
    <main className="flex-1 overflow-y-auto px-6 pb-4 no-scrollbar">
      <div className="rounded-[24px] p-5 text-paper relative overflow-hidden mt-2" style={{
        background: 'linear-gradient(135deg, #E8896B 0%, #D06F4F 100%)',
        boxShadow: '0 20px 40px -12px rgba(232, 137, 107, 0.35)',
      }}>
        <div className="absolute -top-8 -right-8 size-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)', filter: 'blur(12px)' }} />
        <span className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-paper/20 backdrop-blur text-paper text-[10px] font-semibold uppercase tracking-wider">
          <Icon name="thermometer" className="size-3" /> Síntoma
        </span>
        <p className="relative font-display text-[36px] mt-3 leading-none mono-num">38.2°<span className="text-[20px] opacity-80">C</span></p>
        <p className="relative font-display-italic text-[15px] mt-1.5 opacity-95">Fiebre moderada</p>
        <p className="relative text-[12px] opacity-85 mt-3">Hoy · 17:30 · Después del cole</p>
      </div>

      <SectionTitle className="mt-6">Contexto</SectionTitle>
      <div className="rounded-[18px] bg-paper border border-line p-4 mb-3">
        <p className="text-[13.5px] leading-relaxed text-ink-600">
          "Sofía llegó del cole con la cara muy roja y se quejaba de dolor de cabeza. Le tomé la temperatura y tenía 38.2. Le di un paracetamol y le puse paños fríos."
        </p>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line-soft">
          <PatientAvatar name="María" color="plum" size="sm" />
          <span className="text-[12px] text-ink-400">Registrado por <span className="text-primary-700 font-medium">María</span> · hace 23 min</span>
        </div>
      </div>

      <SectionTitle>Acciones tomadas</SectionTitle>
      {[
        { icon: 'pill', title: 'Paracetamol 250mg', time: '17:35' },
        { icon: 'droplets', title: 'Paños fríos en frente', time: '17:40' },
      ].map((a, i) => (
        <div key={i} className="rounded-[14px] bg-paper border border-line p-3 mb-2 flex items-center gap-3">
          <span className="size-9 rounded-[10px] bg-primary-50 text-primary-700 grid place-items-center">
            <Icon name={a.icon} className="size-4" />
          </span>
          <p className="flex-1 text-[13.5px] text-primary-700 font-medium">{a.title}</p>
          <span className="text-[11px] text-ink-400 mono-num">{a.time}</span>
        </div>
      ))}

      <SectionTitle className="mt-5">Próximo control</SectionTitle>
      <div className="rounded-[16px] border border-dashed border-coral-200 bg-coral-100/30 p-4 flex items-center gap-3">
        <span className="size-10 rounded-full bg-coral-500 text-paper grid place-items-center">
          <Icon name="clock" className="size-4" />
        </span>
        <div className="flex-1">
          <p className="font-medium text-[14px] text-primary-700">Volver a medir en 2 horas</p>
          <p className="text-[12px] text-ink-400">Recordatorio 19:30</p>
        </div>
      </div>
    </main>
  </Phone>
);

// ============================================================
// 09 · MEDICATION DETAIL
// ============================================================
const MedicationDetailScreen = () => (
  <Phone>
    <BackHeader subtitle="MEDICACIÓN · ACTIVA" />
    <main className="flex-1 overflow-y-auto px-6 pb-4 no-scrollbar">
      <section className="pt-2 pb-5">
        <Chip tone="sage" icon="pill">Antihipertensivo</Chip>
        <h1 className="font-display text-[32px] text-primary-700 mt-3 leading-tight">Enalapril <span className="text-ink-400 text-[22px] font-display-italic">10mg</span></h1>
        <p className="text-[13px] text-ink-600 mt-1">1 comprimido por la mañana, con desayuno</p>
      </section>

      {/* Adherence */}
      <div className="rounded-[20px] bg-paper border border-line p-4 mb-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400">Adherencia · 30 días</span>
          <span className="font-display text-[22px] text-primary-700 mono-num">94<span className="text-[14px] text-ink-400">%</span></span>
        </div>
        <div className="grid grid-cols-15 gap-1 mt-3" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const missed = i === 7 || i === 19;
            return <span key={i} className={`h-3 rounded-[3px] ${missed ? 'bg-coral-200' : 'bg-primary-300'}`} style={{ opacity: missed ? 1 : 0.2 + (i % 5) * 0.15 }} />;
          })}
        </div>
        <p className="text-[11px] text-ink-400 mt-2">2 dosis perdidas este mes</p>
      </div>

      <SectionTitle>Horario</SectionTitle>
      <div className="rounded-[16px] bg-paper border border-line p-4 mb-4 flex items-center gap-3">
        <span className="size-10 rounded-full bg-coral-100 text-coral-600 grid place-items-center">
          <Icon name="clock" className="size-4" />
        </span>
        <div className="flex-1">
          <p className="font-display text-[18px] text-primary-700 mono-num">8:00 AM</p>
          <p className="text-[11px] text-ink-400">Todos los días · con desayuno</p>
        </div>
      </div>

      <SectionTitle>Detalles</SectionTitle>
      <dl className="rounded-[16px] bg-paper border border-line divide-y divide-line-soft mb-4">
        {[
          ['Recetado por', 'Dr. Carlos Ramírez'],
          ['Inicio', '12 enero 2024'],
          ['Quedan', '12 comprimidos · ~12 días'],
          ['Próxima receta', 'Reordenar pronto'],
        ].map(([k, v], i) => (
          <div key={i} className="flex items-center justify-between p-3.5 text-[13px]">
            <dt className="text-ink-400">{k}</dt>
            <dd className="text-primary-700 font-medium text-right">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="flex gap-2">
        <button className="flex-1 h-12 rounded-full bg-paper border border-line text-primary-700 font-semibold text-[13px] inline-flex items-center justify-center gap-1.5">
          <Icon name="pencil" className="size-4" /> Editar
        </button>
        <button className="flex-1 h-12 rounded-full bg-coral-500 text-paper font-semibold text-[13px] inline-flex items-center justify-center gap-1.5">
          <Icon name="check" className="size-4" /> Marcar dada
        </button>
      </div>
    </main>
  </Phone>
);

// ============================================================
// 10 · PROFILE / SETTINGS
// ============================================================
const ProfileScreen = () => (
  <Phone>
    <header className="px-6 pb-3">
      <h1 className="font-display text-[28px] text-primary-700">Perfil</h1>
    </header>

    <main className="flex-1 overflow-y-auto px-6 pb-2 no-scrollbar">
      {/* User card */}
      <div className="rounded-[24px] bg-paper border border-line p-4 flex items-center gap-3 mb-5">
        <PatientAvatar name="María Pérez" color="plum" size="lg" />
        <div className="flex-1">
          <p className="font-display text-[18px] text-primary-700">María Pérez</p>
          <p className="text-[12px] text-ink-400">maria@cuidabox.app</p>
        </div>
        <button className="size-9 rounded-full bg-cream-2 grid place-items-center text-primary-700">
          <Icon name="pencil" className="size-3.5" />
        </button>
      </div>

      <SectionTitle>A tu cuidado</SectionTitle>
      <div className="rounded-[18px] bg-paper border border-line divide-y divide-line-soft mb-5">
        {PATIENTS.slice(0, 3).map((p, i) => (
          <button key={i} className="w-full p-3.5 flex items-center gap-3 text-left">
            <PatientAvatar name={p.shortName} color={p.color} size="md" />
            <div className="flex-1">
              <p className="font-medium text-[14px] text-primary-700">{p.fullName}</p>
              <p className="text-[12px] text-ink-400">{p.shortName} · {p.age} años</p>
            </div>
            <Icon name="chevron-right" className="size-4 text-ink-400" />
          </button>
        ))}
      </div>

      <SectionTitle>Preferencias</SectionTitle>
      <div className="rounded-[18px] bg-paper border border-line divide-y divide-line-soft mb-5">
        {[
          { icon: 'languages', label: 'Idioma', value: 'Español', tone: 'plum' },
          { icon: 'bell', label: 'Notificaciones', value: 'Activas', tone: 'coral' },
          { icon: 'moon', label: 'Tema', value: 'Automático', tone: 'sage' },
          { icon: 'shield-check', label: 'Privacidad', value: '', tone: 'gold' },
        ].map((s, i) => (
          <button key={i} className="w-full p-3.5 flex items-center gap-3 text-left">
            <span className={`size-9 rounded-[10px] grid place-items-center ${
              s.tone === 'sage' ? 'bg-primary-50 text-primary-700' :
              s.tone === 'coral' ? 'bg-coral-100 text-coral-600' :
              s.tone === 'plum' ? 'bg-plum-100 text-plum-500' : 'bg-gold-100 text-[#7A6232]'
            }`}>
              <Icon name={s.icon} className="size-4" />
            </span>
            <span className="flex-1 text-[14px] font-medium text-primary-700">{s.label}</span>
            {s.value && <span className="text-[12px] text-ink-400">{s.value}</span>}
            <Icon name="chevron-right" className="size-4 text-ink-400" />
          </button>
        ))}
      </div>

      <button className="w-full h-12 rounded-full bg-paper border border-line text-coral-600 font-semibold text-[13.5px] inline-flex items-center justify-center gap-2 mb-2">
        <Icon name="log-out" className="size-4" /> Cerrar sesión
      </button>
    </main>

    <TabBar active="profile" />
  </Phone>
);

// ============================================================
// 11 · LANGUAGE SHEET (overlay state)
// ============================================================
const LanguageSheetScreen = () => (
  <Phone>
    {/* Faded profile underneath */}
    <div className="absolute inset-0 pt-12">
      <div className="px-6 pb-3 opacity-30">
        <h1 className="font-display text-[28px] text-primary-700">Perfil</h1>
      </div>
      <div className="px-6 opacity-30">
        <div className="rounded-[24px] bg-paper border border-line p-4 flex items-center gap-3 mb-5">
          <PatientAvatar name="María Pérez" color="plum" size="lg" />
          <div className="flex-1">
            <p className="font-display text-[18px] text-primary-700">María Pérez</p>
            <p className="text-[12px] text-ink-400">maria@cuidabox.app</p>
          </div>
        </div>
      </div>
    </div>

    {/* Scrim */}
    <div className="absolute inset-0 bg-primary-900/40 backdrop-blur-[2px]" />

    {/* Sheet */}
    <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-cream border-t border-line p-5 pb-10 shadow-2xl">
      <span className="block w-10 h-1 rounded-full bg-ink-200 mx-auto mb-4" />
      <p className="font-display-italic text-[14px] text-coral-600 text-center">Elige tu idioma</p>
      <h2 className="font-display text-[22px] text-primary-700 text-center mt-1">Idioma</h2>
      <p className="text-[12px] text-ink-400 text-center mt-1.5 max-w-[260px] mx-auto">Cambia el idioma de la app. Los recordatorios se mantienen.</p>

      <div className="mt-5 flex flex-col gap-2">
        {[
          { flag: '🇪🇸', name: 'Español', code: 'ES', selected: true },
          { flag: '🇬🇧', name: 'English',  code: 'EN', selected: false },
        ].map((l) => (
          <button key={l.code} className={`w-full p-3.5 rounded-[18px] flex items-center gap-3 text-left transition-colors ${
            l.selected ? 'bg-primary-50 border-2 border-primary-500' : 'bg-paper border border-line'
          }`}>
            <span className="text-[28px] leading-none">{l.flag}</span>
            <div className="flex-1">
              <p className="font-display text-[16px] text-primary-700">{l.name}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400">{l.code}</p>
            </div>
            {l.selected ? (
              <span className="size-7 rounded-full bg-coral-500 text-paper grid place-items-center">
                <Icon name="check" className="size-4" strokeWidth={2.5} />
              </span>
            ) : (
              <span className="size-7 rounded-full border border-line" />
            )}
          </button>
        ))}
      </div>
    </div>
  </Phone>
);

// ============================================================
// EXPORTS
// ============================================================
Object.assign(window, {
  SelectorScreen,
  DashboardScreen,
  RegisterScreen,
  TimelineScreen,
  MedicationsScreen,
  DoctorsScreen,
  PatientDetailScreen,
  TimelineDetailScreen,
  MedicationDetailScreen,
  ProfileScreen,
  LanguageSheetScreen,
});
