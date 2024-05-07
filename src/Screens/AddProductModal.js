import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';

function AddProductModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    gender: '',
    category: '',
    price: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2>Add New Product</h2>
        <div>
          <TextField
            label="Product ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          <Button style={{ marginLeft: '10px' }} variant="outlined" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductModal;