// import React, { useEffect, useState } from 'react';
// import { Card, ProgressBar, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';  
// import products from '../products';
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
//                 console.log("Fetching products...");
//                 const response = await axios.get('http://localhost:450/getproducts');
//                 console.log(response.data,"<+====================="); 
//                 setProductsList(response.data.data);
//                 console.log(productsList,"=========usestate============");
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         loadProducts();
//     }, []);
//       console.log(productsList,"=========usestate============");
//     const buyButton = (id) => {
//         navigate(`/product/${id}`);



//     };
//     return (
//         <>
//         <NavigationBar/>
//         <Container className='mt-3'>
//             <div className='d-flex justify-content-center'>
//                 <h1>PICK & WIN</h1>

//             </div>
//             <Row>
//                 {products.map((product) => {
//                     const quantity = product.quantity || 400;
//                     const totalQuantity = product.totalQuantity || 1000;
//                     const progressPercentage = (quantity / totalQuantity) * 100;

//                     return (
//                         <Col key={product.id} sm={12} md={4} lg={3} className="mb-4">
//                             <Card className="card">
//                                 <Card.Img
//                                     variant="top"
//                                     src={product.image_url}
//                                     alt="Product Image"
//                                     className="card-img"
//                                     style={{ height: "250px" }} />
//                                 <Card.Body className="card-body">
//                                     <Card.Title className="card-title">{product.title}</Card.Title>
//                                     <Card.Text className="card-text">
//                                         <strong>Price: ${product.price}</strong>
//                                     </Card.Text>
//                                     <Card.Text className="card-text">
//                                         <strong>Ticket Cost: ${product.ticketCost || 10}</strong>
//                                     </Card.Text>
//                                     <Card.Text className="card-text">
//                                         <strong>Quantity: {quantity}/{totalQuantity}</strong>
//                                     </Card.Text>
//                                     <ProgressBar
//                                         now={progressPercentage}
//                                         label={`${progressPercentage.toFixed(0)}%`}
//                                         variant={progressPercentage >= 100 ? 'success' : 'primary'}/>
//                                     <br />
//                                     <Card.Text className="card-text d-flex justify-content-center">
//                                         <Button variant="outline-primary" onClick={() => buyButton(product.id)}>Buy</Button>
//                                     </Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     );
//                 })}
//             </Row>
//             <h3>HOW TO PLAY?</h3>
//                 <ul>
//                     <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
//                     <li>Ticket sales close once all are sold or the purchase period ends.</li>
//                     <li>Winners are chosen randomly after the ticket purchase period closes.</li>
//                     <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
//                     <li>Fair play is mandatory; any manipulation results in disqualification.</li>
//                     <li>Keep tickets safe and check winning numbers once results are announced.</li>
//                 </ul>
//         </Container>
//         </>
//     );
// }

// export default Home;



import React, { useEffect, useState } from 'react';
import { Card, ProgressBar, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';

function Home() {
    const [productsList, setProductsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                console.log("Fetching products...");
                const response = await axios.get('http://localhost:450/getproducts');
                console.log(response.data, "<+=====================");
                setProductsList(response.data.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, []);
    console.log(productsList, "=========usestate============");

    const buyButton = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <NavigationBar />
            <Container className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h1>PICK & WIN</h1>
                </div>
                <Row>
                    {productsList.map((product) => {
                        const quantity = product.sold_tickets || 0;
                        const totalQuantity = product.ticket_quantity || 1;
                        const progressPercentage = Math.min((quantity / totalQuantity) * 100, 100); // Ensures percentage doesn't exceed 100

                        return (
                            <Col key={product.id} sm={12} md={4} lg={3} className="mb-4">
                                <Card className="card">
                                    <Card.Img
                                        variant="top"
                                        src={product.image_path}
                                        alt="Product Image"
                                        className="card-img"
                                        style={{ height: "250px" }}
                                    />
                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title">{product.product_name}</Card.Title>
                                        <Card.Text className="card-text">
                                            <strong>Price: ${product.product_price}</strong>
                                        </Card.Text>
                                        <Card.Text className="card-text">
                                            <strong>Ticket Cost: ${product.ticket_price}</strong>
                                        </Card.Text>
                                        <Card.Text className="card-text">
                                            <strong>Quantity: {quantity}/{totalQuantity}</strong>
                                        </Card.Text>
                                        <ProgressBar
                                            now={progressPercentage}
                                            label={`${progressPercentage.toFixed(0)}%`}
                                            variant={progressPercentage >= 100 ? "success" : "primary"}
                                        />
                                        <br />
                                        <Card.Text className="card-text d-flex justify-content-center">
                                            <Button variant="outline-primary" onClick={() => buyButton(product.id)}>
                                                Buy
                                            </Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                <h3>HOW TO PLAY?</h3>
                <ul>
                    <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                    <li>Ticket sales close once all are sold or the purchase period ends.</li>
                    <li>Winners are chosen randomly after the ticket purchase period closes.</li>
                    <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
                    <li>Fair play is mandatory; any manipulation results in disqualification.</li>
                    <li>Keep tickets safe and check winning numbers once results are announced.</li>
                </ul>
            </Container>
        </>
    );
}

export default Home;
