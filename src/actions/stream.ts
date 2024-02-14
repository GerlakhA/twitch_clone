'use server'

import { getSelf } from '@/lib/auth-service'
import { prisma_db } from '@/lib/db'
import { Stream } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const UpdateStream = async (values: Partial<Stream>) => {
	try {
		const self = await getSelf()

		const selfStream = await prisma_db.stream.findUnique({
			where: { userId: self.id },
		})

		if (!selfStream) {
			throw new Error('Stream not found')
		}

		const validData = {
			thumbnailUrl: values.thumbnailUrl,
			name: values.name,
			isChatEnabled: values.isChatEnabled,
			isChatDelayed: values.isChatDelayed,
			isChatFollowersOnly: values.isChatFollowersOnly,
		}

		const stream = await prisma_db.stream.update({
			where: { id: selfStream.id },
			data: { ...validData },
		})

		revalidatePath(`/u/${self.username}/chat`)
		revalidatePath(`/u/${self.username}`)
		revalidatePath(`/${self.username}`)

		return stream
	} catch (error) {
		throw new Error('Internal Error')
	}
}
