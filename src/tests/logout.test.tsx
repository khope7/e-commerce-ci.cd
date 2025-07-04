import { render, fireEvent } from '@testing-library/react'
import Logout from '../pages/RegisterPages/Logout'
import { auth } from '../lib/firebase/firebaseConfig'

//Mocking firebase for authorization with signout function
jest.mock('../lib/firebase/firebaseConfig', () => ({
auth: {
currentUser: { email: 'test@example.com' },
signOut: jest.fn(),
},
db: {},
}));


// describing logout component with logout component rendering and firevent click with auth signout mocking
describe('Logout component', () => {
    test ('matches snapshot', () => {
        const {asFragment} = render(<Logout />);

        expect(asFragment()).toMatchSnapshot();
    })
    test ('Call signout when the button is clicked', () => {
        const {getByText} = render(<Logout/>);
        const button = getByText(/Logging Out!/i)
        fireEvent.click(button)
        expect(auth.signOut).toHaveBeenCalled()
    })
})
