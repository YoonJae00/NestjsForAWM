import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isDarkAtom } from '../atoms/themeAtom';
import { ThemeToggle } from './ThemeToggle';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDark] = useAtom(isDarkAtom);

  return (
    <div className={isDark ? 'dark-mode' : ''}>
      <Navbar bg={isDark ? 'dark' : 'light'} variant={isDark ? 'dark' : 'light'} expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/jotai-test">Jotai Test</Nav.Link>
            </Nav>
            <ThemeToggle />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout; 