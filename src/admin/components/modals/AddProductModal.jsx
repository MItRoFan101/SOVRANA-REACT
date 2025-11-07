import React, { useState } from 'react'
import styles from '../../Admin.module.css'

export default function AddProductModal({ onClose }) {
  const [form, setForm] = useState({ name: '', price: '', stock: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock save
    console.log('Saving product:', form)
    onClose()
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
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
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
