import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import AddProductModal from './AddProductModal'; // Import the modal component
import './ProductScreen.css';

const initialProducts = [
  { id: '#12345', title: 'Product A', gender: 'Male', category: 'Category 1', price: '$19.99', image: 'product_a.jpg', description: 'Description for Product A' },
  { id: '#12346', title: 'Product B', gender: 'Female', category: 'Category 2', price: '$29.99', image: 'product_b.jpg', description: 'Description for Product B' },
  { id: '#12347', title: 'Product C', gender: 'Unisex', category: 'Category 1', price: '$24.99', image: 'product_c.jpg', description: 'Description for Product C' },
  { id: '#12348', title: 'Product D', gender: 'Male', category: 'Category 3', price: '$39.99', image: 'product_d.jpg', description: 'Description for Product D' },
  { id: '#12349', title: 'Product E', gender: 'Female', category: 'Category 2', price: '$14.99', image: 'product_e.jpg', description: 'Description for Product E' },
  { id: '#12350', title: 'Product F', gender: 'Unisex', category: 'Category 3', price: '$34.99', image: 'product_f.jpg', description: 'Description for Product F' },
];

const productsPerPage = 5;

function ProductScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = products.filter(product =>
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProduct = (formData) => {
    // Add the new product to the state
    setProducts([...products, formData]);
    handleCloseModal(); // Close the modal after submission
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="header-style">Products</h2>
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
        <Button variant="contained" color="primary" className="ml-2" onClick={handleOpenModal}>
          Add Product
        </Button>
      </div>
      <AddProductModal open={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitProduct} />
      <TableContainer component={Paper} className="rounded p-3 shadow table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table className="table table-striped table-hover">
          <TableHead className="bg-primary text-white">
            <TableRow>
              <TableCell className="fw-bold">Product ID</TableCell>
              <TableCell className="fw-bold">Title</TableCell>
              <TableCell className="fw-bold">Gender</TableCell>
              <TableCell className="fw-bold">Category</TableCell>
              <TableCell className="fw-bold">Price</TableCell>
              <TableCell className="fw-bold">Image</TableCell>
              <TableCell className="fw-bold">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.gender}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell><img src={product.image} alt={product.title} style={{ width: '50px', height: '50px' }} /></TableCell>
                <TableCell>{product.description}</TableCell>
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

export default ProductScreen;