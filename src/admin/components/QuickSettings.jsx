import React, { useState } from 'react'
import styles from '../Admin.module.css'

export default function QuickSettings() {
	const [maintenance, setMaintenance] = useState(false)
	const [verbose, setVerbose] = useState(false)

	return (
		<div className={styles.quick}>
			<label><input type="checkbox" checked={maintenance} onChange={e => setMaintenance(e.target.checked)} /> Maintenance mode</label>
			<br />
			<label><input type="checkbox" checked={verbose} onChange={e => setVerbose(e.target.checked)} /> Verbose logging</label>
			<div className={styles.small}>Changes are local to this UI (simulate server call)</div>
		</div>
	)
}
