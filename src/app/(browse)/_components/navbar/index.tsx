import { Search } from '@/app/(browse)/_components/search'
import { Actions } from './actions'
import { Logo } from './logo'

const Navbar = () => {
	return (
		<nav
			className='fixed top-0 w-full bg-[#252731] h-20 z-[49]
      lg:px-4 flex justify-between items-center shadow-sm'
		>
			<Logo />
			<Search />
			<Actions />
		</nav>
	)
}

export default Navbar
