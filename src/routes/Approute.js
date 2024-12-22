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
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/admin_dashboard/Dashboard";
import Addproducts from "../pages/admin_dashboard/Addproducts";
import Users from "../pages/admin_dashboard/Users";
import Editproducts from "../pages/admin_dashboard/Editproducts";



function AppRoute(props) {
    return (
        <Router {...props}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="product/:id" element={<ProductPage />} />
                <Route exact path="payment" element={<Payment />} />
                <Route exact path="myorders" element={<Myorders />} />
                

                <Route
                    path="/admin/*"
                    element={
                        <Sidebar>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="addproduct" element={<Addproducts />} />
                                <Route path="editproduct" element={<Editproducts />} />
                                <Route path="users" element={<Users />} />
                            </Routes>
                        </Sidebar>
                    }
                />

            </Routes>
        </Router>
    );
}
export default AppRoute;