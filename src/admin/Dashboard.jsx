import React from 'react'
import StatsCards from './components/StatsCards/StatsCards'
import RecentTable from './components/DataTable/RecentTable'
import styles from './styles/Admin.module.css'

export default function Dashboard() {
	return (
		<section className={styles.page}>
			<header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h2>Overview</h2>
				<div className={styles.small}>Admin dashboard</div>
			</header>

			<StatsCards />

			<div style={{ marginTop: 16 }}>
				<h3 style={{ marginBottom: 8 }}>Recent activity</h3>
				<RecentTable />
			</div>
		</section>
	)
}
