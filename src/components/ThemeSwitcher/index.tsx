import { useEffect, useRef, useState } from "react";
import { themes, defaultThemeId, themeStorageKey, themeAutoSelectKey, getThemeByDay } from "../../data/themes";
import "./ThemeSwitcher.css";

function readStoredTheme() {
  try {
    const autoSelect = localStorage.getItem(themeAutoSelectKey);
    if (autoSelect === "true") {
      return getThemeByDay().id;
    }
    const stored = localStorage.getItem(themeStorageKey);
    if (stored && themes.some((theme) => theme.id === stored)) {
      return stored;
    }
  } catch {
    // localStorage unavailable — fall back to default
  }
  return defaultThemeId;
}

function ThemeSwitcher() {
  const [themeId, setThemeId] = useState(readStoredTheme);
  const [open, setOpen] = useState(false);
  const [autoSelect, setAutoSelect] = useState(() => {
    try {
      return localStorage.getItem(themeAutoSelectKey) === "true";
    } catch {
      return true;
    }
  });
  const panelRef = useRef(null);

  useEffect(() => {
    if (autoSelect) {
      const dayTheme = getThemeByDay();
      setThemeId(dayTheme.id);
    }
  }, [autoSelect]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem(themeStorageKey, themeId);
      localStorage.setItem(themeAutoSelectKey, autoSelect.toString());
    } catch {
      // ignore write failures (private browsing, storage full, etc.)
    }
  }, [themeId, autoSelect]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const activeTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];

  return (
    <div className="theme-switcher" ref={panelRef}>
      <button
        type="button"
        className="theme-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Change color theme"
      >
        <span className="theme-trigger-swatch">
          {activeTheme.swatch.slice(0, 2).map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </span>
        <span className="theme-trigger-label">{activeTheme.label}</span>
      </button>

      {open && (
        <div className="theme-panel" role="menu">
          <button
            type="button"
            className="theme-auto-toggle"
            onClick={() => setAutoSelect(!autoSelect)}
            title={autoSelect ? "Auto-theme is ON (changes daily)" : "Auto-theme is OFF (manual selection)"}
          >
            <span className="auto-icon">{autoSelect ? "🔄" : "🎨"}</span>
            <span className="auto-label">{autoSelect ? "Auto-theme ON" : "Manual theme"}</span>
          </button>
          <div className="theme-divider" />
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="menuitemradio"
              aria-checked={theme.id === themeId}
              className={
                "theme-option" + (theme.id === themeId ? " active" : "")
              }
              onClick={() => {
                setThemeId(theme.id);
                setAutoSelect(false);
                setOpen(false);
              }}
            >
              <span className="theme-option-swatch">
                {theme.swatch.map((color) => (
                  <span key={color} style={{ background: color }} />
                ))}
              </span>
              <span className="theme-option-text">
                <span className="theme-option-label">{theme.label}</span>
                <span className="theme-option-desc">{theme.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
