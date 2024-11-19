import React from 'react';
import { useAtom } from 'jotai';
import '../styles/JotaiTest.css';
import { texttestAtom } from '../atoms/textAtom';
import { useNavigate } from 'react-router-dom';
import { numbertestAtom } from '../atoms/textAtom';
import { authAtom } from '../atoms/authAtom';

const JotaiTest = () => {
  const navigate = useNavigate();
  const [count, setCount] = useAtom(numbertestAtom);
  const [text2, setText2] = useAtom(texttestAtom);
  const [auth] = useAtom(authAtom);

  return (
    <div className="jotai-container">
      <h1 className="jotai-title">Jotai 테스트</h1>
      <div className="jotai-grid">
        <div className="jotai-card">
          <div className="card-header">카운터 예제</div>
          <div className="card-body">
            <p className="counter-text">카운트: {count}</p>
            <button 
              className="primary-button"
              onClick={() => setCount(c => c + 1)}
            >
              증가
            </button>
            <p className="counter-text">토큰 정보: {auth ? JSON.stringify(auth) : '로그인 안됨'}</p>
          </div>
        </div>

        <div className="jotai-card">
        <button 
          className="primary-button"
          onClick={() => navigate('/derived-test')}
        >
          파생 Atom 테스트 보기
        </button>
        <button 
          className="primary-button"
          onClick={() => navigate('/async-test')}
        >
        비동기-test 보기
        </button>
  
          <div className="card-header">텍스트 예제</div>
          <button>ㄹㄴㅇㄹㄴ</button>
          <div className="card-body">
            <p className="text-display">{text2}</p>
            <div className="input-group">
              <input
                type="text"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="텍스트를 입력하세요"
                className="text-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JotaiTest; 