import { getSelf } from './auth-service'
import { prisma_db } from './db'

export const isBlockedByUser = async (id: string) => {
	try {
		const self = await getSelf()

		const otherUser = await prisma_db.user.findUnique({
			where: { id },
		})

		if (!otherUser) {
			throw new Error('User not found')
		}

		if (otherUser.id === self.id) {
			return false
		}

		const existingBlock = await prisma_db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockedId: otherUser.id,
					blockerId: self.id,
				},
			},
		})

		return !!existingBlock
	} catch (error) {
		return false
	}
}

export const blockUser = async (id: string) => {
	const self = await getSelf()

	if (self.id === id) {
		throw new Error('Cannot block yourself')
	}

	const otherUser = await prisma_db.user.findUnique({
		where: { id },
	})

	if (!otherUser) {
		throw new Error('User not found')
	}

	const existingBlock = await prisma_db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockedId: otherUser.id,
				blockerId: self.id,
			},
		},
	})

	if (existingBlock) {
		throw new Error('Already blocked')
	}

	const block = await prisma_db.block.create({
		data: {
			blockerId: self.id,
			blockedId: otherUser.id,
		},
		include: {
			blocked: true,
		},
	})

	return block
}

export const unblockUser = async (id: string) => {
	const self = await getSelf()

	if (self.id === id) {
		throw new Error('Cannot unblock yourself')
	}

	const otherUser = await prisma_db.user.findUnique({
		where: { id },
	})

	if (!otherUser) {
		throw new Error('User not found')
	}

	const existingBlock = await prisma_db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	})

	if (!existingBlock) {
		throw new Error('Not blocked')
	}

	const unblock = await prisma_db.block.delete({
		where: {
			id: existingBlock.id,
		},
		include: {
			blocked: true,
		},
	})

	return unblock
}
