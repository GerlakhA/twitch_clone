'use client'

import { VerifiedMark } from '../VerifiedMarked'

interface IAboutCard {
	hostName: string
	hostIdentity: string
	viewerIdentity: string
	bio: string | null
	followedByCount: number
}

export const AboutCard = ({
	hostIdentity,
	hostName,
	viewerIdentity,
	bio,
	followedByCount,
}: IAboutCard) => {
	const hostAsViewer = `host-${hostName}`
	const isHost = viewerIdentity === hostAsViewer
	const followedByLabel = followedByCount === 1 ? 'follower' : 'folllowers'

	return (
		<div className='px-4'>
			<div className='group flex flex-col rounded-xl bg-background p-6 lg:p-10 gap-y-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
						About {hostName}
						<VerifiedMark />
					</div>
					{isHost && <p>EDIT</p>}
					<div className='text-sm text-muted-foreground'>
						<span>{followedByCount}</span>
						{followedByLabel}
					</div>
				</div>
			</div>
		</div>
	)
}
