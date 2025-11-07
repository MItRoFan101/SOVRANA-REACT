import React from 'react'
import { useSystemStatus } from '../hooks/useSystemStatus'
import styles from '../Admin.module.css'

export default function SystemStatus() {
	const status = useSystemStatus() // { healthy, dbConnected, lastChecked }
	return (
		<div className={styles.status}>
			<div>Service healthy: {status.healthy ? 'Yes' : 'No'}</div>
			<div>DB connected: {status.dbConnected ? 'Yes' : 'No'}</div>
			<div className={styles.small}>Checked: {new Date(status.lastChecked).toLocaleTimeString()}</div>
		</div>
	)
}
