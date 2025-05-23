'use client';
import { useState } from 'react';

import { Form, Button, Card, Container } from 'react-bootstrap';

export default function AddUserPage() {
  const [formData, setFormData] = useState({ name: '', email: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('image', formData.image);

    
    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    });

    const uploadedUser = await uploadRes.json();

    // Store in DB
    const saveRes = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadedUser),
    });

    const finalUser = await saveRes.json();
    console.log(finalUser);
    alert('User added successfully!');
  };

  return (
  <Container className="mt-5">
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4">Add New User</Card.Title>
        
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter full name" 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email address" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control 
              type="file" 
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              required 
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Add User
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  </Container>
);
}
