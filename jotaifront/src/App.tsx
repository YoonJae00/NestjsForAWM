import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import Layout from './components/Layout';
import './styles/darkMode.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
