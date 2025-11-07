import { useMemo, useState } from 'react'
export function usePagination(list, { pageSize = 10 } = {}) {
	const [page, setPage] = useState(1)
	const totalPages = Math.max(1, Math.ceil(list.length / pageSize))
	const slice = useMemo(() => {
		const start = (page - 1) * pageSize
		return () => list.slice(start, start + pageSize)
	}, [list, page, pageSize])
	if (page > totalPages) setPage(totalPages)
	return { page, setPage, totalPages, slice }
}
