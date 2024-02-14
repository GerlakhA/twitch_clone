'use client'

import { UpdateStream } from '@/actions/stream'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { useTransition } from 'react'
import { toast } from 'sonner'

type Fieldtypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface IToggleCard {
	field: Fieldtypes
	label: string
	value: boolean | undefined
}

const ToggleCard = ({ field, label, value = false }: IToggleCard) => {
	const [isPending, startTransition] = useTransition()

	const onChange = () => {
		startTransition(() => {
			UpdateStream({ [field]: !value })
				.then(() => toast.success('Chat settings updated!'))
				.catch(() => toast.error('Something went wrong'))
		})
	}
	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-center justify-between'>
				<p className='font-semibold shrink-0'>{label}</p>
				<div className='space-y-2'>
					<Switch
						disabled={isPending}
						checked={value}
						onCheckedChange={onChange}
					>
						{value ? 'On' : 'Off'}
					</Switch>
				</div>
			</div>
		</div>
	)
}

export default ToggleCard

export const ToggleCardSkeleton = () => {
	return <Skeleton className='rounded-xl p-10 w-full' />
}
