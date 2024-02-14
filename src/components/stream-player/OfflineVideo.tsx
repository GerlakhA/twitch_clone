import { WifiOff } from 'lucide-react'

interface IOfflineVideo {
	username: string
}

const OfflineVideo = ({ username }: IOfflineVideo) => {
	return (
		<div className='flex flex-col h-full justify-center items-center space-y-4'>
			<WifiOff className='h-10 w-10 text-muted-foreground' />
			<p className='text-muted-foreground '>{username} is offline</p>
		</div>
	)
}

export default OfflineVideo
