'use client';

import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function UserCard({ user }) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
        <Card.Text>
          <strong>Email:</strong> {user.email}<br/>
          <strong>Phone:</strong> {user.phone}<br/>
          <strong>Website:</strong> {user.website}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="p-4 text-center">Error: {error}</Alert>;

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Users</h2>
      <Row>
        {users.map(user => (
          <Col md={4} key={user.id}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}