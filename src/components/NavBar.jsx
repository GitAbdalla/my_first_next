'use client';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function MyNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link href="/" className="navbar-brand">MyNextApp</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/users" className="nav-link">Users</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}