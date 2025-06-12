import { render } from '@testing-library/react'
import Logout from '../pages/RegisterPages/Logout'

test ('matches snapshot', () => {
    const {asFragment} = render(<Logout />);

    expect(asFragment()).toMatchSnapshot();
})