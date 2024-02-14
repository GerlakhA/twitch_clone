import { prisma_db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export const getSelf = async () => {
	const self = await currentUser()

	if (!self || !self.username) {
		throw new Error('Unauthorized')
	}

	const user = await prisma_db.user.findUnique({
		where: {
			externalUserId: self.id,
		},
	})

	if (!user) {
		throw new Error('Not found')
	}

	return user
}

export const getSelfByUsername = async (username: string) => {
	const self = await currentUser()

	if (!self || !self.username) {
		throw new Error('Unauthorized')
	}

	const user = await prisma_db.user.findUnique({
		where: { username },
	})

	if (!user) throw new Error('User not found')

	if (self.username !== user.username) throw new Error('Unathorized')

	return user
}
