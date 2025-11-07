import React from 'react'
import styles from '../Admin.module.css'

export default function Pagination({ page, totalPages, onPage }) {
	if (totalPages <= 1) return null
	return (
		<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
			<button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}>Prev</button>
			<span className={styles.small}>Page {page} / {totalPages}</span>
			<button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
		</div>
	)
}
