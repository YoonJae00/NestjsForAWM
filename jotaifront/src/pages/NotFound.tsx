import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isDarkAtom } from '../atoms/themeAtom';
import '../styles/NotFound.css';

const NotFound = () => {
  const [isDark] = useAtom(isDarkAtom);

  return (
    <div className="error-container">
      <div className="error-grid">
        <div className="error-content">
          <div className="error-header">
            <div className="glitch-text" data-text="404">404</div>
            <h1>AI의 영역을 벗어났습니다</h1>
            <p>요청하신 페이지를 찾을 수 없어요</p>
          </div>
          
          <div className="action-buttons">
            <Link to="/" className={`primary-link ${isDark ? 'dark' : ''}`}>
              <i className="bi bi-house"></i>
              <span>홈으로 가기</span>
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className={`back-button ${isDark ? 'dark' : ''}`}
            >
              <i className="bi bi-arrow-left"></i>
              <span>이전으로</span>
            </button>
          </div>
        </div>

        <div className="error-visual">
          <div className="ai-network">
            <div className="network-core">
              <i className="bi bi-question-octagon"></i>
            </div>
            <div className="network-nodes">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`network-node node-${i}`}>
                  <i className="bi bi-robot"></i>
                </div>
              ))}
            </div>
            <div className="network-lines"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 