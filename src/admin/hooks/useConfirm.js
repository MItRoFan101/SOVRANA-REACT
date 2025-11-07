import { useState } from 'react'

export function useConfirm() {
	const [dialog, setDialog] = useState(null)
	const confirm = (opts) => new Promise((resolve) => {
		setDialog({
			...opts,
			onConfirm: () => { setDialog(null); resolve(true) },
			onCancel: () => { setDialog(null); resolve(false) }
		})
	})
	return { dialog, confirm, setDialog }
}
