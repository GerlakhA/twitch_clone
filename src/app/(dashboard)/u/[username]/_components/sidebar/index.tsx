import Navigation from './Navigation'
import { Toggle } from './Toggle'
import { Wrapper } from './Wrapper'

const Sidebar = () => {
	return (
		<Wrapper>
			<Toggle />
			<Navigation />
		</Wrapper>
	)
}

export default Sidebar
