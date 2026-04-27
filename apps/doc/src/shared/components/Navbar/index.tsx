'use client';

import { Avatar, Button, Divider, Dropdown, DropdownItem, Text, Tooltip } from 'fcontreras2-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faBell, faChevronDown, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';

type Props = {
  onMenuToggle: () => void;
};

export default function Navbar({ onMenuToggle }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="h-14 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onMenuToggle} aria-label="Toggle sidebar">
          <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center">
            <Text variant="caption" weight="bold" className="text-white!">A</Text>
          </div>
          <Text variant="body" weight="semibold">Acme Inc.</Text>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip content={isDark ? 'Light mode' : 'Dark mode'} placement="bottom">
          <Button variant="ghost" size="sm" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Search" placement="bottom">
          <Button variant="ghost" size="sm">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Notifications" placement="bottom">
          <div className="relative">
            <Button variant="ghost" size="sm">
              <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
            </Button>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full pointer-events-none" />
          </div>
        </Tooltip>

        <Divider orientation="vertical" className="h-6 mx-1" />

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <Avatar name="Freddy Contreras" size="xs" status="online" />
              <Text variant="body-sm" weight="medium">Freddy</Text>
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
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
