import { Dropdown, Button, DropdownItem } from "src/shared/ui";
import { useThemeSwitcher } from "../lib";

const THEME_MAPPING = {
  dark: "Темная тема",
  light: "Светлая тема",
};

const THEME_ICONS = {
  dark: "moon",
  light: "sun",
} as const;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeSwitcher();

  return (
    <Dropdown
      trigger={
        <Button theme="blueReverse" icon={THEME_ICONS[theme]}>
          {THEME_MAPPING[theme]}
        </Button>
      }
      overlay={
        <>
          <DropdownItem>Выберите тему</DropdownItem>
          <DropdownItem>
            <Button
              icon="sun"
              size="small"
              withFullWidth={true}
              theme="blueReverse"
              onClick={() => setTheme("light")}
            >
              Светлая
            </Button>
          </DropdownItem>
          <DropdownItem>
            <Button
              size="small"
              icon="moon"
              withFullWidth={true}
              onClick={() => setTheme("dark")}
            >
              Темная
            </Button>
          </DropdownItem>
        </>
      }
    />
  );
};
