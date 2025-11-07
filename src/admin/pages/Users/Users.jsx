import React, { useState, useMemo } from 'react'
import { useEntities } from '../../hooks/useEntities'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { useToasts } from '../../hooks/useToasts'
import EntityForm from '../../components/EntityForm'
import ConfirmDialog from '../../components/DataTable/ConfirmDialog'
import styles from '../../styles/Admin.module.css'

export default function Users() {
	const { data, loading, error, createEntity, updateEntity, deleteEntity } = useEntities()
	const { push: toast } = useToasts()
	const [query, setQuery] = useState('')
	const q = useDebounce(query, 250)
	const [editing, setEditing] = useState(null)
	const [confirm, setConfirm] = useState(null)

	const filtered = useMemo(() => {
		const qq = (q || '').trim().toLowerCase()
		return data.filter(u => {
			if (!qq) return true
			return (u.name || '').toLowerCase().includes(qq) || (u.description || '').toLowerCase().includes(qq)
		})
	}, [data, q])

	const { page, totalPages, setPage, slice } = usePagination(filtered, { pageSize: 8 })

	if (loading) return <div>Loading users...</div>
	if (error) return <div style={{ color: 'crimson' }}>Failed to load users</div>

	const onSave = async (vals) => {
		try {
			if (editing && editing.id) {
				await updateEntity(editing.id, vals)
				toast({ title: 'Updated', message: vals.name })
			} else {
				await createEntity(vals)
				toast({ title: 'Created', message: vals.name })
			}
		} catch (err) {
			toast({ title: 'Error', message: err.message || 'Operation failed' })
		}
	}

	return (
		<section className={styles.page}>
			<header style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
				<h2>Users</h2>
				<div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
					<input
						aria-label="Search users"
						placeholder="Search users..."
						value={query}
						onChange={e => setQuery(e.target.value)}
						style={{ minWidth: 220, padding: 6 }}
					/>
					<button onClick={() => setEditing({})}>New</button>
				</div>
			</header>

			<table className={styles.table}>
				<thead>
					<tr><th>ID</th><th>Name</th><th>Status</th><th>Actions</th></tr>
				</thead>
				<tbody>
					{slice().map(u => (
						<tr key={u.id}>
							<td>{u.id}</td>
							<td>{u.name}</td>
							<td>{u.status}</td>
							<td>
								<button onClick={() => setEditing(u)}>Edit</button>{' '}
								<button
									onClick={() => setConfirm({
										title: 'Delete user?',
										text: `Permanently delete "${u.name}"?`,
										onConfirm: async () => {
											await deleteEntity(u.id)
											toast({ title: 'Deleted', message: u.name })
										}
									})}
									style={{ color: 'darkred' }}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					{slice().length === 0 && <tr><td colSpan="4" style={{ padding: 12 }}>No users found</td></tr>}
				</tbody>
			</table>

			{totalPages > 1 && (
				<div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
					<button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Prev</button>
					<span className={styles.small}>Page {page} / {totalPages}</span>
					<button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
				</div>
			)}

			{editing !== null && (
				<EntityForm
					initial={editing.id ? editing : {}}
					onClose={() => setEditing(null)}
					onSave={async (vals) => { await onSave(vals); setEditing(null) }}
				/>
			)}

			{confirm && <ConfirmDialog {...confirm} onClose={() => setConfirm(null)} />}
		</section>
	)
}
