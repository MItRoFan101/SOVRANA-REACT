import React, { useState } from 'react'
import styles from '../Admin.module.css'

export default function AddProductModal({ onClose, onSave }) {
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    stock: '',
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидация
    if (!form.name.trim() || !form.price || !form.stock) {
      alert('Please fill all required fields')
      return
    }

    // Преобразование данных
    const productData = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      status: form.status,
      description: form.description || ''
    }

    onSave(productData)
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Product Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Price *</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Stock *</label>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              placeholder="0"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select 
              value={form.status} 
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Product description (optional)"
              rows="3"
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}