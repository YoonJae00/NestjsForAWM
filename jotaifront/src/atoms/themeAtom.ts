import { atom } from 'jotai';

// localStorage에서 다크모드 상태를 가져옴
const initialDarkMode = localStorage.getItem('darkMode') === 'true';

export const isDarkAtom = atom(initialDarkMode);