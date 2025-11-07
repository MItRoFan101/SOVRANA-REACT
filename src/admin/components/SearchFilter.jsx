import React from 'react'
import styles from '../Admin.module.css'

export default function SearchFilter({ value, onChange, placeholder }) {
	return (
		<input
			className={styles.small}
			value={value}
			onChange={e => onChange(e.target.value)}
			placeholder={placeholder}
			style={{ flex: 1, minWidth: 180 }}
		/>
	)
}
