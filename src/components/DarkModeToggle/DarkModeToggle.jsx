// src/components/DarkModeToggle.js
import { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
