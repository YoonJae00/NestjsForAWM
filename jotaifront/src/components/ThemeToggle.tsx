import React from 'react';
import { Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { isDarkAtom } from '../atoms/themeAtom';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useAtom(isDarkAtom);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('darkMode', (!isDark).toString());
  };

  return (
    <Button
      variant={isDark ? 'light' : 'dark'}
      size="sm"
      onClick={toggleTheme}
      className="ms-2"
    >
      {isDark ? '라이트 모드' : '다크 모드'}
    </Button>
  );
};