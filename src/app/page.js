// app/page.jsx or src/app/page.jsx (depending on your folder structure)
'use client';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Welcome to MyNextApp</h1>
          <p className="lead">
            This is a simple and powerful Next.js app styled with React Bootstrap.
          </p>
          <Button variant="primary" href="/about" className="mt-3">
            Learn More
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
