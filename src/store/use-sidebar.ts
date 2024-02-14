import { create } from 'zustand'

interface ISidebarstore {
	collapsed: boolean
	onExpand: () => void
	onCollapse: () => void
}

export const useSidebar = create<ISidebarstore>(set => ({
	collapsed: false,
	onExpand: () => set(() => ({ collapsed: false })),
	onCollapse: () => set(() => ({ collapsed: true })),
}))
