import React from 'react'
import styles from '../../styles/Admin.module.css'

export default function Header() {
	return (
		<header className={styles.headerBar}>
			<div className={styles.brand}>Admin</div>
			<div className={styles.headerActions}>
				<button onClick={() => { const v = localStorage.getItem('isAdmin') === '1'; localStorage.setItem('isAdmin', v ? '0' : '1'); window.location.reload() }}>
					Toggle Admin (demo)
				</button>
			</div>
		</header>
	)
}
