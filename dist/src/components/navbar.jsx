import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function navbar() {
  return (
    <>
      <Navbar
        bg='dark'
        data-bs-theme='dark'
        expand='lg'
        className='bg-body-tertiary mb-2'
      >
        <Container fluid>
          <Navbar.Brand to='/'>TA'AL Technical Test</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to='/'>
                <Nav.Link>Product List</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/imageGallery'>
                <Nav.Link>Image Gallery</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
              <Button variant='outline-success'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default navbar;
