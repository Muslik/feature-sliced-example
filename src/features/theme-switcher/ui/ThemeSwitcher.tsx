import { useMobile } from 'src/shared/lib';
import { Dropdown, Button, DropdownItem } from 'src/shared/ui';
import { useThemeSwitcher } from '../lib';

const THEME_MAPPING = {
  dark: 'Темная тема',
  light: 'Светлая тема',
};

const THEME_ICONS = {
  dark: 'moon',
  light: 'sun',
} as const;

export const ThemeSwitcher = () => {
  const isMobile = useMobile();
  const { theme, setTheme } = useThemeSwitcher();

  const dropdownTrigger = isMobile ? (
    <Button theme="blue" icon={THEME_ICONS[theme]} />
  ) : (
    <Button theme="blueReverse" icon={THEME_ICONS[theme]}>
      {THEME_MAPPING[theme]}
    </Button>
  );

  return (
    <Dropdown
      trigger={dropdownTrigger}
      overlay={
        <>
          <DropdownItem>Выберите тему</DropdownItem>
          <DropdownItem>
            <Button
              icon="sun"
              size="small"
              withFullWidth={true}
              theme="blueReverse"
              onClick={() => setTheme('light')}
            >
              Светлая
            </Button>
          </DropdownItem>
          <DropdownItem>
            <Button size="small" icon="moon" withFullWidth={true} onClick={() => setTheme('dark')}>
              Темная
            </Button>
          </DropdownItem>
        </>
      }
    />
  );
};
