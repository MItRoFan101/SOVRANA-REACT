import React from 'react'
import { useMetrics } from '../hooks/useMetrics'
import styles from '../Admin.module.css'

export default function Metrics() {
	const metrics = useMetrics() // { cpu, memory, requestsPerSec, lastUpdated }

	return (
		<div className={styles.metrics}>
			<div>CPU: {metrics.cpu}%</div>
			<div>Memory: {metrics.memory}%</div>
			<div>Req/s: {metrics.requestsPerSec}</div>
			<div className={styles.small}>Updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}</div>
		</div>
	)
}
