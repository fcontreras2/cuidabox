'use client';

import { Breadcrumb, Button, Divider } from 'fcontreras2-ui';

type Props = {
  items: string[];
  active: string;
  onChange: (value: string) => void;
};

export default function SubNavbar({ items, active, onChange }: Props) {
  return (
    <div className="h-10 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-6 gap-1 shrink-0">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
        className="mr-4"
      />
      <Divider orientation="vertical" className="h-4 mr-4" />
      {items.map((item) => (
        <Button
          key={item}
          size="sm"
          variant={active === item ? 'primary' : 'ghost'}
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
