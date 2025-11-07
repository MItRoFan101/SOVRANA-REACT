import React from 'react'
import Metrics from './Metrics'
import ActionsTable from './ActionsTable'
import QuickSettings from './QuickSettings'
import SystemStatus from './SystemStatus'
import styles from '../Admin.module.css'

export default function Dashboard() {
	return (
		<div className={styles.grid}>
			<section className={styles.widget}>
				<h2>Real-time Metrics</h2>
				<Metrics />
			</section>

			<section className={styles.widget}>
				<h2>Recent Actions</h2>
				<ActionsTable />
			</section>

			<section className={styles.widget}>
				<h2>Quick Settings</h2>
				<QuickSettings />
			</section>

			<section className={styles.widget}>
				<h2>System Status</h2>
				<SystemStatus />
			</section>
		</div>
	)
}
