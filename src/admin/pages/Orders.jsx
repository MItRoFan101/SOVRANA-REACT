import React from 'react'
import styles from '../Admin.module.css'

const mockOrders = [
  { id: 1, customer: 'John Doe', total: 299.99, status: 'pending' },
  { id: 2, customer: 'Jane Smith', total: 199.99, status: 'completed' },
  { id: 3, customer: 'Bob Wilson', total: 399.99, status: 'processing' },
]

export default function Orders() {
  return (
    <div className={styles.widget}>
      <h2>Orders</h2>
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
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>
                <button className={styles.small}>View</button>
                <button className={styles.small} style={{marginLeft: 8}}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
