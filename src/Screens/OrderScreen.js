import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent, TextField, Menu, MenuItem, CircularProgress } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import './OrderScreen.css';

const orders = [
  { id: '#66467', customer: 'Arlene McCoy', status: 'Ready for ship', quantity: 5, location: 'Kasarani', date: '12 Feb 2024', total: '$569.99' },
  { id: '#66468', customer: 'Jacob Smith', status: 'Shipped', quantity: 12, location: 'Kenarsanden', date: '13 Feb 2024', total: '$719.99' },
  { id: '#66469', customer: 'John Doe', status: 'Delivered', quantity: 8, location: 'Nairobi', date: '14 Feb 2024', total: '$499.99' },
  { id: '#66470', customer: 'Jane Doe', status: 'Processing', quantity: 3, location: 'Mombasa', date: '15 Feb 2024', total: '$199.99' },
  { id: '#66471', customer: 'Alice Smith', status: 'Ready for ship', quantity: 6, location: 'Kisumu', date: '16 Feb 2024', total: '$799.99' },
  { id: '#66472', customer: 'Bob Brown', status: 'Shipped', quantity: 9, location: 'Nakuru', date: '17 Feb 2024', total: '$349.99' },
  { id: '#66473', customer: 'Emily Johnson', status: 'Delivered', quantity: 2, location: 'Eldoret', date: '18 Feb 2024', total: '$999.99' },
  { id: '#66474', customer: 'Michael Clark', status: 'Processing', quantity: 7, location: 'Kakamega', date: '19 Feb 2024', total: '$649.99' },
  { id: '#66475', customer: 'David Taylor', status: 'Ready for ship', quantity: 4, location: 'Kisii', date: '20 Feb 2024', total: '$299.99' },
  { id: '#66476', customer: 'Sophia Martinez', status: 'Shipped', quantity: 10, location: 'Thika', date: '21 Feb 2024', total: '$449.99' },
];

const ordersPerPage = 5;

function OrderScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState('');

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const displayedOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(order => filteredStatus ? order.status === filteredStatus : true).slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusFilter = (status) => {
    setFilteredStatus(status === 'All' ? '' : status);
    setFilterAnchorEl(null);
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="header-style">Orders</h2>
      <div className="card-container">
        <Card className="card" style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent className="card-content">
            <h3 style={{ color: '#FFC947' }}>Total Orders</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={100} size={50} thickness={5} style={{ color: '#FFC947' }} />
              <p style={{ marginLeft: '10px', fontSize: '20px' }}>{orders.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card" style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent className="card-content">
            <h3 style={{ color: '#49BEAA' }}>Delivered Orders</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={(orders.filter(order => order.status === 'Delivered').length / orders.length) * 100} size={50} thickness={5} style={{ color: '#49BEAA' }} />
              <p style={{ marginLeft: '10px', fontSize: '20px' }}>{orders.filter(order => order.status === 'Delivered').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card" style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent className="card-content">
            <h3 style={{ color: '#F66D6A' }}>Pending Orders</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={(orders.filter(order => order.status !== 'Delivered').length / orders.length) * 100} size={50} thickness={5} style={{ color: '#F66D6A' }} />
              <p style={{ marginLeft: '10px', fontSize: '20px' }}>{orders.filter(order => order.status !== 'Delivered').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <Search style={{ color: '#1F456E' }} />
          <TextField
            className="search-input"
            variant="standard"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Button className="filter-button" onClick={handleFilterClick} startIcon={<FilterList />} variant="contained" style={{ backgroundColor: "primary" }}>Filter by Status</Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleStatusFilter('All')}>All</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Ready for ship')}>Ready for ship</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Shipped')}>Shipped</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Delivered')}>Delivered</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Processing')}>Processing</MenuItem>
          </Menu>
        </div>
      </div>
      <TableContainer component={Paper} className="rounded p-3 shadow table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table className="table table-striped table-hover">
          <TableHead className="bg-primary text-white">
            <TableRow>
              <TableCell className="fw-bold">Order ID</TableCell>
              <TableCell className="fw-bold">Customer</TableCell>
              <TableCell className="fw-bold">Status</TableCell>
              <TableCell className="fw-bold">Quantity</TableCell>
              <TableCell className="fw-bold">Location</TableCell>
              <TableCell className="fw-bold">Date (D/M/Y)</TableCell>
              <TableCell className="fw-bold">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.location}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="contained" color="primary" disabled={currentPage === 1} onClick={prevPage}>
          Previous
        </Button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <Button variant="contained" color="primary" disabled={currentPage === totalPages} onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default OrderScreen;