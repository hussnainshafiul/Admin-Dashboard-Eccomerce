import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, TextField, Card, CardContent, Modal, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Edit, Delete } from '@mui/icons-material';
import './CustomerScreen.css';


const customers = [
    { id: 1, name: 'John Doe', address: '123 Main St', location: 'New York', email: 'john@example.com' },
    { id: 2, name: 'Alice Smith', address: '456 Elm St', location: 'Los Angeles', email: 'alice@example.com' },
    { id: 3, name: 'Bob Brown', address: '789 Oak St', location: 'Chicago', email: 'bob@example.com' },
    { id: 4, name: 'Emma Johnson', address: '101 Pine St', location: 'San Francisco', email: 'emma@example.com' },
    { id: 5, name: 'Michael Williams', address: '555 Cedar St', location: 'Seattle', email: 'michael@example.com' },
    { id: 6, name: 'Olivia Jones', address: '902 Maple St', location: 'New York', email: 'olivia@example.com' },
    { id: 7, name: 'James Taylor', address: '303 Oak St', location: 'Los Angeles', email: 'james@example.com' },
    { id: 8, name: 'Sophi staa Brown', address: '404 Elm St', location: 'Chicago', email: 'sophia@example.com' },
    { id: 9, name: 'Alexander Martinez', address: '707 Willow St', location: 'San Francisco', email: 'alexander@example.com' },
    { id: 10, name: 'Isabella Davis', address: '808 Birch St', location: 'Seattle', email: 'isabella@example.com' },
    { id: 11, name: 'William Wilson', address: '909 Cherry St', location: 'New York', email: 'william@example.com' },
    { id: 12, name: 'Mia Rodriguez', address: '212 Spruce St', location: 'Los Angeles', email: 'mia@example.com' },
    { id: 13, name: 'James Garcia', address: '515 Pine St', location: 'Chicago', email: 'james@example.com' },
    { id: 14, name: 'Emily Smith', address: '313 Oak St', location: 'San Francisco', email: 'emily@example.com' },
    { id: 15, name: 'Alexander Johnson', address: '717 Cedar St', location: 'Seattle', email: 'alexander@example.com' },
    { id: 16, name: 'Charlotte Brown', address: '919 Elm St', location: 'New York', email: 'charlotte@example.com' },
    { id: 17, name: 'Daniel Martinez', address: '626 Willow St', location: 'Los Angeles', email: 'daniel@example.com' },
    { id: 18, name: 'Amelia Wilson', address: '828 Birch St', location: 'Chicago', email: 'amelia@example.com' },
    { id: 19, name: 'Henry Taylor', address: '333 Cherry St', location: 'San Francisco', email: 'henry@example.com' },
    { id: 20, name: 'Sofia Rodriguez', address: '444 Spruce St', location: 'Seattle', email: 'sofia@example.com' },
];

const customersPerPage = 10;

function CustomerScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filteredCustomers = currentCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-4">
      <h2 className="header-style">Customers</h2>
      <div className="card-container">
        <Card className="card">
          <CardContent className="card-content">
            <h3 className="card-heading">Total Customers</h3>
            <div className="card-details">
              <CircularProgress variant="determinate" value={100} size={100} thickness={5} />
              <p className="card-value">{customers.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="card-content">
            <h3 className="card-heading">Customers by Location</h3>
            {/* Displaying the first 3 customers by location */}
            {filteredCustomers.slice(0, 3).map(customer => (
              <p key={customer.id}>{customer.location}: 1</p>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <Search className="search-icon" />
          <TextField
            className="search-input"
            variant="standard"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold">Customer ID</TableCell>
              <TableCell className="fw-bold">Name</TableCell>
              <TableCell className="fw-bold">Address</TableCell>
              <TableCell className="fw-bold">Location</TableCell>
              <TableCell className="fw-bold">Email</TableCell>
              <TableCell className="fw-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Edit className="action-icon" onClick={() => handleEditClick(customer)} />
                  <Delete className="action-icon red" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Button variant="contained" color="primary" disabled={currentPage === 1} onClick={prevPage}>
          Previous
        </Button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <Button variant="contained" color="primary" disabled={currentPage === totalPages} onClick={nextPage}>
          Next
        </Button>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
  <div className="modal-container">
    <div className="modal-header">
      <h2 className="modal-title">  Edit Customer Information  </h2>
      <span className="modal-close" onClick={handleCloseModal}>&times;</span>
    </div>
    <div className="modal-content">
      {selectedCustomer && (
        <form>
          <div className="modal-field">
            <label className="modal-label">Name</label>
            <TextField className="modal-input" defaultValue={selectedCustomer.name} fullWidth />
          </div>
          <div className="modal-field">
            <label className="modal-label">Address</label>
            <TextField className="modal-input" defaultValue={selectedCustomer.address} fullWidth />
          </div>
          <div className="modal-field">
            <label className="modal-label">Location</label>
            <TextField className="modal-input" defaultValue={selectedCustomer.location} fullWidth />
          </div>
          <div className="modal-field">
            <label className="modal-label">Email</label>
            <TextField className="modal-input" defaultValue={selectedCustomer.email} fullWidth />
          </div>
          <Button className="modal-button" variant="contained" color="primary" type="submit">Save</Button>
        </form>
      )}
    </div>
  </div>
</Modal>


    </div>
  );
}

export default CustomerScreen;