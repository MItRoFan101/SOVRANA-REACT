import React, { useMemo, useState, useCallback } from 'react'
import { useEntities } from '../hooks/useEntities'
import { usePagination } from '../hooks/usePagination'
import { useDebounce } from '../hooks/useDebounce'
import Pagination from './Pagination'
import SearchFilter from './SearchFilter'
import EntityForm from './EntityForm'
import ConfirmDialog from './ConfirmDialog'
import { useToasts } from '../hooks/useToasts'
import styles from '../Admin.module.css'

// memoized row for performance
const Row = React.memo(function Row({ e, onEdit, onDelete }) {
	return (
		<tr>
			<td>{e.id}</td>
			<td>{e.name}</td>
			<td>{e.status}</td>
			<td style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.description}</td>
			<td>
				<button onClick={() => onEdit(e)}>Edit</button>{' '}
				<button onClick={() => onDelete(e)} style={{ color: 'darkred' }}>Delete</button>
			</td>
		</tr>
	)
})

export default function EntitiesList() {
	const { data, loading, error, createEntity, updateEntity, deleteEntity } = useEntities()
	const { notify } = useToasts()
	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, 300)
	const [statusFilter, setStatusFilter] = useState('all')
	const filtered = useMemo(() => {
		const q = debouncedQuery.trim().toLowerCase()
		return data.filter(e => {
			if (statusFilter !== 'all' && e.status !== statusFilter) return false
			if (!q) return true
			return e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
		})
	}, [data, debouncedQuery, statusFilter])

	const { page, totalPages, setPage, slice } = usePagination(filtered, { pageSize: 6 })

	const [editing, setEditing] = useState(null)
	const [confirm, setConfirm] = useState(null)

	const handleCreate = async (payload) => {
		await createEntity(payload)
		notify('Created entity', 'success')
	}
	const handleUpdate = async (id, payload) => {
		await updateEntity(id, payload)
		notify('Updated entity', 'success')
	}
	const handleDelete = async (ent) => {
		setConfirm({
			title: 'Delete entity?',
			text: `Delete "${ent.name}" permanently?`,
			onConfirm: async () => {
				await deleteEntity(ent.id)
				notify('Deleted entity', 'info')
			}
		})
	}

	if (loading) return <div>Loading entities...</div>
	if (error) return <div style={{ color: 'crimson' }}>Error loading entities: {error.message}</div>

	return (
		<div>
			<div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}>
				<SearchFilter value={query} onChange={setQuery} placeholder="Search by name or description" />
				<select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
					<option value="all">All statuses</option>
					<option value="active">active</option>
					<option value="disabled">disabled</option>
				</select>
				<button onClick={() => setEditing({})}>New Entity</button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr><th>ID</th><th>Name</th><th>Status</th><th>Description</th><th>Actions</th></tr>
				</thead>
				<tbody>
					{slice().map(e => (
						<Row key={e.id} e={e} onEdit={setEditing} onDelete={handleDelete} />
					))}
				</tbody>
			</table>

			<Pagination page={page} totalPages={totalPages} onPage={setPage} />

			{editing !== null && (
				<EntityForm
					initial={editing}
					onClose={() => setEditing(null)}
					onSave={async (vals) => {
						if (!editing.id) {
							await handleCreate(vals)
						} else {
							await handleUpdate(editing.id, vals)
						}
						setEditing(null)
					}}
				/>
			)}

			{confirm && <ConfirmDialog {...confirm} onClose={() => setConfirm(null)} />}
		</div>
	)
}
