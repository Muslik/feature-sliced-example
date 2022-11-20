import { Dropdown, Button } from "src/shared/ui";
import { useThemeSwitcher } from "../lib";

import styles from "./ThemeSwitcher.module.scss";

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
          <div className={styles.dropdownItem}>Выберите тему</div>
          <Button
            icon="sun"
            size="small"
            withFullWidth={true}
            theme="blueReverse"
            className={styles.dropdownItem}
            onClick={() => setTheme("light")}
          >
            Светлая
          </Button>
          <Button
            size="small"
            icon="moon"
            withFullWidth={true}
            className={styles.dropdownItem}
            onClick={() => setTheme("dark")}
          >
            Темная
          </Button>
        </>
      }
    />
  );
};
