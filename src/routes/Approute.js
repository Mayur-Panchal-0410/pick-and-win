import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import Payment from "../pages/Payment";
import Myorders from "../pages/Myorders";


function AppRoute(props) {
    return (
        <Router {...props}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="product/:id" element={<ProductPage />} />
                <Route exact path="payment" element={<Payment />} />
                <Route exact path="myorders" element={<Myorders />} />

                


            </Routes>
        </Router>
    );
}
export default AppRoute;