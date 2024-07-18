import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import './OrderScreen.css'; // Import the CSS file

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(7);

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersRef = firebase.firestore().collection('orders');
            const snapshot = await ordersRef.get();
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
        };

        fetchOrders();
    }, []);

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="orders-container">
            <h1 className="orders-heading">Orders</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.address}</td>
                            <td>{order.mobileNumber}</td>
                            <td>{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * ordersPerPage >= orders.length}>Next</button>
            </div>
        </div>
    );
};

export default Orders;
