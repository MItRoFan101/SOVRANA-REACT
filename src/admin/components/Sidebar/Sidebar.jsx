import React from 'react'
import styles from '../../styles/Admin.module.css'

export default function Sidebar({ section, onNavigate }) {
	return (
		<aside className={styles.sidebar}>
			<nav>
				<button className={section === 'dashboard' ? styles.active : ''} onClick={() => onNavigate('dashboard')}>Dashboard</button>
				<button className={section === 'users' ? styles.active : ''} onClick={() => onNavigate('users')}>Users</button>
				<button className={section === 'analytics' ? styles.active : ''} onClick={() => onNavigate('analytics')}>Analytics</button>
				<button className={section === 'settings' ? styles.active : ''} onClick={() => onNavigate('settings')}>Settings</button>
			</nav>
		</aside>
	)
}
