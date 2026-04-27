'use client';

import { Avatar, Badge, Button, Text } from 'fcontreras2-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export type NavItem = {
  label: string;
  icon: IconDefinition;
  id: string;
  badge?: number;
};

type Props = {
  open: boolean;
  items: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
  user?: { name: string; email: string };
};

export default function Sidebar({ open, items, activeId, onChange, user }: Props) {
  return (
    <aside
      className={`shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col transition-all duration-200 overflow-hidden ${
        open ? 'w-56' : 'w-14'
      }`}
    >
      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={activeId === item.id ? 'primary' : 'ghost'}
            size="sm"
            fullWidth
            onClick={() => onChange(item.id)}
            className="justify-start gap-3"
          >
            <FontAwesomeIcon icon={item.icon} className="w-4 h-4 shrink-0" />
            {open && (
              <Text
                variant="body-sm"
                weight="medium"
                className={clsx('flex-1 text-left truncate', activeId === item.id ? 'text-white!' : '')}
              >
                {item.label}
              </Text>
            )}
            {open && item.badge !== undefined && (
              <Badge variant="default" size="sm">{item.badge}</Badge>
            )}
          </Button>
        ))}
      </nav>

      {open && user && (
        <div className="px-3 py-3 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Avatar name={user.name} size="xs" status="online" />
            <div className="min-w-0">
              <Text variant="caption" weight="semibold" truncate>{user.name}</Text>
              <Text variant="caption" color="muted" truncate>{user.email}</Text>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
