import React from 'react'
import { useMetrics } from '../../hooks/useMetrics'
import styles from '../../styles/Admin.module.css'

export default function StatsCards() {
	const metrics = useMetrics()
	return (
		<div className={styles.cards}>
			<div className={styles.card}>
				<div className={styles.cardTitle}>CPU</div>
				<div className={styles.cardValue}>{metrics.cpu}%</div>
			</div>
			<div className={styles.card}>
				<div className={styles.cardTitle}>Memory</div>
				<div className={styles.cardValue}>{metrics.memory}%</div>
			</div>
			<div className={styles.card}>
				<div className={styles.cardTitle}>Req/s</div>
				<div className={styles.cardValue}>{metrics.requestsPerSec}</div>
			</div>
		</div>
	)
}
