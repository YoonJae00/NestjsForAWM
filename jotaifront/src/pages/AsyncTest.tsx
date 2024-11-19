import React, { Suspense } from 'react'; // Suspense import 추가
import { atom, useAtom } from 'jotai';
import { loginAtom } from '../atoms/authAtom';

// 비동기 데이터를 위한 타입 정의
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 기본적인 비동기 atom
const asyncTodoAtom = atom(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data: Todo = await response.json();
  return data;
});

// 로딩 상태를 포함한 비동기 atom
const todoWithStatusAtom = atom(async (get) => {
  try {
    const data = await get(asyncTodoAtom);
    return { status: 'success' as const, data };
  } catch (error) {
    return { status: 'error' as const, error };
  }
});

// 수정 가능한 비동기 atom
const writableAsyncAtom = atom(
  async (get) => await get(asyncTodoAtom),
  async (_get, _set, newTitle: string) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({ title: newTitle }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    return response.json();
  }
);

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
  },
  section: {
    margin: '1rem 0',
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
  },
  input: {
    padding: '0.5rem',
    margin: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loginSection: {
    margin: '2rem 0',
    padding: '2rem',
    borderRadius: '8px',
    background: 'var(--card-bg, white)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loginButton: {
    padding: '0.8rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: '0.5rem',
  }
} as const;

const AsyncTest = () => {
  const [todo] = useAtom(asyncTodoAtom);
  const [todoWithStatus] = useAtom(todoWithStatusAtom);
  const [writableTodo, updateTodo] = useAtom(writableAsyncAtom);
  const [newTitle, setNewTitle] = React.useState('');
  const [auth, login] = useAtom(loginAtom);
  const [userId, setUserId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        userId,
        userPassword: password
      });
      setError(null);
    } catch (err) {
      setError('로그인에 실패했습니다.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>비동기 Atom 테스트</h1>

      <div style={styles.section}>
        <h2>기본 비동기 데이터</h2>
        <Suspense fallback={<div>로딩 중...</div>}>
          <pre>{JSON.stringify(todo, null, 2)}</pre>
        </Suspense>
      </div>

      <div style={styles.section}>
        <h2>상태를 포함한 비동기 데이터</h2>
        <Suspense fallback={<div>로딩 중...</div>}>
          <pre>{JSON.stringify(todoWithStatus, null, 2)}</pre>
        </Suspense>
      </div>

      <div style={styles.section}>
        <h2>수정 가능한 비동기 데이터</h2>
        <Suspense fallback={<div>로딩 중...</div>}>
          <pre>{JSON.stringify(writableTodo, null, 2)}</pre>
          <input
            style={styles.input}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="새로운 제목 입력"
          />
          <button 
            style={styles.button}
            onClick={() => updateTodo(newTitle)}
          >
            업데이트
          </button>
        </Suspense>
      </div>

      <div style={styles.loginSection}>
        <h2>로그인 테스트</h2>
        <form style={styles.loginForm} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>아이디</label>
            <input
              style={styles.input}
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디 입력"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>비밀번호</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
          <button type="submit" style={styles.loginButton}>
            로그인
          </button>
          {error && <div style={styles.errorMessage}>{error}</div>}
        </form>
        
        {auth && (
          <div style={{ marginTop: '1rem' }}>
            <h3>로그인 결과:</h3>
            <pre>{JSON.stringify(auth, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsyncTest;