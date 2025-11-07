import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import DashboardHome from './pages/DashboardHome'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Settings from './pages/Settings'
import styles from './Admin.module.css'


export default function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)

  const handleExport = () => {
    exportToCSV('admin-data.csv', mockData)
    alert('Data exported!')
  }

  return (
    <div className={styles.adminRoot}>
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav>
            <button 
              className={location.pathname === '/admin' ? styles.active : ''} 
              onClick={() => navigate('/admin')}
            >Dashboard</button>
            <button 
              className={location.pathname.includes('/products') ? styles.active : ''} 
              onClick={() => navigate('/admin/products')}
            >Products</button>
            <button 
              className={location.pathname.includes('/orders') ? styles.active : ''} 
              onClick={() => navigate('/admin/orders')}
            >Orders</button>
            <button 
              className={location.pathname.includes('/users') ? styles.active : ''} 
              onClick={() => navigate('/admin/users')}
            >Users</button>
            <button 
              className={location.pathname.includes('/settings') ? styles.active : ''} 
              onClick={() => navigate('/admin/settings')}
            >Settings</button>
          </nav>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/orders/*" element={<Orders />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>

          {/* Quick actions */}
          <div className={styles.quick}>
            <button onClick={() => setShowAddProduct(true)}>Add Product</button>
            <button onClick={() => setShowNewOrder(true)}>New Order</button>
            <button onClick={handleExport}>Export Data</button>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showAddProduct && (
        <AddProductModal onClose={() => setShowAddProduct(false)} />
      )}
      {showNewOrder && (
        <NewOrderForm onClose={() => setShowNewOrder(false)} />
      )}
    </div>
  )
}
