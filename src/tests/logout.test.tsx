import { render } from '@testing-library/react'
import Logout from '../pages/RegisterPages/Logout'



jest.mock('../lib/firebase/firebaseConfig', () => ({
auth: {
currentUser: { email: 'test@example.com' },
signOut: jest.fn(),
},
db: {},
}));

test ('matches snapshot', () => {
    const {asFragment} = render(<Logout />);

    expect(asFragment()).toMatchSnapshot();
})