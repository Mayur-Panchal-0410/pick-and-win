// import React, { useEffect, useState } from 'react';
// import NavScrollExample from '../components/NavigationBar';
// import { Container, Table, Button } from 'react-bootstrap';
// import axios from 'axios';
// import AuthForm from '../components/AuthForm';
// import LoginModal from '../components/Login';
// import Footer from '../components/Footer';

// function MyOrders() {
//     const [orderlist, setOrderlist] = useState([]); 
//     const [totalTickets, setTotalTickets] = useState(0); 
//     const [currentPage, setCurrentPage] = useState(1); 
//     const [totalPages, setTotalPages] = useState(1); 
//     const [pageSize, setPageSize] = useState(2); 
//     const [isLoggedIn, setIsLoggedIn] = useState(false); 

//     useEffect(() => {
//         const token = localStorage.getItem('token'); 
//         if (token) {
//             setIsLoggedIn(true);

//         } else {
//             setIsLoggedIn(false);
//         }
        

//         if (token) {
//             const fetchOrders = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:450/myorder`, {
//                         headers: {
//                             'authorization': token,
//                         },
//                         params: {
//                             page_no: currentPage,
//                             page_size: pageSize,
//                         },
//                     });

//                     const { orders, totalTickets } = response.data;
//                     setOrderlist(orders);
//                     setTotalTickets(totalTickets);
//                     setTotalPages(Math.ceil(totalTickets / pageSize));
//                 } catch (error) {
//                     console.error('Error fetching orders:', error);
//                 }
//             };

//             fetchOrders();
//         }
//     }, [currentPage, pageSize]); 

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     const handlePageSizeChange = (e) => {
//         setPageSize(Number(e.target.value)); // Update pageSize
//         setCurrentPage(1); 
//     };

//     const renderPaginationButtons = () => {
//         const buttons = [];
//         const maxVisibleButtons = 2;

//         buttons.push(
//             <Button
//                 key={1}
//                 onClick={() => handlePageChange(1)}
//                 disabled={currentPage === 1}
//                 variant={currentPage === 1 ? 'primary' : 'outline-primary'}
//             >
//                 1
//             </Button>
//         );

//         if (totalPages > 1) {
//             if (currentPage > maxVisibleButtons) {
//                 buttons.push(<span key="start-dots" className="dots">...</span>);
//             }

//             const startPage = Math.max(2, currentPage - Math.floor(maxVisibleButtons / 2));
//             const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisibleButtons / 2));

//             for (let i = startPage; i <= endPage; i++) {
//                 buttons.push(
//                     <Button
//                         key={i}
//                         onClick={() => handlePageChange(i)}
//                         variant={currentPage === i ? 'primary' : 'outline-primary'}
//                     >
//                         {i}
//                     </Button>
//                 );
//             }

//             if (currentPage < totalPages - maxVisibleButtons) {
//                 buttons.push(<span key="end-dots" className="dots">...</span>);
//             }

//             buttons.push(
//                 <Button
//                     key={totalPages}
//                     onClick={() => handlePageChange(totalPages)}
//                     disabled={currentPage === totalPages}
//                     variant={currentPage === totalPages ? 'primary' : 'outline-primary'}
//                 >
//                     {totalPages}
//                 </Button>
//             );
//         }

//         return buttons;
//     };

//     return (
//         <>
//             <NavScrollExample />
//             <Container>
//                 {isLoggedIn ? (
//                     <>
//                         <h1>Your Orders</h1>
//                         <div className="d-flex justify-content-center">
//                             <label htmlFor="rows">No of rows:</label>
//                             <select id="rows" onChange={handlePageSizeChange} value={pageSize}>
//                                 <option value="2">2</option>
//                                 <option value="3">3</option>
//                                 <option value="4">4</option>
//                                 <option value="5">5</option>
//                             </select>
//                         </div>
//                         <br />
//                         <br />

//                         <Table striped bordered hover>
//                             <thead>
//                                 <tr>
//                                     <th>Order ID</th>
//                                     <th>Product Name</th>
//                                     <th>Ticket Price</th>
//                                     <th>Ticket ID</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {orderlist.length > 0 ? (
//                                     orderlist.map((order, index) => (
//                                         <tr key={index}>
//                                             <td>{order.odr_id}</td>
//                                             <td>{order.product_name}</td>
//                                             <td>{order.ticket_price}</td>
//                                             <td>{order.ticket_id}</td>
//                                             <td>{order.created_at}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" className="text-center">No orders found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>

//                         <div className="pagination-controls">
//                             <Button
//                                 disabled={currentPage === 1}
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                             >
//                                 Previous
//                             </Button>
//                             {renderPaginationButtons()}
//                             <Button
//                                 disabled={currentPage === totalPages}
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                             >
//                                 Next
//                             </Button>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="text-center">
//                         <h2>Please log in to view your orders</h2>
//                         <LoginModal />
//                     </div>
//                 )}
//             </Container>
//             <Footer/>
//         </>
//     );
// }

// export default MyOrders;
import React, { useEffect, useState } from 'react';
import NavScrollExample from '../components/NavigationBar';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import LoginModal from '../components/Login';
import Footer from '../components/Footer';
import './Myorders.css'; // Import the new CSS file

function MyOrders() {
    const [orderlist, setOrderlist] = useState([]); 
    const [totalTickets, setTotalTickets] = useState(0); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [pageSize, setPageSize] = useState(2); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        if (token) {
            const fetchOrders = async () => {
                try {
                    const response = await axios.get(`http://localhost:450/myorder`, {
                        headers: { 'authorization': token },
                        params: { page_no: currentPage, page_size: pageSize },
                    });

                    const { orders, totalTickets } = response.data;
                    setOrderlist(orders);
                    setTotalTickets(totalTickets);
                    setTotalPages(Math.ceil(totalTickets / pageSize));
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };

            fetchOrders();
        }
    }, [currentPage, pageSize]); 

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value)); // Update pageSize
        setCurrentPage(1); 
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 2;

        buttons.push(
            <Button key={1} onClick={() => handlePageChange(1)} disabled={currentPage === 1} variant={currentPage === 1 ? 'primary' : 'outline-primary'}>
                1
            </Button>
        );

        if (totalPages > 1) {
            if (currentPage > maxVisibleButtons) {
                buttons.push(<span key="start-dots" className="dots">...</span>);
            }

            const startPage = Math.max(2, currentPage - Math.floor(maxVisibleButtons / 2));
            const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisibleButtons / 2));

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <Button key={i} onClick={() => handlePageChange(i)} variant={currentPage === i ? 'primary' : 'outline-primary'}>
                        {i}
                    </Button>
                );
            }

            if (currentPage < totalPages - maxVisibleButtons) {
                buttons.push(<span key="end-dots" className="dots">...</span>);
            }

            buttons.push(
                <Button key={totalPages} onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} variant={currentPage === totalPages ? 'primary' : 'outline-primary'}>
                    {totalPages}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <>
            <NavScrollExample />
            <Container>
                {isLoggedIn ? (
                    <>
                        <h1>Your Orders</h1>
                        <div className="d-flex justify-content-center">
                            <label htmlFor="rows">No of rows: </label>
                            <select id="rows" onChange={handlePageSizeChange} value={pageSize}>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <br />
                        <br />

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Ticket Price</th>
                                    <th>Ticket ID</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderlist.length > 0 ? (
                                    orderlist.map((order) => (
                                        <tr key={order.odr_id}>
                                            <td>{order.odr_id}</td>
                                            <td>{order.product_name}</td>
                                            <td>{order.ticket_price}</td>
                                            <td>{order.ticket_id}</td>
                                            <td>{order.created_at}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        <div className="pagination-controls">
                            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </Button>
                            {renderPaginationButtons()}
                            <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h2>Please log in to view your orders</h2>
                        <LoginModal />
                    </div>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default MyOrders;
