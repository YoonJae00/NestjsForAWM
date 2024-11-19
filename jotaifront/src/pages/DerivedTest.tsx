import React from 'react';
import { atom, useAtom } from 'jotai';
import { numbertestAtom } from '../atoms/textAtom';

const styles = {
  derivedContainer: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
  },
  section: {
    margin: '2rem 0',
    padding: '1.5rem',
    borderRadius: '8px',
    background: 'var(--card-bg, white)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    borderRadius: '4px',
    border: 'none',
    background: 'var(--primary-color, #0066ff)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heading: {
    color: 'var(--text-primary)',
    marginBottom: '1rem',
  },
  text: {
    color: 'var(--text-secondary)',
    margin: '0.5rem 0',
  }
} as const;

// 파생 atom (읽기 전용)
const doubleCountAtom = atom((get) => get(numbertestAtom) * 2);
const isEvenAtom = atom((get) => get(numbertestAtom) % 2 === 0);

// 파생 atom (읽기/쓰기)
const countWithMessageAtom = atom(
  (get) => ({
    count: get(numbertestAtom),
    message: `현재 숫자는 ${get(numbertestAtom)}입니다`
  }),
  (get, set, newCount: number) => {
    set(numbertestAtom, newCount);
    console.log(`숫자가 ${newCount}로 변경되었습니다`);
  }
);

const DerivedTest = () => {
  const [count, setCount] = useAtom(numbertestAtom);
  const [doubleCount] = useAtom(doubleCountAtom);
  const [isEven] = useAtom(isEvenAtom);
  const [countWithMessage, setCountWithMessage] = useAtom(countWithMessageAtom);

  return (
    <div style={styles.derivedContainer}>
      <h1 style={styles.heading}>파생 Atom 테스트</h1>
      
      <div style={styles.section}>
        <h2 style={styles.heading}>기본 카운터</h2>
        <p style={styles.text}>카운트: {count}</p>
        <button 
          style={styles.button}
          onClick={() => setCount(c => c + 1)}
        >
          증가
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>파생된 값들</h2>
        <p style={styles.text}>2배 값: {doubleCount}</p>
        <p style={styles.text}>짝수인가요? {isEven ? '네' : '아니오'}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>복잡한 파생 상태</h2>
        <p style={styles.text}>{countWithMessage.message}</p>
        <button 
          style={styles.button}
          onClick={() => setCountWithMessage(count + 5)}
        >
          5 증가
        </button>
      </div>
    </div>
  );
};

export default DerivedTest;