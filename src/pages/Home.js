// import React, { useEffect, useState } from 'react';
// import { ProgressBar, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import './Home.css';
// import NavigationBar from '../components/NavigationBar';
// import axios from 'axios';

// function Home() {
//     const [productsList, setProductsList] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const loadProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:450/getproducts');
//                 setProductsList(response.data.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         loadProducts();
//     }, []);

//     const buyButton = (id) => {
//         navigate(`/product/${id}`);
//     };

//     return (
//         <>
//             <NavigationBar />
//             <Container className="mt-3">
//                 <div className="text-center">
//                     <h1 className="main-title">PICK & WIN</h1>
//                 </div>
//                 <Row>
//                     {productsList.map((product) => {
//                         const quantity = product.sold_tickets || 0;
//                         const totalQuantity = product.ticket_quantity || 1;
//                         const progressPercentage = Math.min((quantity / totalQuantity) * 100, 100);

//                         return (
//                             <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
//                                 <div className="product-card">
//                                     <img
//                                         src={product.image_path}
//                                         alt={product.product_name}
//                                         className="product-image"
//                                     />
//                                     <div className="product-details">
//                                         <h5 className="product-title">{product.product_name}</h5>
//                                         <p className="product-info">
//                                             <strong>Price:</strong> ${product.product_price}
//                                         </p>
//                                         <p className="product-info">
//                                             <strong>Ticket Cost:</strong> ${product.ticket_price}
//                                         </p>
//                                         <p className="product-info">
//                                             <strong>Quantity:</strong> {quantity}/{totalQuantity}
//                                         </p>
//                                         <ProgressBar
//                                             now={progressPercentage}
//                                             label={`${progressPercentage.toFixed(0)}%`}
//                                             variant={progressPercentage >= 100 ? "success" : "info"}
//                                         />
//                                         <Button
//                                             variant="primary"
//                                             className="btn-buy"
//                                             onClick={() => buyButton(product.id)}
//                                         >
//                                             Buy
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </Col>
//                         );
//                     })}
//                 </Row>

//                 <div className="how-to-play mt-5">
//                     <h3 className="section-title">HOW TO PLAY?</h3>
//                     <ul className="instructions-list">
//                         <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
//                         <li>Ticket sales close once all are sold or the purchase period ends.</li>
//                         <li>Winners are chosen randomly after the ticket purchase period closes.</li>
//                         <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
//                         <li>Fair play is mandatory; any manipulation results in disqualification.</li>
//                         <li>Keep tickets safe and check winning numbers once results are announced.</li>
//                     </ul>
//                 </div>
//             </Container>
//         </>
//     );
// }

// export default Home;
import React, { useEffect, useState } from 'react';
import { ProgressBar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import Footer from '../components/Footer';

function Home() {
    const [productsList, setProductsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axios.get('http://localhost:450/getproducts');
                setProductsList(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, []);

    const buyButton = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <NavigationBar />
            <Container className="mt-3">
                <h1 className="main-title">PICK & WIN</h1>
                <div className="product-grid">
                    {productsList.map((product) => {
                        const quantity = product.sold_tickets || 0;
                        const totalQuantity = product.ticket_quantity || 1;
                        const progressPercentage = Math.min((quantity / totalQuantity) * 100, 100);

                        return (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image_path}
                                    alt={product.product_name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h5 className="product-title">{product.product_name}</h5>
                                    <p className="product-info">
                                        <strong>Price:</strong> ${product.product_price}
                                    </p>
                                    <p className="product-info">
                                        <strong>Ticket Cost:</strong> ${product.ticket_price}
                                    </p>
                                    <p className="product-info">
                                        <strong>Quantity:</strong> {quantity}/{totalQuantity}
                                    </p>
                                    <ProgressBar
                                        now={progressPercentage}
                                        label={`${progressPercentage.toFixed(0)}%`}
                                        variant={progressPercentage >= 100 ? "success" : "info"}
                                    />
                                    <Button
                                        variant="outline-light"
                                        className="btn-buy"
                                        onClick={() => buyButton(product.id)}
                                    >
                                        Buy
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="how-to-play mt-5">
                    <h3 className="section-title">HOW TO PLAY?</h3>
                    <ul className="instructions-list">
                        <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                        <li>Ticket sales close once all are sold or the purchase period ends.</li>
                        <li>Winners are chosen randomly after the ticket purchase period closes.</li>
                        <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
                        <li>Fair play is mandatory; any manipulation results in disqualification.</li>
                        <li>Keep tickets safe and check winning numbers once results are announced.</li>
                    </ul>
                </div>
            </Container>
            <Footer/>
        </>
    );
}

export default Home;
