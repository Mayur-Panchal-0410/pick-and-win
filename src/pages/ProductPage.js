import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Navigation from '../components/NavigationBar';
import './ProductPage.css';
import BuyButton from '../components/BuyButton';
import Footer from '../components/Footer';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(1); // Default ticket quantity to 1

    // Fetch product data on mount based on id
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:450/getproductsbyid/${id}`,
                    {
                        headers: {
                            authorization: accessToken,
                        },
                    }
                );
                setProduct(response.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle incrementing and decrementing ticket count
    const handleIncrement = () => {
        if (count < product.ticket_quantity - product.sold_tickets) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // Handle the Buy button action
    const handleBuy = () => {
        console.log(`Buying ${count} tickets for product ID: ${id}`);
        // Implement buy functionality here
    };

    return (
        <>
            <Navigation />
            <Container className="mt-4">
                <Row>
                    <Col sm={12} md={6}>
                        <img
                            src={product.image_path}
                            alt={product.product_name}
                            className="product-image"
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="product-info">
                            <h2>{product.product_name}</h2>
                            <p>{product.description || 'No description available'}</p>
                            <p>
                                <strong>Price:</strong> ${product.product_price}
                            </p>
                            <p>
                                <strong>Quantity Available:</strong>{' '}
                                {product.ticket_quantity - product.sold_tickets}
                            </p>

                            <div className="ticket-selector mt-4">
                                <h4>Quantity of tickets:</h4>
                               
                               <BuyButton productId={id}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h3>HOW TO PLAY?</h3>
                        <ul className="how-to-play-list">
                            <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                            <li>Ticket sales close once all are sold or the purchase period ends.</li>
                            <li>
                                Winners are chosen randomly after the ticket purchase period closes.
                            </li>
                            <li>
                                More tickets increase your chances, but each ticket qualifies for one
                                win only.
                            </li>
                            <li>
                                Fair play is mandatory; any manipulation results in
                                disqualification.
                            </li>
                            <li>
                                Keep tickets safe and check winning numbers once results are
                                announced.
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default ProductPage;
