import React, { useState, useEffect } from 'react'
import { useToasts } from '../../hooks/useToasts'
import styles from '../../styles/Admin.module.css'

export default function Settings() {
	const [maintenance, setMaintenance] = useState(false)
	const [maxItems, setMaxItems] = useState(100)
	const { push } = useToasts()

	useEffect(() => {
		setMaintenance(localStorage.getItem('admin_maintenance') === '1')
		const m = parseInt(localStorage.getItem('admin_max_items') || '100', 10)
		setMaxItems(Number.isNaN(m) ? 100 : m)
	}, [])

	const save = () => {
		if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 10000) {
			push({ title: 'Invalid', message: 'Max items must be 1-10000' })
			return
		}
		localStorage.setItem('admin_maintenance', maintenance ? '1' : '0')
		localStorage.setItem('admin_max_items', String(maxItems))
		push({ title: 'Saved', message: 'Settings saved' })
	}

	return (
		<section className={styles.page}>
			<h2>Settings</h2>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={maintenance} onChange={e => setMaintenance(e.target.checked)} />
					<span>Maintenance mode</span>
				</label>

				<label>
					Max items to display
					<br />
					<input type="number" value={maxItems} onChange={e => setMaxItems(Number(e.target.value || 0))} style={{ width: 140, padding: 6 }} />
				</label>

				<div style={{ display: 'flex', gap: 8 }}>
					<button onClick={save}>Save</button>
					<button onClick={() => { setMaintenance(false); setMaxItems(100); push({ title: 'Reset', message: 'Defaults restored' }) }}>Reset</button>
				</div>
			</div>
		</section>
	)
}
