import React, { useState } from 'react'
import { useEntity } from '../hooks/useEntity'
import { useToasts } from '../hooks/useToasts'
import styles from '../styles/Admin.module.css'

export default function ProductDetail({ id, onClose }) {
  const { data: product, loading, error, update } = useEntity('products', id)
  const { push: toast } = useToasts()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)

  if (loading) return <div>Loading...</div>
  if (error) return <div className={styles.error}>{error.message}</div>
  if (!product) return <div>Product not found</div>

  const validate = (values) => {
    const errors = {}
    if (!values.name?.trim()) errors.name = 'Name required'
    if (!values.price || values.price < 0) errors.price = 'Valid price required'
    if (!values.stock || values.stock < 0) errors.stock = 'Valid stock required'
    return errors
  }

  const handleSave = async (ev) => {
    ev.preventDefault()
    const errors = validate(form)
    if (Object.keys(errors).length > 0) {
      toast({ title: 'Error', message: 'Please check the form' })
      return
    }
    try {
      await update(id, form)
      setEditing(false)
      toast({ title: 'Success', message: 'Product updated' })
    } catch (err) {
      toast({ title: 'Error', message: err.message })
    }
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className={styles.form}>
        <h2>Edit Product</h2>
        <label>
          Name
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </label>
        <label>
          Price
          <input type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
        </label>
        <label>
          Stock
          <input type="number" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} />
        </label>
        <div className={styles.actions}>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    )
  }

  return (
    <div className={styles.detail}>
      <h2>{product.name}</h2>
      <div className={styles.info}>
        <div>Price: ${product.price}</div>
        <div>Stock: {product.stock}</div>
        <div>Status: {product.status}</div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => { setForm(product); setEditing(true) }}>Edit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
