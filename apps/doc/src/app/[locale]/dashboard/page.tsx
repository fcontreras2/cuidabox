'use client';

import { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  BadgeDot,
  Breadcrumb,
  Button,
  Card,
  Divider,
  Dropdown,
  DropdownItem,
  Modal,
  Pagination,
  Progress,
  Select,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  Table,
  type TableColumn,
  Tabs,
  Text,
  ToastProvider,
  Tooltip,
  toast,
} from 'fcontreras2-ui';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faMagnifyingGlass, faBell, faChevronDown,
  faSun, faMoon,
  faTableCellsLarge, faBoxOpen, faUsers, faTag,
  faChartBar, faGear, faEllipsis,
} from '@fortawesome/free-solid-svg-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  date: string;
};

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type NavItem = {
  label: string;
  icon: IconDefinition;
  id: string;
  badge?: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview',   icon: faTableCellsLarge, id: 'overview' },
  { label: 'Orders',     icon: faBoxOpen,         id: 'orders',   badge: 6 },
  { label: 'Customers',  icon: faUsers,           id: 'customers' },
  { label: 'Products',   icon: faTag,             id: 'products' },
  { label: 'Analytics',  icon: faChartBar,        id: 'analytics' },
  { label: 'Settings',   icon: faGear,            id: 'settings' },
];

const SUBNAV_ITEMS = ['Summary', 'Revenue', 'Users', 'Conversions'];

const ORDERS: Order[] = [
  { id: '#4521', customer: 'Alice Johnson', product: 'Pro Plan',     amount: 99,  status: 'Completed', date: 'Apr 20, 2026' },
  { id: '#4520', customer: 'Bob Smith',     product: 'Starter Plan', amount: 29,  status: 'Pending',   date: 'Apr 19, 2026' },
  { id: '#4519', customer: 'Carol White',   product: 'Enterprise',   amount: 299, status: 'Completed', date: 'Apr 18, 2026' },
  { id: '#4518', customer: 'David Lee',     product: 'Pro Plan',     amount: 99,  status: 'Cancelled', date: 'Apr 17, 2026' },
  { id: '#4517', customer: 'Eva Martinez',  product: 'Starter Plan', amount: 29,  status: 'Completed', date: 'Apr 16, 2026' },
  { id: '#4516', customer: 'Frank Torres',  product: 'Enterprise',   amount: 299, status: 'Pending',   date: 'Apr 15, 2026' },
];

const STATUS_VARIANT = {
  Completed: 'success',
  Pending:   'warning',
  Cancelled: 'danger',
} as const;

const ORDER_COLUMNS: TableColumn<Order>[] = [
  { key: 'id',       header: 'Order',    accessor: 'id' },
  { key: 'customer', header: 'Customer', accessor: 'customer' },
  { key: 'product',  header: 'Product',  accessor: 'product' },
  { key: 'amount',   header: 'Amount',   accessor: (r) => <span className="font-medium">${r.amount}</span> },
  { key: 'status',   header: 'Status',   accessor: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge> },
  { key: 'date',     header: 'Date',     accessor: 'date' },
];

const TEAM = [
  { name: 'Alice Johnson', role: 'Engineering Lead', status: 'online'  as const, tasks: 8  },
  { name: 'Bob Smith',     role: 'Product Designer', status: 'away'    as const, tasks: 5  },
  { name: 'Carol White',   role: 'Product Manager',  status: 'online'  as const, tasks: 12 },
  { name: 'David Lee',     role: 'Backend Engineer', status: 'offline' as const, tasks: 3  },
];

const PERIOD_OPTIONS = [
  { value: '7d',  label: 'Last 7 days'  },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

// ─── Small components ─────────────────────────────────────────────────────────

function StatCard({ label, value, delta, positive, sub }: {
  label: string; value: string; delta: string; positive: boolean; sub?: string;
}) {
  return (
    <Card shadow="sm" padding="lg">
      <Text variant="caption" color="muted" weight="medium">{label}</Text>
      <Text variant="h3" weight="bold" className="mt-1">{value}</Text>
      <div className="flex items-center gap-2 mt-3">
        <Badge variant={positive ? 'success' : 'danger'} size="sm">{delta}</Badge>
        {sub && <Text variant="caption" color="muted">{sub}</Text>}
      </div>
    </Card>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="h-14 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <Text variant="body" weight="semibold" className="dark:text-white">Acme Inc.</Text>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Tooltip content={isDark ? 'Light mode' : 'Dark mode'} placement="bottom">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip content="Search" placement="bottom">
          <button className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip content="Notifications" placement="bottom">
          <button className="relative p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </Tooltip>

        <Divider orientation="vertical" className="h-6 mx-1" />

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-0.5 hover:bg-gray-100 transition-colors">
              <Avatar name="Freddy Contreras" size="xs" status="online" />
              <Text variant="body-sm" weight="medium">Freddy</Text>
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-gray-400" />
            </button>
          }
          align="right"
        >
          <DropdownItem label="Profile" />
          <DropdownItem label="Settings" />
          <DropdownItem label="Logout" variant="danger" />
        </Dropdown>
      </div>
    </header>
  );
}

// ─── Sub-navbar ───────────────────────────────────────────────────────────────

function SubNavbar({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div className="h-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 gap-1 shrink-0">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
        className="mr-4"
      />
      <Divider orientation="vertical" className="h-4 mr-4" />
      {SUBNAV_ITEMS.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            active === item
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ open, activeNav, onChange }: {
  open: boolean;
  activeNav: string;
  onChange: (id: string) => void;
}) {
  return (
    <aside
      className={`shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-200 overflow-hidden ${
        open ? 'w-56' : 'w-14'
      }`}
    >
      {/* Nav items */}
      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${
              activeNav === item.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="w-4 h-4 shrink-0" />
            {open && (
              <span className="flex-1 text-sm font-medium text-left truncate">{item.label}</span>
            )}
            {open && item.badge !== undefined && (
              <Badge variant="default" size="sm">{item.badge}</Badge>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom user section */}
      {open && (
        <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Avatar name="Freddy Contreras" size="xs" status="online" />
            <div className="min-w-0">
              <Text variant="caption" weight="semibold" truncate>Freddy Contreras</Text>
              <Text variant="caption" color="muted" truncate>freddycontreras3@gmail.com</Text>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Dashboard content ────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [activeNav, setActiveNav]       = useState('overview');
  const [activeSubnav, setActiveSubnav] = useState('Summary');
  const [page, setPage]                 = useState(1);
  const [period, setPeriod]             = useState<{ value: string; label: string } | null>(PERIOD_OPTIONS[1]);
  const [alertVisible, setAlert]        = useState(true);
  const [modalOpen, setModal]           = useState(false);

  const PAGE_SIZE  = 4;
  const pageSlice  = ORDERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <ToastProvider position="top-right" autoClose={3000} />

      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">

        {/* ── Sidebar (full height) ── */}
        <Sidebar open={sidebarOpen} activeNav={activeNav} onChange={setActiveNav} />

        {/* ── Right column ── */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* ── Navbar ── */}
          <Navbar onMenuToggle={() => setSidebarOpen((v) => !v)} />

          {/* ── Sub-navbar ── */}
          <SubNavbar active={activeSubnav} onChange={setActiveSubnav} />

          {/* ── Main content ── */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto py-4 flex flex-col gap-4">

              {/* Page title + period */}
              <div className="flex items-start justify-between">
                <div>
                  <Text variant="h4" weight="bold">Overview</Text>
                  <Text variant="body-sm" color="muted" className="mt-1">
                    Welcome back, Freddy — here's what's happening today.
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40">
                    <Select
                      options={PERIOD_OPTIONS}
                      value={period}
                      onChange={(opt) => setPeriod(opt as { value: string; label: string })}
                    />
                  </div>
                  <Button size="sm" onClick={() => toast.success('Report exported!')}>Export</Button>
                </div>
              </div>

              {/* Alert */}
              {alertVisible && (
                <Alert
                  variant="info"
                  title="Scheduled maintenance"
                  description="Maintenance window on Apr 28 from 02:00–04:00 UTC. No downtime expected."
                  onClose={() => setAlert(false)}
                />
              )}

              {/* KPI cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                <StatCard label="Total Revenue"  value="$48,295" delta="+12.5%" positive sub="vs last period" />
                <StatCard label="Active Users"   value="3,842"   delta="+8.2%"  positive sub="vs last period" />
                <StatCard label="New Orders"     value="284"     delta="+4.1%"  positive sub="vs last period" />
                <StatCard label="Churn Rate"     value="2.4%"    delta="+0.3%"  positive={false} sub="vs last period" />
              </div>

              {/* Progress goals */}
              <Card shadow="sm" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <Text variant="h6" weight="semibold">Goal progress</Text>
                  <Text variant="caption" color="muted">Period: {period?.label}</Text>
                </div>
                <div className="space-y-5">
                  {[
                    { label: 'Revenue target ($60k)',       pct: 80, variant: 'success' as const },
                    { label: 'User acquisition (5k)',       pct: 77, variant: 'info'    as const },
                    { label: 'Support tickets resolved',    pct: 55, variant: 'warning' as const },
                    { label: 'Churn reduction goal',        pct: 30, variant: 'danger'  as const },
                  ].map((g) => (
                    <div key={g.label}>
                      <div className="flex justify-between mb-2">
                        <Text variant="body-sm" weight="medium">{g.label}</Text>
                        <Text variant="body-sm" color="muted">{g.pct}%</Text>
                      </div>
                      <Progress value={g.pct} variant={g.variant} size="sm" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Orders + Activity */}
              <Card shadow="sm" padding="lg">
                <Tabs defaultValue="orders">
                  <div className="flex items-center justify-between mb-6">
                    <TabList>
                      <Tab value="orders">Recent Orders</Tab>
                      <Tab value="activity">Activity</Tab>
                      <Tab value="reports">Reports</Tab>
                    </TabList>
                    <Button size="sm" variant="outline" onClick={() => toast.success('Export started!')}>
                      Export CSV
                    </Button>
                  </div>

                  <TabPanel value="orders">
                    <Table<Order>
                      columns={ORDER_COLUMNS}
                      data={pageSlice}
                      keyExtractor={(r) => r.id}
                      striped
                      size="md"
                    />
                    <div className="mt-5 flex justify-end">
                      <Pagination
                        page={page}
                        totalPages={Math.ceil(ORDERS.length / PAGE_SIZE)}
                        onChange={setPage}
                        showInfo
                        totalItems={ORDERS.length}
                        pageSize={PAGE_SIZE}
                        size="sm"
                      />
                    </div>
                  </TabPanel>

                  <TabPanel value="activity">
                    <div className="divide-y divide-gray-100">
                      {[
                        { text: 'Alice completed onboarding',         time: '2 min ago',  v: 'success' as const },
                        { text: 'New order #4521 placed by Carol',    time: '18 min ago', v: 'info'    as const },
                        { text: 'Server response time exceeded 500ms', time: '1 hr ago',  v: 'warning' as const },
                        { text: 'Payment failed for order #4518',     time: '3 hr ago',   v: 'danger'  as const },
                        { text: 'Weekly report generated',            time: '5 hr ago',   v: 'default' as const },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-4">
                          <div className="flex items-center gap-3">
                            <BadgeDot variant={item.v} />
                            <Text variant="body-sm">{item.text}</Text>
                          </div>
                          <Text variant="caption" color="muted">{item.time}</Text>
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel value="reports">
                    <div className="py-10 flex flex-col items-center gap-3">
                      <Spinner size="md" />
                      <Text variant="body-sm" color="muted">Generating report…</Text>
                    </div>
                  </TabPanel>
                </Tabs>
              </Card>

              {/* Team + Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Team */}
                <Card shadow="sm" padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <Text variant="h6" weight="semibold">Team</Text>
                    <Button size="sm" variant="outline" onClick={() => setModal(true)}>Invite</Button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {TEAM.map((m) => (
                      <div key={m.name} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <Avatar name={m.name} size="sm" status={m.status} />
                          <div>
                            <Text variant="body-sm" weight="medium">{m.name}</Text>
                            <Text variant="caption" color="muted">{m.role}</Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default" size="sm">{m.tasks} tasks</Badge>
                          <Dropdown
                            trigger={
                              <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                                <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
                              </button>
                            }
                            align="right"
                          >
                            <DropdownItem label="View profile" />
                            <DropdownItem label="Send message" />
                            <DropdownItem label="Remove" variant="danger" onClick={() => toast.error(`${m.name} removed`)} />
                          </Dropdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick actions + System status */}
                <div className="space-y-6 flex flex-col gap-4">
                  <Card shadow="sm" padding="lg">
                    <Text variant="h6" weight="semibold" className="mb-5">Quick actions</Text>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'New order',    variant: 'primary'   as const, fn: () => toast.success('New order form opened')     },
                        { label: 'Add user',     variant: 'secondary' as const, fn: () => setModal(true)                             },
                        { label: 'Run report',   variant: 'outline'   as const, fn: () => toast.info('Report queued')                },
                        { label: 'View billing', variant: 'ghost'     as const, fn: () => toast.info('Redirecting to billing…')      },
                      ].map((btn) => (
                        <Button key={btn.label} variant={btn.variant} fullWidth size="sm" onClick={btn.fn}>
                          {btn.label}
                        </Button>
                      ))}
                    </div>
                  </Card>

                  <Card shadow="sm" padding="lg">
                    <Text variant="h6" weight="semibold" className="mb-5">System status</Text>
                    <div className="space-y-4">
                      {[
                        { svc: 'API',      up: true,  degraded: false },
                        { svc: 'Database', up: true,  degraded: false },
                        { svc: 'Storage',  up: true,  degraded: true  },
                        { svc: 'CDN',      up: false, degraded: false },
                      ].map(({ svc, up, degraded }) => (
                        <div key={svc} className="flex items-center justify-between">
                          <Text variant="body-sm">{svc}</Text>
                          <BadgeDot
                            variant={!up ? 'danger' : degraded ? 'warning' : 'success'}
                            label={!up ? 'Down' : degraded ? 'Degraded' : 'Operational'}
                            pulse={up}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Invite modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModal(false)}
        title="Invite team member"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={() => { setModal(false); toast.success('Invitation sent!'); }}>Send invite</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select
            label="Role"
            options={[
              { value: 'admin',  label: 'Admin'  },
              { value: 'member', label: 'Member' },
              { value: 'viewer', label: 'Viewer' },
            ]}
            placeholder="Select a role"
          />
        </div>
      </Modal>
    </>
  );
}
