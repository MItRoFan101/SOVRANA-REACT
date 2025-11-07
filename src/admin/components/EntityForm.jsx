import React, { useState, useEffect } from 'react'
import styles from '../Admin.module.css'

export default function EntityForm({ initial = {}, onClose, onSave }) {
	const [values, setValues] = useState({ name: '', description: '', status: 'active', ...initial })
	const [errors, setErrors] = useState({})

	useEffect(() => setValues(v => ({ ...v, ...initial })), [initial])

	const validate = () => {
		const e = {}
		if (!values.name || values.name.trim().length < 2) e.name = 'Name is required (min 2 chars)'
		if (values.description && values.description.length > 500) e.description = 'Description max 500 chars'
		setErrors(e)
		return Object.keys(e).length === 0
	}

	const submit = async (ev) => {
		ev.preventDefault()
		if (!validate()) return
		await onSave({ name: values.name.trim(), description: values.description.trim(), status: values.status })
	}

	return (
		<div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', zIndex: 999 }}>
			<form onSubmit={submit} style={{ background: '#fff', padding: 12, borderRadius: 6, width: 480, maxWidth: '95%' }}>
				<h3>{initial.id ? 'Edit' : 'Create'} Entity</h3>
				<div>
					<label>Name</label><br />
					<input value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
					{errors.name && <div style={{ color: 'crimson' }}>{errors.name}</div>}
				</div>
				<div>
					<label>Description</label><br />
					<textarea value={values.description} onChange={e => setValues({ ...values, description: e.target.value })} rows={4} />
					{errors.description && <div style={{ color: 'crimson' }}>{errors.description}</div>}
				</div>
				<div>
					<label>Status</label>
					<select value={values.status} onChange={e => setValues({ ...values, status: e.target.value })}>
						<option value="active">active</option>
						<option value="disabled">disabled</option>
					</select>
				</div>

				<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
					<button type="button" onClick={onClose}>Cancel</button>
					<button type="submit">{initial.id ? 'Save' : 'Create'}</button>
				</div>
			</form>
		</div>
	)
}
