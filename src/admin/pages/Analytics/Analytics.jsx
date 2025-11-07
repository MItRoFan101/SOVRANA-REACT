import React, { useMemo } from 'react'
import { useMetrics } from '../../hooks/useMetrics'
import styles from '../../styles/Admin.module.css'

export default function Analytics() {
	const metrics = useMetrics()
	const summary = useMemo(() => ({
		cpu: metrics.cpu,
		memory: metrics.memory,
		req: metrics.requestsPerSec
	}), [metrics])

	return (
		<section className={styles.page}>
			<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h2>Analytics</h2>
				<div className={styles.small}>Real-time overview</div>
			</header>

			<div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
				<div className={styles.statBox}><div className={styles.statTitle}>CPU</div><div className={styles.statValue}>{summary.cpu}%</div></div>
				<div className={styles.statBox}><div className={styles.statTitle}>Memory</div><div className={styles.statValue}>{summary.memory}%</div></div>
				<div className={styles.statBox}><div className={styles.statTitle}>Requests/s</div><div className={styles.statValue}>{summary.req}</div></div>
			</div>

			<div style={{ marginTop: 16 }}>
				<h4>Recent snapshot</h4>
				<pre style={{ background: '#fafafa', padding: 12, borderRadius: 6 }}>{JSON.stringify(metrics, null, 2)}</pre>
			</div>
		</section>
	)
}
