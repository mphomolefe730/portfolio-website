// src/modules/core/theme/ThemeToggle.tsx
import { useThemePreference } from '../../../hooks/useThemePreference';
import { THEMES } from '../../../configs/themes';
import './themeToggle.css';

export function ThemeToggle() {
  const { theme, cycleTheme, availableThemes } = useThemePreference();

  // If only 1 theme is available, hide the controls
  if (availableThemes.length <= 1) {
    return null;
  }

  return (
    <div className="themeToggleContainer">
      {/* Quick Click Switcher */}
      <button
        type="button"
        className="themeToggleBtn"
        onClick={cycleTheme}
        aria-label="Cycle theme"
      >
        <span className="themeToggleOrbit">MM</span>
        <span className="themeToggleLabel">{THEMES[theme]?.label || theme}</span>
      </button>

      {/* Dropdown for Direct Selection */}
      {/* <select
        className="themeSelectDropdown"
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        aria-label="Select site theme"
      >
        {availableThemes.map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {THEMES[themeKey]?.label || themeKey}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default ThemeToggle;