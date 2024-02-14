'use client'

import { UpdateStream } from '@/actions/stream'
import Hint from '@/components/Hint'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadDropzone } from '@/lib/uploadthing'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface IInfoModal {
	initialName: string
	initialThumbnailUrl: string | null
}

export const InfoModal = ({ initialName, initialThumbnailUrl }: IInfoModal) => {
	const [isPending, startTransition] = useTransition()
	const [streamName, setStreamName] = useState(initialName)
	const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

	const closeRef = useRef<ElementRef<'button'>>(null)

	const router = useRouter()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(() => {
			UpdateStream({ name: streamName })
				.then(() => {
					toast.success('Stream name updated!')
					closeRef.current?.click()
				})
				.catch(() => toast.error('something went wrong!'))
		})
	}

	const onRemove = () => {
		startTransition(() => {
			UpdateStream({ thumbnailUrl: null })
				.then(() => {
					toast.success('thumbnailUrl removed')
					setThumbnailUrl('')
					closeRef.current?.click()
				})
				.catch(() => toast.error('Something went wrong'))
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'link'} size={'sm'} className='ml-auto'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit stream info</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className='space-y-14'>
					<div className='space-y-2'>
						<Label>Stream name</Label>
						<Input
							placeholder='Stream name'
							onChange={e => setStreamName(e.target.value)}
							value={streamName}
							disabled={isPending}
						/>
					</div>
					<div className='space-y-2'>
						<Label>Thumbnail</Label>
						{thumbnailUrl ? (
							<div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
								<div className='absolute top-2 right-2 z-[10]'>
									<Hint label='Remove thumbnailUrl' side='left' asChild>
										<Button
											type='button'
											disabled={isPending}
											onClick={onRemove}
											className='h-auto w-auto p-1.5'
										>
											<Trash className='h-4 w-4' />
										</Button>
									</Hint>
								</div>
								<Image
									src={thumbnailUrl}
									alt='thumbnailUrl'
									fill
									className='object-cover'
								/>
							</div>
						) : (
							<div className='rounded-xl border outline-dashed outline-muted'>
								<UploadDropzone
									endpoint='thumbnailUploader'
									appearance={{
										label: {
											color: '#FFFFFF',
										},
										allowedContent: {
											color: '#FFFFFF',
										},
									}}
									onClientUploadComplete={res => {
										setThumbnailUrl(res?.[0]?.url)
										router.refresh()
										closeRef.current?.click()
									}}
								/>
							</div>
						)}
					</div>
					<div className='flex justify-between'>
						<DialogClose ref={closeRef} asChild>
							<Button type='button' variant={'ghost'}>
								Cancel
							</Button>
						</DialogClose>
						<Button disabled={isPending} type='submit' variant={'primary'}>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
