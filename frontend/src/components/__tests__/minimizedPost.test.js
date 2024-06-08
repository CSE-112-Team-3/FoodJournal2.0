
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MinimizedPost from '../minimizedPost';

describe('MinimizedPost', () => {
  const mockData = {
    id: 1,
    userId: 1,
    username: 'testuser',
    profilePic: <img src="profile.jpg" alt="Profile" />,
    mealName: 'Pasta',
    starRating: '4',
    description: 'Delicious pasta with tomato sauce.',
    images: 'pasta.jpg',
    tags: ['Italian', 'Dinner']
  };

  it('renders correctly with given props', () => {
    render(<MinimizedPost {...mockData} />);
    

    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('just ate Pasta')).toBeInTheDocument();
    expect(screen.getByText('⭐⭐⭐⭐')).toBeInTheDocument();
    expect(screen.getByText('Delicious pasta with tomato sauce.')).toBeInTheDocument();
    

    expect(screen.getByAltText('Pasta')).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
  });

  it('calls handlePostClick when post container is clicked', () => {
    render(<MinimizedPost {...mockData} />);
    const postContainer = screen.getByText('just ate Pasta').closest('div');

    fireEvent.click(postContainer);
  });

  it('calls handleUsernameClick when username is clicked', () => {
    render(<MinimizedPost {...mockData} />);
    const usernameElement = screen.getByText('@testuser');

    fireEvent.click(usernameElement);
    
  });
});
