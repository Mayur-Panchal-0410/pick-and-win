import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Editproducts() {
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true); // State to handle loading

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:450/getproducts');
                setProducts(response.data.data); // Store products in state
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchProducts();
    }, []); 

    const deleteProduct = async (id) => {
        try {
            await axios.post(`http://localhost:450/deleteproducts/${id}`);
            setProducts(products.filter(product => product.id !== id)); // Remove deleted product from state
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading while fetching products
    }

    return (
        <div>
            <h1>Manage Your Products</h1>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={product.image_path} className="card-img-top" alt={product.product_name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className="card-text">{product.description}</p>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Editproducts;
