import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isDarkAtom } from '../atoms/themeAtom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isDark] = useAtom(isDarkAtom);
  
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">AI 멀티 에이전트</span>로<br />
            더 똑똑한 답변을 받아보세요
          </h1>
          <p className="hero-description">
            여러 AI 전문가들이 협력하여 정확하고 깊이 있는 답변을 제공합니다
          </p>
          <div className="hero-buttons">
            <button 
              className={`cta-button ${isDark ? 'dark' : ''}`}
              onClick={() => navigate('/chat')}
            >
              <span>무료로 시작하기</span>
              <i className="bi bi-arrow-right"></i>
            </button>
            <button 
              className={`demo-button ${isDark ? 'dark' : ''}`}
              onClick={() => navigate('/jotai-test')}
            >
              <span>데모 보기</span>
              <i className="bi bi-play-circle"></i>
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="network-visualization">
            <div className="central-node">
              <i className="bi bi-cpu"></i>
            </div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`satellite-node node-${i}`}>
                <i className="bi bi-robot"></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">
          <span className="gradient-text">AI 멀티 에이전트</span>의 특별함
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-braces-asterisk"></i>
            </div>
            <h3>전문성</h3>
            <p>각 분야별 전문 AI가 협력하여 더 정확한 답변을 제공합니다</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-lightning-charge"></i>
            </div>
            <h3>빠른 응답</h3>
            <p>실시간 병렬 처리로 복잡한 질문도 빠르게 답변합니다</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3>신뢰성</h3>
            <p>AI 간 상호 검증으로 높은 정확도를 보장합니다</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <div className="demo-visual">
          <div className="chat-preview">
            {/* 채팅 미리보기 UI */}
          </div>
        </div>
        <div className="demo-content">
          <h2 className="section-title">실시간으로 체험해보세요</h2>
          <p className="demo-description">
            지금 바로 AI 멀티 에이전트와 대화를 시작해보세요.<br />
            복잡한 설정 없이 질문하면 최적의 답변을 찾아드립니다.
          </p>
          <button 
            className={`cta-button ${isDark ? 'dark' : ''}`}
            onClick={() => navigate('/chat')}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 