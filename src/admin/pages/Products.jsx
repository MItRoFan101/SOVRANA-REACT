import { useState } from 'react'
import { useEntities } from '../hooks/useEntities'
import AddProductModal from './AddProductModal'
import EntityForm from './EntityForm'
import ConfirmDialog from './ConfirmDialog'
import styles from '../Admin.module.css'

export default function Products() {
  const { data: products, createEntity, updateEntity, deleteEntity } = useEntities()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)

  return (
    <div className={styles.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Products Management</h2>
        <button 
          className={styles.btn} 
          onClick={() => setShowAddModal(true)}
          style={{ background: '#2563eb', color: 'white' }}
        >
          Add New Product
        </button>
      </div>

      <div className={styles.widget}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`${styles.badge} ${styles[product.status] || styles.active}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <button 
                    className={styles.small}
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.small} 
                    onClick={() => setProductToDelete(product)}
                    style={{ marginLeft: '8px', background: '#dc2626', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No products found. Click "Add New Product" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)}
          onSave={(productData) => {
            createEntity(productData)
            setShowAddModal(false)
          }}
        />
      )}

      {editingProduct && (
        <EntityForm
          initial={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updatedData) => {
            updateEntity(editingProduct.id, updatedData)
            setEditingProduct(null)
          }}
        />
      )}

      {productToDelete && (
        <ConfirmDialog
          title="Delete Product?"
          text={`Delete "${productToDelete.name}" permanently?`}
          onConfirm={() => {
            deleteEntity(productToDelete.id)
            setProductToDelete(null)
          }}
          onClose={() => setProductToDelete(null)}
        />
      )}
    </div>
  )
}