import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export const Actions = () => {
	return (
		<div className='flex justify-end items-center gap-x-2'>
			<Button
				asChild
				size={'sm'}
				variant={'ghost'}
				className='text-muted-foreground hover:text-primary transition'
			>
				<Link href={'/'}>
					<LogOut className='h-5 w-5 mr-2' />
					Exit
				</Link>
			</Button>
			<UserButton afterSignOutUrl='/' />
		</div>
	)
}
