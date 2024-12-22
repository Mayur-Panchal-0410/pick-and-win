import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ children }) {
    return (
        <div style={{ display: "flex", height: "100vmax" }}>
            {/* Sidebar Navigation */}
            <div
                style={{
                    width: "250px",
                    backgroundColor: "#343a40",
                    color: "#fff",
                    padding: "20px",
                }}
            >
                <h4>Admin Dashboard</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>
                        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/addproduct" style={{ color: "white", textDecoration: "none" }}>
                            Add Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/editproduct" style={{ color: "white", textDecoration: "none" }}>
                            Edit Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" style={{ color: "white", textDecoration: "none" }}>
                            Users
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Page Content */}
            <div style={{ flex: 1, padding: "20px" }}>{children}</div>
        </div>
    );
}

export default Sidebar;
