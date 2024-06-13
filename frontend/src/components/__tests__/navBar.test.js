import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../../provider/AuthProvider';
import NavBar from './NavBar';

describe('NavBar component', () => {
  test('renders correct links when user is authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider isAuthenticated={true} user={{ username: 'testUser' }}>
          <NavBar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(getByText('HOME')).toBeInTheDocument();
    expect(getByText('RECIPES')).toBeInTheDocument();
    expect(getByText('SETTINGS')).toBeInTheDocument();
    expect(getByText('Hi testUser!')).toBeInTheDocument();
    expect(getByText('Log out?')).toBeInTheDocument();
  });

  test('renders correct links when user is not authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider isAuthenticated={false}>
          <NavBar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(getByText('HOME')).toBeInTheDocument();
    expect(getByText('RECIPES')).toBeInTheDocument();
    expect(getByText('Sign in?')).toBeInTheDocument();
  });

  test('calls logout function when "Log out" button is clicked', async () => {
    const logoutMock = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider isAuthenticated={true} user={{ username: 'testUser' }} logout={logoutMock}>
          <NavBar />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(getByText('Log out?'));
    expect(logoutMock).toHaveBeenCalled();
  });
});
