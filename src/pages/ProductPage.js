import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BuyButton from '../components/BuyButton';
import Navigation from '../components/NavigationBar';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [count,setCount]=useState(0)

    // Fetch product data on mount based on id
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                console.log('Access Token:', accessToken);
                
                
                const response = await axios.get(`http://localhost:450/getproductsbyid/${id}`,{
                     headers: {
                        'authorization': accessToken
                    }
                });  // Assuming API endpoint
                console.log(response.data.data,"xxxxxxxxxxxxxxxxxxxxxxx")
                const fetchedProduct = response.data.data;  //
                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);


    return (
        <>
        <Navigation/>
        <Container className='mt-3'>
            <Row>
                <Col sm={12} md={6}>
                    <img 
                        src={product.image_path}  // Use image_path from the API
                        alt={product.product_name}  // Use product_name for alt text
                        style={{ width: '100%', height: 'auto' }} 
                    />
                </Col>
                <Col sm={12} md={6}>
                    <Row>
                        <h2>{product.product_name}</h2>  {/* Use product_name */}
                        <p>{product.description || 'No description available'}</p> {/* Add a description fallback */}
                        <p><strong>Price: ${product.product_price}</strong></p>  {/* Use product_price */}
                        <p><strong>Quantity Available: {product.ticket_quantity}</strong></p>  {/* Use ticket_quantity */}
                    </Row>
                    <Row>

                    </Row>
                    
                    <Row>
                       <BuyButton productId={product.id} /> {/* Pass product ID to BuyButton */}
                    </Row>
                </Col>
            </Row>
            <Row>
                <h3>HOW TO PLAY?</h3>
                <ul>
                    <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                    <li>Ticket sales close once all are sold or the purchase period ends.</li>
                    <li>Winners are chosen randomly after the ticket purchase period closes.</li>
                    <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
                    <li>Fair play is mandatory; any manipulation results in disqualification.</li>
                    <li>Keep tickets safe and check winning numbers once results are announced.</li>
                </ul>
            </Row>
        </Container>
        </>
    );
}

export default ProductPage;


