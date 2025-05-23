'use client';
import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Alert, Image } from 'react-bootstrap';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">All Users</h2>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : users.length === 0 ? (
        <Alert variant="info">No users found</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {users.map(user => (
            <Col key={user._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Image 
                    src={user.image} 
                    alt={user.name} 
                    roundedCircle 
                    width={100} 
                    height={100} 
                    className="mb-3 object-fit-cover"
                  />
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {user.email}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}