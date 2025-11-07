import { useEffect, useState } from 'react'

let idCounter = 1
const users = ['alice', 'bob', 'carol', 'dan']
const actions = ['login', 'logout', 'update-settings', 'created-item', 'deleted-item']

export function useActions() {
	const [list, setList] = useState(() => {
		// seed some items
		return Array.from({ length: 5 }).map(() => ({
			id: idCounter++,
			time: Date.now() - Math.floor(Math.random() * 1000000),
			user: users[Math.floor(Math.random() * users.length)],
			action: actions[Math.floor(Math.random() * actions.length)]
		}))
	})

	useEffect(() => {
		const id = setInterval(() => {
			setList(prev => {
				const next = [
					{
						id: idCounter++,
						time: Date.now(),
						user: users[Math.floor(Math.random() * users.length)],
						action: actions[Math.floor(Math.random() * actions.length)]
					},
					...prev
				].slice(0, 12) // keep recent 12
				return next
			})
		}, 3500)
		return () => clearInterval(id)
	}, [])

	return list
}
