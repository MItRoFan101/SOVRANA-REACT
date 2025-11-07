import React from 'react'
import styles from '../Admin.module.css'

export default function AdminNav({ section, onChange }) {
	return (
		<nav style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
			<button className={styles.small} onClick={() => onChange('dashboard')} aria-pressed={section==='dashboard'}>Dashboard</button>
			<button className={styles.small} onClick={() => onChange('entities')} aria-pressed={section==='entities'}>Entities</button>
			<button className={styles.small} onClick={() => onChange('settings')} aria-pressed={section==='settings'} style={{opacity:0.7}} disabled>Settings</button>
		</nav>
	)
}
