import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import LoginModal from './Login';

function BuyButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="text-center">
        <Button variant="primary" onClick={handleShow}>
          BUY
        </Button>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You have to login for purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LoginModal/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BuyButton;
