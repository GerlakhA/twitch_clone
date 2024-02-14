import { prisma_db } from './db'

export const getStreamByUserId = async (userId: string) => {
	const stream = await prisma_db.stream.findUnique({
		where: { userId },
	})

	return stream
}
