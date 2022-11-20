import { useThemeSwitcher } from "src/features/theme-switcher";
import { Pages } from "src/pages";

function App() {
  useThemeSwitcher();
  return (
    <div>
      <Pages />
    </div>
  );
}

export default App;
