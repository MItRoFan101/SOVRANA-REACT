import React, { useState, useEffect } from 'react'
import styles from '../Admin.module.css'

export default function EntityForm({ initial = {}, onClose, onSave }) {
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    status: 'active',
    price: '',
    stock: '',
    ...initial 
  })

  useEffect(() => {
    setForm(prev => ({ ...prev, ...initial }))
  }, [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!form.name.trim()) {
      alert('Product name is required')
      return
    }

    const productData = {
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
      price: form.price ? parseFloat(form.price) : 0,
      stock: form.stock ? parseInt(form.stock) : 0
    }

    onSave(productData)
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>{initial.id ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Product Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows="3"
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

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">{initial.id ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}