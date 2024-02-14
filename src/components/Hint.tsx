import { FC } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

interface IHint {
	label: string
	children: React.ReactNode
	asChild?: boolean
	side?: 'top' | 'left' | 'right' | 'bottom'
	align?: 'center' | 'start' | 'end'
}

const Hint: FC<IHint> = ({ label, children, asChild, side, align }) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className='text-black bg-white'
					side={side}
					align={align}
				>
					<p className='font-semibold'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default Hint
