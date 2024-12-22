import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginModal from './Login';

function BuyButton({ productId }) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate(); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleBuy = () => {
    const token = localStorage.getItem('token'); // Check for token
    if (token) {
      // Pass productId and quantity to the Payment page
      navigate('/payment', { state: { product_id: productId, quantity } });
    } else {
      handleShow(); // Show login modal
    }
  };

  return (
    <>
      <Container className="text-center mt-4">
        <h1>Quantity of tickets:</h1>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button variant="danger" onClick={handleDecrement} className="mx-2">
            -
          </Button>
          <span style={{ fontSize: '1.5rem', minWidth: '50px' }}>{quantity}</span>
          <Button variant="success" onClick={handleIncrement} className="mx-2">
            +
          </Button>
        </div>

        <Button variant="primary" onClick={handleBuy}>
          BUY
        </Button>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"black"}} >You have to login for purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginModal />
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
