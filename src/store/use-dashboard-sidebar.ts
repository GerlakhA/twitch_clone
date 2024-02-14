import { create } from 'zustand'

interface IDashboardSidebarstore {
	collapsed: boolean
	onExpand: () => void
	onCollapse: () => void
}

export const useDashboardSidebar = create<IDashboardSidebarstore>(set => ({
	collapsed: false,
	onExpand: () => set(() => ({ collapsed: false })),
	onCollapse: () => set(() => ({ collapsed: true })),
}))
