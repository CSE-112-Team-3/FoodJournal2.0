import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomPopup from './CustomPopup';

describe('CustomPopup component', () => {
  test('renders the popup when show prop is true', () => {
    const { getByText } = render(
      <CustomPopup title="Test Popup" show={true} onClose={() => {}}>
        <p>Popup content</p>
      </CustomPopup>
    );

    expect(getByText('Test Popup')).toBeInTheDocument();
    expect(getByText('Popup content')).toBeInTheDocument();
  });

  test('hides the popup when show prop is false', () => {
    const { queryByText } = render(
      <CustomPopup title="Test Popup" show={false} onClose={() => {}}>
        <p>Popup content</p>
      </CustomPopup>
    );

    expect(queryByText('Test Popup')).not.toBeInTheDocument();
    expect(queryByText('Popup content')).not.toBeInTheDocument();
  });

  test('calls onClose function when close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <CustomPopup title="Test Popup" show={true} onClose={onCloseMock}>
        <p>Popup content</p>
      </CustomPopup>
    );

    fireEvent.click(getByText('×'));
    expect(onCloseMock).toHaveBeenCalledWith(false);
  });
});
