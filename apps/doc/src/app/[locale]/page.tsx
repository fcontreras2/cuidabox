'use client';

import { useState } from 'react';
import {
  type TableColumn,
  Alert,
  Avatar,
  Badge,
  BadgeDot,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  DropdownItem,
  FormHelperText,
  Input,
  Label,
  Modal,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Text,
  Textarea,
  ToastProvider,
  Tooltip,
  toast,
} from 'fcontreras2-ui';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2 font-medium">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

type TableRow = { name: string; role: string; status: string };

const tableColumns: TableColumn<TableRow>[] = [
  { key: 'name', header: 'Name', accessor: 'name', sortable: true },
  { key: 'role', header: 'Role', accessor: 'role' },
  { key: 'status', header: 'Status', accessor: (row) => (
    <Badge variant={row.status === 'Active' ? 'success' : 'danger'}>{row.status}</Badge>
  )},
];

const tableData = [
  { name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
  { name: 'Bob Smith', role: 'Designer', status: 'Inactive' },
  { name: 'Carol White', role: 'PM', status: 'Active' },
];

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [radioValue, setRadioValue] = useState('option1');

  return (
    <>
      <ToastProvider position="top-right" autoClose={3000} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <Text variant="h1" weight="bold">fcontreras2-ui</Text>
          <Text variant="body" color="muted" className="mt-2">
            Showcase de todos los componentes disponibles en la librería
          </Text>
        </div>

        {/* TYPOGRAPHY */}
        <Section title="Typography — Text">
          <Row label="Headings">
            <div className="space-y-1 w-full">
              {(['h1','h2','h3','h4','h5','h6'] as const).map(v => (
                <Text key={v} variant={v}>{v.toUpperCase()} — The quick brown fox</Text>
              ))}
            </div>
          </Row>
          <Row label="Body variants">
            <Text variant="body">body</Text>
            <Text variant="body-sm">body-sm</Text>
            <Text variant="caption">caption</Text>
            <Text variant="overline">overline</Text>
            <Text variant="code">code</Text>
          </Row>
          <Row label="Colors">
            {(['default','muted','primary','success','warning','danger'] as const).map(c => (
              <Text key={c} color={c}>{c}</Text>
            ))}
          </Row>
          <Row label="Weights">
            {(['light','normal','medium','semibold','bold'] as const).map(w => (
              <Text key={w} weight={w}>{w}</Text>
            ))}
          </Row>
        </Section>

        {/* BUTTON */}
        <Section title="Button">
          <Row label="Variants">
            {(['primary','secondary','danger','ghost','outline'] as const).map(v => (
              <Button key={v} variant={v}>{v}</Button>
            ))}
          </Row>
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <Button key={s} size={s}>Size {s}</Button>
            ))}
          </Row>
          <Row label="States">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth variant="secondary">Full width</Button>
          </Row>
        </Section>

        {/* INPUT */}
        <Section title="Input">
          <Row label="Default">
            <Input label="Name" placeholder="Enter your name" className="w-64" />
          </Row>
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <Input key={s} size={s} placeholder={`Size ${s}`} className="w-48" />
            ))}
          </Row>
          <Row label="States">
            <Input label="Error" error="This field is required" placeholder="Error state" className="w-64" />
            <Input label="Helper" helperText="We'll never share your email" placeholder="With helper" className="w-64" />
            <Input label="Left addon" leftAddon="$" placeholder="0.00" className="w-48" />
            <Input label="Right addon" rightAddon=".com" placeholder="domain" className="w-48" />
          </Row>
        </Section>

        {/* TEXTAREA */}
        <Section title="Textarea">
          <Row label="Default">
            <Textarea label="Message" placeholder="Type your message..." className="w-80" />
          </Row>
          <Row label="Error">
            <Textarea label="Bio" error="Bio is too short" placeholder="Tell us about yourself" className="w-80" />
          </Row>
        </Section>

        {/* SELECT */}
        <Section title="Select">
          <Row label="Default">
            <div className="w-72">
              <Select
                label="Country"
                options={[
                  { value: 'mx', label: 'Mexico' },
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'es', label: 'Spain' },
                ]}
                placeholder="Select a country"
              />
            </div>
          </Row>
          <Row label="Multi-select">
            <div className="w-72">
              <Select
                label="Skills"
                isMulti
                options={[
                  { value: 'react', label: 'React' },
                  { value: 'ts', label: 'TypeScript' },
                  { value: 'node', label: 'Node.js' },
                ]}
                placeholder="Select skills"
              />
            </div>
          </Row>
          <Row label="Error">
            <div className="w-72">
              <Select
                label="Role"
                error="Please select a role"
                options={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]}
                placeholder="Select a role"
              />
            </div>
          </Row>
        </Section>

        {/* CHECKBOX */}
        <Section title="Checkbox">
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <Checkbox key={s} size={s} label={`Size ${s}`} />
            ))}
          </Row>
          <Row label="States">
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Error" error="Required" />
          </Row>
        </Section>

        {/* SWITCH */}
        <Section title="Switch">
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <Switch key={s} size={s} label={`Size ${s}`} />
            ))}
          </Row>
          <Row label="States">
            <Switch label="On" defaultChecked />
            <Switch label="Disabled" disabled />
            <Switch label="Error" error="Required" />
          </Row>
        </Section>

        {/* RADIO */}
        <Section title="Radio & RadioGroup">
          <Row label="Vertical (default)">
            <RadioGroup
              name="demo-v"
              label="Preferred plan"
              value={radioValue}
              onChange={setRadioValue}
            >
              <Radio value="option1" label="Starter" />
              <Radio value="option2" label="Pro" />
              <Radio value="option3" label="Enterprise" />
            </RadioGroup>
          </Row>
          <Row label="Horizontal">
            <RadioGroup name="demo-h" label="Size" orientation="horizontal" defaultValue="m">
              <Radio value="s" label="S" />
              <Radio value="m" label="M" />
              <Radio value="l" label="L" />
              <Radio value="xl" label="XL" />
            </RadioGroup>
          </Row>
        </Section>

        {/* DATE PICKER */}
        <Section title="DatePicker">
          <Row label="Default">
            <DatePicker
              label="Birthday"
              selected={selectedDate}
              onChange={setSelectedDate}
              placeholder="MM/DD/YYYY"
            />
          </Row>
        </Section>

        {/* LABEL & FORMHELPERTEXT */}
        <Section title="Label & FormHelperText">
          <Row label="Label variants">
            <Label>Default label</Label>
            <Label required>Required</Label>
            <Label error>Error label</Label>
          </Row>
          <Row label="FormHelperText variants">
            {(['default','error','success','warning'] as const).map(v => (
              <FormHelperText key={v} variant={v}>Helper text ({v})</FormHelperText>
            ))}
          </Row>
        </Section>

        {/* CARD */}
        <Section title="Card">
          <Row label="Shadow sizes">
            <div className="flex gap-4 flex-wrap w-full">
              {(['none','sm','md','lg'] as const).map(s => (
                <Card key={s} shadow={s} title={`Shadow ${s}`} description="Card description text" className="w-48">
                  <Text variant="body-sm" color="muted">Card body content.</Text>
                </Card>
              ))}
            </div>
          </Row>
          <Row label="With footer">
            <Card title="With footer" description="A card with a footer action" footer={<Button size="sm">Action</Button>} className="w-72">
              <Text variant="body-sm" color="muted">Some content inside the card.</Text>
            </Card>
          </Row>
        </Section>

        {/* ALERT */}
        <Section title="Alert">
          {(['default','success','warning','danger','info'] as const).map(v => (
            <Alert key={v} variant={v} title={v.charAt(0).toUpperCase() + v.slice(1)} description={`This is a ${v} alert message.`} onClose={() => {}} />
          ))}
        </Section>

        {/* BADGE */}
        <Section title="Badge">
          <Row label="Variants">
            {(['default','success','warning','danger','info'] as const).map(v => (
              <Badge key={v} variant={v}>{v}</Badge>
            ))}
          </Row>
          <Row label="Sizes">
            {(['sm','md'] as const).map(s => (
              <Badge key={s} size={s} variant="default">Size {s}</Badge>
            ))}
          </Row>
        </Section>

        {/* BADGE DOT */}
        <Section title="BadgeDot">
          <Row label="Variants">
            {(['default','success','warning','danger','info'] as const).map(v => (
              <BadgeDot key={v} variant={v} label={v} />
            ))}
          </Row>
          <Row label="Pulse">
            <BadgeDot variant="success" label="Online" pulse />
            <BadgeDot variant="danger" label="Critical" pulse />
          </Row>
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <BadgeDot key={s} size={s} variant="info" label={`Size ${s}`} />
            ))}
          </Row>
        </Section>

        {/* AVATAR */}
        <Section title="Avatar">
          <Row label="Sizes">
            {(['xs','sm','md','lg','xl'] as const).map(s => (
              <Avatar key={s} size={s} name="Freddy Contreras" />
            ))}
          </Row>
          <Row label="With image">
            <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" size="md" />
            <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="lg" />
          </Row>
          <Row label="Status">
            {(['online','offline','away','busy'] as const).map(s => (
              <Avatar key={s} name={s} size="md" status={s} />
            ))}
          </Row>
          <Row label="Shape">
            <Avatar name="Square" size="md" shape="square" />
            <Avatar name="Circle" size="md" shape="circle" />
          </Row>
        </Section>

        {/* SPINNER */}
        <Section title="Spinner">
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <Spinner key={s} size={s} label={`Size ${s}`} />
            ))}
          </Row>
        </Section>

        {/* SKELETON */}
        <Section title="Skeleton">
          <Row label="Text">
            <div className="w-64 space-y-2">
              <Skeleton variant="text" lines={3} />
            </div>
          </Row>
          <Row label="Circular">
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="circular" width={64} height={64} />
          </Row>
          <Row label="Rectangular">
            <Skeleton variant="rectangular" width={200} height={100} />
          </Row>
        </Section>

        {/* DIVIDER */}
        <Section title="Divider">
          <Row label="Horizontal">
            <div className="w-full">
              <Divider />
              <div className="my-4" />
              <Divider label="OR" />
              <div className="my-4" />
              <Divider label="Section title" labelAlign="left" />
            </div>
          </Row>
        </Section>

        {/* PROGRESS */}
        <Section title="Progress">
          <Row label="Variants">
            <div className="w-full space-y-3">
              {(['default','success','warning','danger','info'] as const).map(v => (
                <Progress key={v} value={60} variant={v} label={v} />
              ))}
            </div>
          </Row>
          <Row label="Sizes">
            <div className="w-full space-y-3">
              {(['sm','md','lg'] as const).map(s => (
                <Progress key={s} value={40} size={s} label={`Size ${s}`} />
              ))}
            </div>
          </Row>
        </Section>

        {/* TABS */}
        <Section title="Tabs">
          {(['line','pill','enclosed'] as const).map(v => (
            <Row key={v} label={`Variant: ${v}`}>
              <div className="w-full">
                <Tabs defaultValue="tab1" variant={v}>
                  <TabList>
                    <Tab value="tab1">Overview</Tab>
                    <Tab value="tab2">Settings</Tab>
                    <Tab value="tab3">Members</Tab>
                  </TabList>
                  <TabPanel value="tab1"><Text className="mt-4" color="muted">Overview content panel.</Text></TabPanel>
                  <TabPanel value="tab2"><Text className="mt-4" color="muted">Settings content panel.</Text></TabPanel>
                  <TabPanel value="tab3"><Text className="mt-4" color="muted">Members content panel.</Text></TabPanel>
                </Tabs>
              </div>
            </Row>
          ))}
        </Section>

        {/* BREADCRUMB */}
        <Section title="Breadcrumb">
          <Row label="Default">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumb' },
              ]}
            />
          </Row>
        </Section>

        {/* DROPDOWN */}
        <Section title="Dropdown">
          <Row label="Default">
            <Dropdown trigger={<Button variant="outline">Open Menu</Button>}>
              <DropdownItem label="Edit" />
              <DropdownItem label="Duplicate" />
              <DropdownItem label="Delete" variant="danger" />
            </Dropdown>
          </Row>
          <Row label="Align right">
            <Dropdown trigger={<Button variant="secondary">Right aligned</Button>} align="right">
              <DropdownItem label="Profile" />
              <DropdownItem label="Settings" />
              <DropdownItem label="Logout" variant="danger" />
            </Dropdown>
          </Row>
        </Section>

        {/* POPOVER */}
        <Section title="Popover">
          <Row label="Default">
            <Popover
              trigger={<Button variant="outline">Open Popover</Button>}
            >
              <div className="p-3 max-w-xs">
                <Text variant="body-sm" weight="semibold">Popover title</Text>
                <Text variant="body-sm" color="muted" className="mt-1">
                  This is the content inside the popover component.
                </Text>
              </div>
            </Popover>
          </Row>
        </Section>

        {/* TOOLTIP */}
        <Section title="Tooltip">
          <Row label="Placements">
            {(['top','bottom','left','right'] as const).map(p => (
              <Tooltip key={p} content={`Tooltip ${p}`} placement={p}>
                <Button variant="outline" size="sm">{p}</Button>
              </Tooltip>
            ))}
          </Row>
        </Section>

        {/* MODAL */}
        <Section title="Modal">
          <Row label="Default">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Example Modal"
              footer={
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                </div>
              }
            >
              <Text variant="body" color="muted">
                This is the modal body content. You can place any content here, including forms, images, or other components.
              </Text>
            </Modal>
          </Row>
        </Section>

        {/* TABLE */}
        <Section title="Table">
          <Row label="Default">
            <div className="w-full">
              <Table
                columns={tableColumns}
                data={tableData}
                keyExtractor={(row) => row.name}
                striped
                bordered
              />
            </div>
          </Row>
          <Row label="Loading state">
            <div className="w-full">
              <Table
                columns={tableColumns}
                data={[]}
                keyExtractor={(row) => row.name}
                loading
              />
            </div>
          </Row>
        </Section>

        {/* PAGINATION */}
        <Section title="Pagination">
          <Row label="Default">
            <Pagination
              page={page}
              totalPages={10}
              onChange={setPage}
              showInfo
              totalItems={100}
              pageSize={10}
            />
          </Row>
          <Row label="Sizes">
            {(['sm','md','lg'] as const).map(s => (
              <Pagination key={s} page={1} totalPages={5} onChange={() => {}} size={s} />
            ))}
          </Row>
        </Section>

        {/* TOAST */}
        <Section title="Toast">
          <Row label="Trigger toasts">
            <Button variant="primary" onClick={() => toast.success('Operation successful!')}>Success</Button>
            <Button variant="secondary" onClick={() => toast.error('Something went wrong!')}>Error</Button>
            <Button variant="outline" onClick={() => toast.warning('Please review your input.')}>Warning</Button>
            <Button variant="ghost" onClick={() => toast.info('Here is some information.')}>Info</Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.promise(
                  new Promise((res) => setTimeout(res, 2000)),
                  { pending: 'Loading...', success: 'Done!', error: 'Failed!' }
                )
              }
            >
              Promise
            </Button>
          </Row>
        </Section>
      </main>
    </>
  );
}
