import React, { useMemo } from 'react'
import { useEntities } from '../../hooks/useEntities'
import { usePagination } from '../../hooks/usePagination'
import styles from '../../styles/Admin.module.css'

export default function RecentTable() {
	const { data, loading } = useEntities()
	const list = useMemo(() => data.slice().sort((a,b)=>b.createdAt - a.createdAt), [data])
	const { page, totalPages, setPage, slice } = usePagination(list, { pageSize: 5 })

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<table className={styles.table}>
				<thead><tr><th>ID</th><th>Name</th><th>Status</th><th>Created</th></tr></thead>
				<tbody>
					{slice().map(r => (
						<tr key={r.id}>
							<td>{r.id}</td>
							<td>{r.name}</td>
							<td>{r.status}</td>
							<td>{new Date(r.createdAt).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
			{totalPages > 1 && <div style={{ marginTop: 8 }}><button onClick={() => setPage(Math.max(1, page-1))}>Prev</button> <span style={{margin:'0 8px'}}>{page}/{totalPages}</span> <button onClick={() => setPage(Math.min(totalPages, page+1))}>Next</button></div>}
		</div>
	)
}
