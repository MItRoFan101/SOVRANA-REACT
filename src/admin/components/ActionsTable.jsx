import React from 'react'
import { useActions } from '../hooks/useActions'
import styles from '../Admin.module.css'

export default function ActionsTable() {
	const actions = useActions() // [{id, time, user, action}]
	return (
		<table className={styles.table}>
			<thead>
				<tr><th>Time</th><th>User</th><th>Action</th></tr>
			</thead>
			<tbody>
				{actions.map(a => (
					<tr key={a.id}>
						<td>{new Date(a.time).toLocaleTimeString()}</td>
						<td>{a.user}</td>
						<td>{a.action}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
