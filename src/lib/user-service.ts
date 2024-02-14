import { prisma_db } from './db'

export const getUserByUsername = async (username: string) => {
	const user = await prisma_db?.user?.findUnique({
		where: {
			username,
		},
		include: {
			stream: true,
		},
	})

	return user
}

export const getUserById = async (userId: string) => {
	const user = await prisma_db.user.findUnique({
		where: { id: userId },
		include: {
			stream: true,
			_count: {
				select: {
					followedBy: true,
				},
			},
		},
	})

	return user
}
