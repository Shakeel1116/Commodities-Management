export default function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <button 
      onClick={toggleTheme}
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span className="toggle-icon">☀️</span>
      ) : (
        <span className="toggle-icon">🌙</span>
      )}
    </button>
  )
}