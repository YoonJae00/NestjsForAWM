import { atom } from 'jotai';

const initialDarkMode = localStorage.getItem('darkMode') === 'true';

export const isDarkAtom = atom(initialDarkMode);