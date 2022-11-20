import { useThemeSwitcher } from "src/features/theme-switcher";
import { Pages } from "src/pages";

function App() {
  useThemeSwitcher();
  return <Pages />;
}

export default App;
