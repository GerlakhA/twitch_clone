import StreamPlayer from '@/components/stream-player/StreamPlayer'
import { getUserByUsername } from '@/lib/user-service'
import { currentUser } from '@clerk/nextjs'

interface IDashboardPage {
	params: { username: string }
}

const DashboardPage = async ({ params }: IDashboardPage) => {
	const extarnalUser = await currentUser()
	const user = await getUserByUsername(params.username)

	if (!user || user.externalUserId !== extarnalUser?.id || !user.stream) {
		throw new Error('Unauthorized')
	}
	return (
		<div className='w-full'>
			<StreamPlayer user={user} stream={user.stream} isFollowing={true} />
		</div>
	)
}

export default DashboardPage
