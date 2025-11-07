import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../Admin.module.css'

const mockStats = {
  users: 1234,
  orders: 89,
  revenue: 12500,
  products: 156
}

const mockOrders = [
  { id: 1, customer: 'John Doe', total: 230, status: 'pending' },
  { id: 2, customer: 'Jane Smith', total: 450, status: 'completed' },
  { id: 3, customer: 'Bob Wilson', total: 180, status: 'processing' },
]

export default function DashboardHome() {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.widget}>
          <h3>Users</h3>
          <div className={styles.metrics}>{mockStats.users}</div>
        </div>
        <div className={styles.widget}>
          <h3>Orders</h3>
          <div className={styles.metrics}>{mockStats.orders}</div>
        </div>
        <div className={styles.widget}>
          <h3>Revenue</h3>
          <div className={styles.metrics}>${mockStats.revenue}</div>
        </div>
        <div className={styles.widget}>
          <h3>Products</h3>
          <div className={styles.metrics}>{mockStats.products}</div>
        </div>
      </div>

      <div className={styles.widget} style={{ marginTop: 20 }}>
        <h3>Recent Orders</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  <a href="#" onClick={() => navigate(`/admin/users/${order.customer}`)}>{order.customer}</a>
                </td>
                <td>${order.total}</td>
                <td>
                  <span className={`${styles.badge} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => navigate(`/admin/orders/${order.id}`)} className={styles.small}>View</button>
                  <button onClick={() => navigate(`/admin/orders/${order.id}/edit`)} className={styles.small} style={{marginLeft: 8}}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
