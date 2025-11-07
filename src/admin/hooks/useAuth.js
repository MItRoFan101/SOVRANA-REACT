import { useEffect, useState } from 'react'

export function useAuth() {
	const [checking, setChecking] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false)
	useEffect(() => {
		setChecking(true)
		setTimeout(() => {
			setIsAdmin(localStorage.getItem('isAdmin') === '1')
			setChecking(false)
		}, 150)
	}, [])
	return { checking, isAdmin, setIsAdmin }
}
