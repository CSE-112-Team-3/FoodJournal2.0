
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../editProfile';
import { AuthProvider } from '../../provider/AuthProvider';
import Cookies from 'js-cookie';

const mockUser = { username: 'testuser' };

jest.mock('../../provider/AuthProvider', () => ({
  useAuth: () => ({
    user: mockUser,
  }),
}));


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      profile_picture: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png',
    }),
  })
);

beforeEach(() => {
  Cookies.set('accessToken', 'test-token');
});

afterEach(() => {
  jest.clearAllMocks();
  Cookies.remove('accessToken');
});

test('renders EditProfile component', async () => {
  render(
    <AuthProvider>
      <EditProfile />
    </AuthProvider>
  );


  expect(screen.getByText(/Upload Your Profile Picture/i)).toBeInTheDocument();


  await waitFor(() => {
    expect(screen.getByLabelText(/First name:/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Last name:/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/Username:/i)).toHaveValue('johndoe');
    expect(screen.getByLabelText(/Email:/i)).toHaveValue('john@example.com');
  });
});

test('enables editing when Edit button is clicked', async () => {
  render(
    <AuthProvider>
      <EditProfile />
    </AuthProvider>
  );

  await waitFor(() => {
    expect(screen.getByLabelText(/First name:/i)).toHaveValue('John');
  });

  fireEvent.click(screen.getByText(/Edit/i));

  expect(screen.getByLabelText(/First name:/i)).not.toHaveAttribute('readOnly');
  expect(screen.getByLabelText(/Last name:/i)).not.toHaveAttribute('readOnly');
  expect(screen.getByLabelText(/Username:/i)).not.toHaveAttribute('readOnly');
  expect(screen.getByLabelText(/Email:/i)).not.toHaveAttribute('readOnly');
  expect(screen.getByLabelText(/New Password/i)).not.toHaveAttribute('readOnly');
  expect(screen.getByLabelText(/Verify/i)).not.toHaveAttribute('readOnly');
});
