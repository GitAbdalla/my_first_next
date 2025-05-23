import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UsersLayout({ children }) {
  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Container className="py-3">
        <h1 className="display-5 fw-bold mb-4 text-primary">Users Management</h1>
        {children}
      </Container>
    </Container>
  );
}