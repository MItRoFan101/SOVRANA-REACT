import React, { useState } from 'react'
import styles from '../Admin.module.css'

export default function ConfirmDialog({ 
  title = 'Confirm', 
  text = '', 
  onConfirm, 
  onClose 
}) {
  const [busy, setBusy] = useState(false)

  const handleConfirm = async () => {
    setBusy(true)
    try {
      await onConfirm()
    } finally {
      setBusy(false)
      onClose()
    }
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose} disabled={busy}>Cancel</button>
          <button 
            onClick={handleConfirm} 
            disabled={busy}
            style={{ background: '#dc2626', color: 'white' }}
          >
            {busy ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}